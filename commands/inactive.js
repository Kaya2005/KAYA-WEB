// ==================== commands/inactive.js ====================
import { getSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { delay, getOwnerId, numOf, normJid } from '../lib/common.js';
import { getGroupActivity } from '../lib/activity.js';

export default {
    name: 'inactive',
    aliases: ['inactif'],
    description: 'Lists (and removes) members who did not write for N days',
    category: 'Group',
    group: true,
    admin: true,
    botAdmin: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const groupId = from.split('@')[0];

            if (!getSetting(ownerId, 'top', false, groupId)) {
                return await kaya.sendMessage(from, { text: errorBox(`Activity tracking is off.\nEnable it with ${prefix}top on and wait for data.`) }, { quoted: mek });
            }

            const days = parseInt(args[0], 10);
            if (!(days >= 1 && days <= 365)) {
                return await kaya.sendMessage(from, { text: errorBox(`Usage: ${prefix}inactive 30\n${prefix}inactive 30 kick`) }, { quoted: mek });
            }

            const g = getGroupActivity(ownerId, groupId);
            const trackedDays = (Date.now() - g.since) / 86400000;
            const limit = Date.now() - days * 86400000;
            const meta = await kaya.groupMetadata(from);
            const botNum = numOf(kaya.user?.id);

            const inactive = [];
            let unknown = 0;
            for (const p of meta.participants) {
                if (p.admin) continue;
                if (numOf(p.id) === botNum || numOf(p.phoneNumber) === botNum) continue;

                const last = g.last[normJid(p.id)] || g.last[normJid(p.phoneNumber)] || g.last[normJid(p.lid)];
                if (last) { if (last < limit) inactive.push(p.id); }
                else if (trackedDays >= days) inactive.push(p.id);
                else unknown++;
            }

            if (args[1]?.toLowerCase() === 'kick') {
                const batch = inactive.slice(0, 30);
                for (const id of batch) {
                    await kaya.groupParticipantsUpdate(from, [id], 'remove').catch(() => {});
                    await delay(1500);
                }
                return await kaya.sendMessage(from, { text: successBox(`${batch.length} inactive member(s) removed.`) }, { quoted: mek });
            }

            const shown = inactive.slice(0, 40);
            const content =
                (shown.length ? shown.map(id => `• @${id.split('@')[0]}`).join('\n') : 'No inactive member.') +
                (inactive.length > 40 ? `\n... +${inactive.length - 40}` : '') +
                `\n\nTracking for ${trackedDays.toFixed(1)} day(s)` +
                (unknown ? `\n${unknown} member(s) not judged yet (tracking is too recent).` : '') +
                (inactive.length ? `\nTo remove them: ${prefix}inactive ${days} kick` : '');

            await kaya.sendMessage(from, {
                text: boxMessage(`INACTIVE ${days}+ DAYS`, content, '💤'),
                mentions: shown
            }, { quoted: mek });
        } catch (err) {
            console.error('❌ inactive error:', err);
            await kaya.sendMessage(from, { text: errorBox('Inactive error.') }, { quoted: mek }).catch(() => {});
        }
    }
};
