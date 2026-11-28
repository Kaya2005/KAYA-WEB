// ==================== commands/top.js ====================
import { getContentType } from '@whiskeysockets/baileys';
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId, isGroupAdmin } from '../lib/common.js';
import { record, getGroupActivity, resetGroup } from '../lib/activity.js';

const IGNORED = new Set(['protocolMessage', 'reactionMessage', 'senderKeyDistributionMessage', 'messageContextInfo']);
const MEDALS = ['🥇', '🥈', '🥉'];

export default {
    name: 'top',
    aliases: ['classement'],
    description: 'Most active members of the week',
    category: 'Group',
    group: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const groupId = from.split('@')[0];
            const action = args[0]?.toLowerCase();

            if (['on', 'off', 'reset'].includes(action)) {
                if (!(await isGroupAdmin(kaya, from, mek.sender)) && !mek.key?.fromMe) {
                    return await kaya.sendMessage(from, { text: errorBox('Admins only.') }, { quoted: mek });
                }
                if (action === 'reset') {
                    resetGroup(ownerId, groupId);
                    return await kaya.sendMessage(from, { text: successBox('Activity data cleared.') }, { quoted: mek });
                }
                setSetting(ownerId, 'top', action === 'on', groupId);
                return await kaya.sendMessage(from, { text: successBox(`Activity tracking ${action.toUpperCase()}`) }, { quoted: mek });
            }

            if (!getSetting(ownerId, 'top', false, groupId)) {
                return await kaya.sendMessage(from, { text: errorBox(`Tracking is off. An admin must send ${prefix}top on`) }, { quoted: mek });
            }

            const g = getGroupActivity(ownerId, groupId);
            const ranking = Object.entries(g.counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
            if (!ranking.length) {
                return await kaya.sendMessage(from, { text: boxMessage('TOP OF THE WEEK', 'No message recorded yet.', '🏆') }, { quoted: mek });
            }

            const lines = ranking.map(([jid, n], i) => `${MEDALS[i] || `*${i + 1}.*`} @${jid.split('@')[0]} — ${n}`);
            await kaya.sendMessage(from, {
                text: boxMessage('TOP OF THE WEEK', lines.join('\n'), '🏆'),
                mentions: ranking.map(([jid]) => jid)
            }, { quoted: mek });
        } catch (err) {
            console.error('❌ top error:', err);
            await kaya.sendMessage(from, { text: errorBox('Top error.') }, { quoted: mek }).catch(() => {});
        }
    },

    // Called by case.js for every message
    async hook(kaya, mek, from) {
        if (!from.endsWith('@g.us') || !mek.message) return;
        const ownerId = getOwnerId(kaya);
        const groupId = from.split('@')[0];
        if (!getSetting(ownerId, 'top', false, groupId)) return;
        if (IGNORED.has(getContentType(mek.message))) return;
        record(ownerId, groupId, mek.sender || mek.key.participant);
    }
};
