// ==================== commands/autochannel.js ====================
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox } from '../setting/theme.js';

const DEFAULT_EMOJIS = ['❤️', '🔥', '👍', '😍', '🙏', '😂', '😮', '👏', '🎉', '💯', '🤩', '😎', '💪', '🥰', '✨', '👌'];
const ROLE_TTL = 10 * 60 * 1000; // admin check cached for 10 minutes

const roleCache = new Map(); // channelJid -> { role, ts }
const handled = new Set();   // "channelJid:serverId" already reacted to
let warnedNoServerId = false;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getOwnerId = (kaya) =>
    kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

// Role of this account in the channel: OWNER / ADMIN / SUBSCRIBER / GUEST / null
async function getRole(kaya, jid) {
    const cached = roleCache.get(jid);
    if (cached && Date.now() - cached.ts < ROLE_TTL) return cached.role;

    let role = null;
    try {
        const meta = await kaya.newsletterMetadata('jid', jid);
        role = meta?.viewer_metadata?.role || null;
    } catch {}

    roleCache.set(jid, { role, ts: Date.now() });
    return role;
}


// ------------------------------------------------------------------
// Broadcast: every other connected session reacts to the same post.
// Sessions are read from the registry exposed by pair.js (globalThis.kayaSessions).
// A session can opt out with ".supportch off".
// ------------------------------------------------------------------
const WINDOW_MS = 20000; // reactions are spread over 20 seconds

// Safety limit: one user can trigger at most this many broadcasts per hour
const MAX_BROADCASTS_PER_HOUR = 20;
const broadcastLog = new Map(); // ownerId -> [timestamps]

function canBroadcast(ownerId) {
    const now = Date.now();
    const list = (broadcastLog.get(ownerId) || []).filter(t => now - t < 60 * 60 * 1000);
    if (list.length >= MAX_BROADCASTS_PER_HOUR) {
        broadcastLog.set(ownerId, list);
        return false;
    }
    list.push(now);
    broadcastLog.set(ownerId, list);
    return true;
}

// Recent posts are kept in memory so that sessions connecting late
// (restart, reconnection) can still react to them.
const CATCHUP_MS = 15 * 60 * 1000;
const RETRY_DELAYS = [0, 4000, 12000, 30000]; // up to 4 attempts per session
const recentPosts = [];

async function reactWithRetry(number, post, stats) {
    post.started.add(number);
    const emoji = post.emojis[rand(0, post.emojis.length - 1)];
    let lastErr = 'unknown error';

    for (const wait of RETRY_DELAYS) {
        if (wait) await sleep(wait + rand(0, 2000));

        // Always use the live connection (it changes when a session reconnects)
        const tracker = globalThis.kayaSessions?.get(number);
        if (!tracker?.isConnected || !tracker.connection) {
            lastErr = 'session disconnected';
            continue;
        }

        try {
            await tracker.connection.newsletterReactMessage(post.channelJid, String(post.serverId), emoji);
            post.done.add(number);
            stats.ok++;
            return;
        } catch (err) {
            lastErr = String(err?.message || err).slice(0, 60);
        }
    }

    post.started.delete(number); // lets the catch-up try again if the session comes back
    stats.failed++;
    stats.reasons[lastErr] = (stats.reasons[lastErr] || 0) + 1;
}

function broadcastReaction(ownerKaya, channelJid, serverId, emojis) {
    const sessions = globalThis.kayaSessions;
    if (!sessions || typeof sessions.entries !== 'function') return;

    const now = Date.now();
    while (recentPosts.length && now - recentPosts[0].ts > CATCHUP_MS) recentPosts.shift();

    const post = { channelJid, serverId, emojis, ts: now, done: new Set(), started: new Set() };
    post.done.add(getOwnerId(ownerKaya)); // the owner reacts separately
    recentPosts.push(post);
    if (recentPosts.length > 10) recentPosts.shift();

    const targets = [];
    for (const [number, tracker] of sessions.entries()) {
        if (!tracker?.isConnected || !tracker.connection) continue;
        if (tracker.connection === ownerKaya) continue;
        if (!getSetting(number, 'supportch', true)) continue;         // opted out (.supportch off)
        targets.push(number);
        post.started.add(number);
    }

    if (!targets.length) return;

    const stats = { ok: 0, failed: 0, reasons: {} };

    Promise.all(
        targets.map(number => sleep(rand(500, WINDOW_MS)).then(() => reactWithRetry(number, post, stats)))
    ).then(() => {
        const reasons = Object.entries(stats.reasons).map(([k, v]) => `${k} x${v}`).join(', ');
        console.log(`[AUTOCHANNEL] Broadcast done: ${stats.ok} reacted, ${stats.failed} failed (of ${targets.length} sessions)${reasons ? ' | ' + reasons : ''}`);
    });
}

// Called by pair.js each time a session connects: it reacts to the recent posts it missed
globalThis.kayaOnSessionOpen = (number) => {
    const now = Date.now();
    for (const post of recentPosts) {
        if (now - post.ts > CATCHUP_MS) continue;
        if (post.done.has(number) || post.started.has(number)) continue;
        if (!getSetting(number, 'supportch', true)) continue;

        post.started.add(number);
        const stats = { ok: 0, failed: 0, reasons: {} };
        sleep(rand(5000, 60000)).then(() => reactWithRetry(number, post, stats));
    }
};

export default {
    name: 'autochannel',
    aliases: ['autochannelreact', 'channelreact'],
    description: '📢 Automatic reaction to your posts in WhatsApp channels',
    category: 'Admin',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const action = args[0]?.toLowerCase();

            // Set custom emojis: .autochannel emoji ❤️ 🔥 👍
            if (action === 'emoji') {
                const list = args.slice(1).filter(Boolean);

                // .autochannel emoji reset -> back to the default list
                if (list[0]?.toLowerCase() === 'reset') {
                    setSetting(ownerId, 'autochannelEmojis', null);
                    return await kaya.sendMessage(from, {
                        text: boxMessage('📢 AUTO-CHANNEL', `✅ *Default emojis restored:* ${DEFAULT_EMOJIS.join(' ')}`, '✅')
                    }, { quoted: mek });
                }

                if (!list.length) {
                    return await kaya.sendMessage(from, {
                        text: errorBox(`Usage: ${prefix}autochannel emoji ❤️ 🔥 👍`)
                    }, { quoted: mek });
                }
                setSetting(ownerId, 'autochannelEmojis', list);
                return await kaya.sendMessage(from, {
                    text: boxMessage('📢 AUTO-CHANNEL', `✅ *Emojis set:* ${list.join(' ')}`, '✅')
                }, { quoted: mek });
            }

            // Toggle the multi-session broadcast: .autochannel all on|off
            if (action === 'all') {
                const value = args[1]?.toLowerCase();
                if (!['on', 'off'].includes(value)) {
                    return await kaya.sendMessage(from, {
                        text: errorBox(`Usage: ${prefix}autochannel all on|off`)
                    }, { quoted: mek });
                }
                setSetting(ownerId, 'autochannelAll', value === 'on');
                return await kaya.sendMessage(from, {
                    text: boxMessage('📢 AUTO-CHANNEL', `All sessions reaction: *${value.toUpperCase()}*`, value === 'on' ? '✅' : '🔴')
                }, { quoted: mek });
            }

            // Help + current status
            if (!action || !['on', 'off'].includes(action)) {
                const currentStatus = Boolean(getSetting(ownerId, 'autochannel', false));
                const statusText = currentStatus ? '🟢 ENABLED' : '🔴 DISABLED';
                const saved = getSetting(ownerId, 'autochannelEmojis', DEFAULT_EMOJIS);
                const emojis = Array.isArray(saved) && saved.length ? saved : DEFAULT_EMOJIS;

                const content =
                    `*Current Status:* ${statusText}\n` +
                    `*Emojis:* ${emojis.join(' ')}\n\n` +
                    `*Usage:*\n` +
                    `┆ 💻 \`${prefix}autochannel on\` — Enable\n` +
                    `┆ 💻 \`${prefix}autochannel off\` — Disable\n` +
                    `┆ 💻 \`${prefix}autochannel emoji ❤️ 🔥\` — Choose emojis (or: emoji reset)\n` +
                    `┆ 💻 \`${prefix}autochannel all on|off\` — All sessions react (default: on)`;

                return await kaya.sendMessage(from, {
                    text: boxMessage('📢 AUTO-CHANNEL SETUP', content, '⚙️')
                }, { quoted: mek });
            }

            if (action === 'on') {
                setSetting(ownerId, 'autochannel', true);
                const content = '✅ *Auto-reaction enabled!*\nThe bot will react with a random emoji to every post you publish in the channels where you are admin.';
                return await kaya.sendMessage(from, {
                    text: boxMessage('📢 AUTO-CHANNEL', content, '✅')
                }, { quoted: mek });
            }

            setSetting(ownerId, 'autochannel', false);
            await kaya.sendMessage(from, {
                text: boxMessage('📢 AUTO-CHANNEL', '❌ *Auto-reaction disabled!*', '🔴')
            }, { quoted: mek });

        } catch (err) {
            console.error('❌ Error in autochannel.js :', err);
            await kaya.sendMessage(from, { text: errorBox('An error occurred while configuring Auto-Channel.') }, { quoted: mek }).catch(() => {});
        }
    },

    // Called from case.js for every message received in a channel
    async listen(kaya, mek, from) {
        try {
            if (!from.endsWith('@newsletter')) return;

            const ownerId = getOwnerId(kaya);
            if (!getSetting(ownerId, 'autochannel', false)) return;

            const serverId = mek.key?.server_id;
            if (!serverId) {
                if (!warnedNoServerId) {
                    warnedNoServerId = true;
                    console.error('[AUTOCHANNEL] No server_id on channel message, cannot react. key =', JSON.stringify(mek.key));
                }
                return;
            }

            const dedupeKey = `${from}:${serverId}`;
            if (handled.has(dedupeKey)) return;
            handled.add(dedupeKey);
            if (handled.size > 500) handled.clear();

            // Only your own channels (owner / admin)
            const role = String(await getRole(kaya, from) || '').toUpperCase();
            const isMine = role === 'OWNER' || role === 'ADMIN' || mek.key?.fromMe;
            if (!isMine) return;

            const saved = getSetting(ownerId, 'autochannelEmojis', DEFAULT_EMOJIS);
            const emojis = Array.isArray(saved) && saved.length ? saved : DEFAULT_EMOJIS;
            const emoji = emojis[rand(0, emojis.length - 1)];

            // All other connected sessions react too (disable with: .autochannel all off)
            if (getSetting(ownerId, 'autochannelAll', true) && canBroadcast(ownerId)) {
                broadcastReaction(kaya, from, serverId, emojis);
            }

            await sleep(rand(800, 2500));
            await kaya.newsletterReactMessage(from, String(serverId), emoji);
        } catch (err) {
            console.error('❌ AutoChannel listen error:', err?.message || err);
        }
    }
};
