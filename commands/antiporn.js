// antiporn.js
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { classifyImage } from '../lib/nsfw.js';
import { extractFrames } from '../lib/frames.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const THRESHOLD = 0.6;      // Porn + Hentai score needed to act (0..1)
const MAX_WARNINGS = 3;     // warn mode: remove the sender at the 3rd strike

const MAX_SIZE = {
    sticker: 2 * 1024 * 1024,
    image: 8 * 1024 * 1024,
    video: 20 * 1024 * 1024
};

const ALL_TYPES = ['sticker', 'image', 'video'];
const TYPE_ALIASES = {
    sticker: 'sticker', stickers: 'sticker',
    image: 'image', images: 'image', photo: 'image', photos: 'image',
    video: 'video', videos: 'video', gif: 'video', gifs: 'video'
};

const resultCache = new Map(); // file sha256 -> scores (same file is not analysed twice)

// Last thing detect() did in each group (shown by ".antiporn status", no console needed)
const lastEvent = {};
const note = (groupId, text) => { lastEvent[groupId] = { time: Date.now(), text }; };

const getOwnerId = (kaya) =>
    kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

const MODE_LABEL = { delete: 'Delete', warn: 'Delete + Warn', kick: 'Delete + Remove' };

// ------------------------------------------------------------------
// Message helpers
// ------------------------------------------------------------------
function unwrap(m) {
    for (let i = 0; i < 4; i++) {
        const inner =
            m?.ephemeralMessage?.message ||
            m?.viewOnceMessage?.message ||
            m?.viewOnceMessageV2?.message ||
            m?.viewOnceMessageV2Extension?.message ||
            m?.documentWithCaptionMessage?.message;
        if (!inner) break;
        m = inner;
    }
    return m;
}

// Returns { kind: 'sticker'|'image'|'video', msg, dlType } or null
function getMedia(mek) {
    const m = unwrap(mek.message);
    if (!m) return null;

    if (m.stickerMessage) return { kind: 'sticker', msg: m.stickerMessage, dlType: 'sticker' };
    if (m.imageMessage) return { kind: 'image', msg: m.imageMessage, dlType: 'image' };
    if (m.videoMessage) return { kind: 'video', msg: m.videoMessage, dlType: 'video' };
    if (m.documentMessage && /^image\//.test(m.documentMessage.mimetype || '')) {
        return { kind: 'image', msg: m.documentMessage, dlType: 'document' };
    }
    return null;
}

async function download(msg, dlType) {
    const stream = await downloadContentFromMessage(msg, dlType);
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
}

function mergeScores(list) {
    const out = { Porn: 0, Hentai: 0, Sexy: 0, Neutral: 0, Drawing: 0 };
    for (const s of list) {
        for (const k of Object.keys(out)) out[k] = Math.max(out[k], s[k] || 0);
    }
    return out;
}

// ------------------------------------------------------------------
// Analysis
// ------------------------------------------------------------------
async function analyse(media, isBad) {
    const { kind, msg, dlType } = media;

    if (kind !== 'video') {
        const buffer = await download(msg, dlType);
        return buffer.length ? await classifyImage(buffer) : null;
    }

    // Video: embedded thumbnail first (no download), then real frames
    const all = [];

    if (msg.jpegThumbnail?.length) {
        const s = await classifyImage(Buffer.from(msg.jpegThumbnail));
        all.push(s);
        if (isBad(s)) return mergeScores(all);
    }

    const buffer = await download(msg, 'video');
    if (buffer.length) {
        const frames = await extractFrames(buffer, msg.seconds);
        for (const frame of frames) {
            const s = await classifyImage(frame);
            all.push(s);
            if (isBad(s)) break;
        }
    }

    return all.length ? mergeScores(all) : null;
}

export default {
    name: 'antiporn',
    aliases: ['antinsfw', 'antistickerporn'],
    description: 'Deletes pornographic stickers, images and videos in the group',
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
                setSetting(ownerId, 'antiporn', true, groupId);
                setSetting(ownerId, 'antipornMode', mode, groupId);
                return await kaya.sendMessage(from, {
                    text: successBox(`Anti porn enabled\n*${MODE_LABEL[mode]}*`)
                }, { quoted: mek });
            }

            if (action === 'off') {
                setSetting(ownerId, 'antiporn', false, groupId);
                return await kaya.sendMessage(from, {
                    text: boxMessage('ANTI PORN', 'Protection disabled.', '❌')
                }, { quoted: mek });
            }

            // Which media types are checked: .antiporn types sticker image video
            if (action === 'types') {
                const list = [...new Set(
                    args.slice(1).map(a => TYPE_ALIASES[a.toLowerCase()]).filter(Boolean)
                )];
                if (!list.length) {
                    return await kaya.sendMessage(from, {
                        text: errorBox(`Usage: ${prefix}antiporn types sticker image video\n(choose one or more)`)
                    }, { quoted: mek });
                }
                setSetting(ownerId, 'antipornTypes', list, groupId);
                return await kaya.sendMessage(from, {
                    text: boxMessage('ANTI PORN', `Checked content: *${list.join(', ')}*`, '⚙️')
                }, { quoted: mek });
            }

            if (action === 'strict') {
                const value = args[1]?.toLowerCase();
                if (!['on', 'off'].includes(value)) {
                    return await kaya.sendMessage(from, {
                        text: errorBox(`Usage: ${prefix}antiporn strict on|off`)
                    }, { quoted: mek });
                }
                setSetting(ownerId, 'antipornStrict', value === 'on', groupId);
                return await kaya.sendMessage(from, {
                    text: boxMessage('ANTI PORN', `Strict mode (also "sexy" content): *${value.toUpperCase()}*`, '⚙️')
                }, { quoted: mek });
            }

            // Self-test: reply to an image / sticker / video with ".antiporn test"
            if (action === 'test') {
                const q = mek.quoted;
                const kindMap = { stickerMessage: 'sticker', imageMessage: 'image', videoMessage: 'video' };
                const kind = kindMap[q?.mtype];

                if (!kind) {
                    return await kaya.sendMessage(from, {
                        text: errorBox(`Reply to an image, sticker or video with ${prefix}antiporn test`)
                    }, { quoted: mek });
                }

                try {
                    const scores = await analyse({ kind, msg: q, dlType: kind }, () => false);
                    if (!scores) throw new Error('Could not read this file');

                    const pct = (n) => `${Math.round((n || 0) * 100)}%`;
                    const result =
                        `• *Porn:* ${pct(scores.Porn)}\n` +
                        `• *Hentai:* ${pct(scores.Hentai)}\n` +
                        `• *Sexy:* ${pct(scores.Sexy)}\n` +
                        `• *Neutral:* ${pct(scores.Neutral)}\n` +
                        `• *Drawing:* ${pct(scores.Drawing)}\n\n` +
                        `Limit: ${Math.round(THRESHOLD * 100)}% (Porn + Hentai)`;
                    return await kaya.sendMessage(from, {
                        text: boxMessage('ANTI PORN TEST', result, '🧪')
                    }, { quoted: mek });
                } catch (e) {
                    return await kaya.sendMessage(from, {
                        text: errorBox(`Analysis failed:\n${e?.message || e}`)
                    }, { quoted: mek });
                }
            }

            if (action === 'status') {
                const enabled = getSetting(ownerId, 'antiporn', false, groupId);
                const mode = getSetting(ownerId, 'antipornMode', 'delete', groupId);
                const strict = getSetting(ownerId, 'antipornStrict', false, groupId);
                const types = getSetting(ownerId, 'antipornTypes', ALL_TYPES, groupId);
                let content = enabled
                    ? `• *Status:* ✅ Enabled\n• *Mode:* ${MODE_LABEL[mode] || mode}\n• *Checked:* ${types.join(', ')}\n• *Strict:* ${strict ? 'ON' : 'OFF'}`
                    : '• *Status:* ❌ Disabled';

                const last = lastEvent[groupId];
                content += last
                    ? `\n• *Last check:* ${last.text} (${Math.round((Date.now() - last.time) / 1000)}s ago)`
                    : '\n• *Last check:* nothing received yet since restart';
                return await kaya.sendMessage(from, {
                    text: boxMessage('ANTI PORN', content, '📊')
                }, { quoted: mek });
            }

            const menu =
                `• \`${prefix}antiporn on\` *(delete)*\n` +
                `• \`${prefix}antiporn warn\` *(delete + warnings, remove at ${MAX_WARNINGS})*\n` +
                `• \`${prefix}antiporn kick\` *(delete + remove sender)*\n` +
                `• \`${prefix}antiporn types sticker image video\` *(what is checked)*\n` +
                `• \`${prefix}antiporn strict on|off\` *(also "sexy" content)*\n` +
                `• \`${prefix}antiporn test\` *(reply to a media to test it)*\n` +
                `• \`${prefix}antiporn off\` *(disable)*\n` +
                `• \`${prefix}antiporn status\` *(current state)*`;
            await kaya.sendMessage(from, {
                text: boxMessage('ANTI PORN', menu, '🛡️')
            }, { quoted: mek });

        } catch (err) {
            console.error('❌ Antiporn error:', err);
            await kaya.sendMessage(from, { text: errorBox('Antiporn error.') }, { quoted: mek }).catch(() => {});
        }
    },

    async detect(kaya, mek, from, body) {
        let noteGroup = null;
        try {
            if (!from.endsWith('@g.us') || mek.key?.fromMe) return;

            const media = getMedia(mek);
            if (!media) return;

            const ownerId = getOwnerId(kaya);
            const groupId = from.split('@')[0];

            if (!getSetting(ownerId, 'antiporn', false, groupId)) return;

            noteGroup = groupId;
            note(groupId, `${media.kind} received`);

            const types = getSetting(ownerId, 'antipornTypes', ALL_TYPES, groupId);
            if (!types.includes(media.kind)) return;

            if (Number(media.msg.fileLength || 0) > MAX_SIZE[media.kind]) {
                // Too big to analyse (videos: the thumbnail is still checked)
                if (media.kind !== 'video') return;
            }

            const strict = getSetting(ownerId, 'antipornStrict', false, groupId);
            const scoreOf = (s) => s.Porn + s.Hentai + (strict ? s.Sexy : 0);
            const isBad = (s) => scoreOf(s) >= THRESHOLD;

            // Analyse (cached by file hash)
            const sha = media.msg.fileSha256 ? Buffer.from(media.msg.fileSha256).toString('base64') : null;
            let scores = sha ? resultCache.get(sha) : null;

            if (!scores) {
                scores = await analyse(media, isBad);
                if (!scores) return;

                if (sha) {
                    resultCache.set(sha, scores);
                    if (resultCache.size > 500) resultCache.delete(resultCache.keys().next().value);
                }
            }

            note(groupId, `${media.kind} analysed, score ${scoreOf(scores).toFixed(2)}`);

            if (!isBad(scores)) return;

            const sender = mek.sender || mek.key.participant;

            // Skip group admins (checked only when something is flagged)
            const metadata = await kaya.groupMetadata(from).catch(() => null);
            const participant = metadata?.participants.find(
                p => p.id === sender || p.phoneNumber === sender || p.lid === sender
            );
            if (participant?.admin) return;

            note(groupId, `${media.kind} DELETED, score ${scoreOf(scores).toFixed(2)}`);

            await delay(300);
            await kaya.sendMessage(from, { delete: mek.key }).catch(() => {});

            const mode = getSetting(ownerId, 'antipornMode', 'delete', groupId);

            if (mode === 'kick') {
                await delay(1000);
                await kaya.groupParticipantsUpdate(from, [sender], 'remove').catch(() => {});
                return;
            }

            if (mode === 'warn') {
                const key = `pornwarn_${sender}`;
                const warns = Number(getSetting(ownerId, key, 0, groupId)) + 1;

                if (warns >= MAX_WARNINGS) {
                    setSetting(ownerId, key, 0, groupId);
                    await delay(1000);
                    await kaya.groupParticipantsUpdate(from, [sender], 'remove').catch(() => {});
                    await kaya.sendMessage(from, {
                        text: `🚫 @${sender.split('@')[0]} *removed: pornographic content.*`,
                        mentions: [sender]
                    });
                } else {
                    setSetting(ownerId, key, warns, groupId);
                    await kaya.sendMessage(from, {
                        text: `⚠️ *PORNOGRAPHIC CONTENT REMOVED*\n• *User:* @${sender.split('@')[0]}\n• *Warnings:* ${warns}/${MAX_WARNINGS}`,
                        mentions: [sender]
                    });
                }
            }
        } catch (err) {
            // Never crash the bot because of the analysis
            console.error('❌ AntiPorn detect error:', err?.message || err);
            if (noteGroup) note(noteGroup, `ERROR: ${err?.message || err}`);
        }
    }
};
