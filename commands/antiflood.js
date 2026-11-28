// ==================== commands/antiflood.js ====================
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { delay, getOwnerId, isGroupAdmin } from '../lib/common.js';

const DEFAULT_LIMIT = { n: 6, sec: 8 };
const MODE_LABEL = { delete: 'Delete', warn: 'Delete + Warn', kick: 'Delete + Remove' };

const recent = new Map();   // "group:sender" -> [timestamps]
const lastWarn = new Map(); // "group:sender" -> timestamp

setInterval(() => {
    const limit = Date.now() - 5 * 60 * 1000;
    for (const [k, v] of recent) if (!v.length || v[v.length - 1] < limit) recent.delete(k);
    for (const [k, t] of lastWarn) if (t < limit) lastWarn.delete(k);
}, 5 * 60 * 1000).unref();

export default {
    name: 'antiflood',
    aliases: ['flood'],
    description: 'Stops members who send too many messages in a short time',
    category: 'Group',
    group: true,
    admin: true,
    botAdmin: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const groupId = from.split('@')[0];
            const action = args[0]?.toLowerCase();

            if (['on', 'delete', 'warn', 'kick'].includes(action)) {
                const mode = action === 'on' ? 'delete' : action;
                setSetting(ownerId, 'antiflood', true, groupId);
                setSetting(ownerId, 'antifloodMode', mode, groupId);
                const l = getSetting(ownerId, 'antifloodLimit', DEFAULT_LIMIT, groupId);
                return await kaya.sendMessage(from, { text: successBox(`Anti flood enabled\n*${MODE_LABEL[mode]}*\n${l.n} messages / ${l.sec}s`) }, { quoted: mek });
            }

            if (action === 'off') {
                setSetting(ownerId, 'antiflood', false, groupId);
                return await kaya.sendMessage(from, { text: boxMessage('ANTI FLOOD', 'Protection disabled.', '❌') }, { quoted: mek });
            }

            if (action === 'limit') {
                const n = parseInt(args[1], 10);
                const sec = parseInt(args[2], 10);
                if (!(n >= 3 && n <= 50) || !(sec >= 3 && sec <= 120)) {
                    return await kaya.sendMessage(from, { text: errorBox(`Usage: ${prefix}antiflood limit 6 8\n(3-50 messages, 3-120 seconds)`) }, { quoted: mek });
                }
                setSetting(ownerId, 'antifloodLimit', { n, sec }, groupId);
                return await kaya.sendMessage(from, { text: successBox(`Limit: ${n} messages / ${sec}s`) }, { quoted: mek });
            }

            if (action === 'status') {
                const enabled = getSetting(ownerId, 'antiflood', false, groupId);
                const mode = getSetting(ownerId, 'antifloodMode', 'delete', groupId);
                const l = getSetting(ownerId, 'antifloodLimit', DEFAULT_LIMIT, groupId);
                return await kaya.sendMessage(from, {
                    text: boxMessage('ANTI FLOOD', enabled ? `• *Status:* ✅ Enabled\n• *Mode:* ${MODE_LABEL[mode]}\n• *Limit:* ${l.n} messages / ${l.sec}s` : '• *Status:* ❌ Disabled', '📊')
                }, { quoted: mek });
            }

            const menu =
                `• \`${prefix}antiflood on|warn|kick\`\n` +
                `• \`${prefix}antiflood limit 6 8\` *(messages / seconds)*\n` +
                `• \`${prefix}antiflood off\`\n` +
                `• \`${prefix}antiflood status\``;
            await kaya.sendMessage(from, { text: boxMessage('ANTI FLOOD', menu, '🛡️') }, { quoted: mek });
        } catch (err) {
            console.error('❌ antiflood error:', err);
            await kaya.sendMessage(from, { text: errorBox('Antiflood error.') }, { quoted: mek }).catch(() => {});
        }
    },

    async detect(kaya, mek, from) {
        try {
            if (!from.endsWith('@g.us') || mek.key?.fromMe) return;

            const ownerId = getOwnerId(kaya);
            const groupId = from.split('@')[0];
            if (!getSetting(ownerId, 'antiflood', false, groupId)) return;

            const sender = mek.sender || mek.key.participant;
            const key = `${groupId}:${sender}`;
            const { n, sec } = getSetting(ownerId, 'antifloodLimit', DEFAULT_LIMIT, groupId);

            const now = Date.now();
            const times = (recent.get(key) || []).filter(t => now - t < sec * 1000);
            times.push(now);
            recent.set(key, times);

            if (times.length <= n) return;
            if (await isGroupAdmin(kaya, from, sender)) return;

            await kaya.sendMessage(from, { delete: mek.key }).catch(() => {});

            const mode = getSetting(ownerId, 'antifloodMode', 'delete', groupId);

            if (mode === 'kick') {
                recent.delete(key);
                await delay(800);
                await kaya.groupParticipantsUpdate(from, [sender], 'remove').catch(() => {});
            } else if (mode === 'warn' && now - (lastWarn.get(key) || 0) > 30000) {
                lastWarn.set(key, now);
                await kaya.sendMessage(from, {
                    text: `⚠️ *SLOW DOWN* @${sender.split('@')[0]}\nToo many messages (${n} max / ${sec}s).`,
                    mentions: [sender]
                });
            }
        } catch (err) {
            console.error('❌ antiflood detect error:', err?.message || err);
        }
    }
};
