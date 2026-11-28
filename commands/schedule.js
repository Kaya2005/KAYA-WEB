// ==================== commands/schedule.js ====================
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId } from '../lib/common.js';
import {
    getTz, isValidTz, parseWhen, formatAt, addScheduled, listScheduled, removeScheduled
} from '../lib/scheduler.js';
import { setSetting } from '../setting.js';

export default {
    name: 'schedule',
    aliases: ['programme'],
    description: 'Send a message in this chat at a chosen time',
    category: 'Group',
    group: true,
    admin: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const tz = getTz(ownerId);
            const first = args[0]?.toLowerCase();

            if (first === 'list') {
                const items = listScheduled(ownerId, i => i.jid === from && i.kind !== 'remind');
                const content = items.length
                    ? items.map((i, n) => `*${n + 1}.* ${formatAt(i.at, tz)}\n${i.text.slice(0, 60)}`).join('\n\n')
                    : 'Nothing scheduled in this chat.';
                return await kaya.sendMessage(from, { text: boxMessage(`SCHEDULED (${tz})`, content, '🗓️') }, { quoted: mek });
            }

            if (first === 'del') {
                const items = listScheduled(ownerId, i => i.jid === from && i.kind !== 'remind');
                const item = items[parseInt(args[1], 10) - 1];
                if (!item) return await kaya.sendMessage(from, { text: errorBox(`Usage: ${prefix}schedule del 1`) }, { quoted: mek });
                removeScheduled(ownerId, item.id);
                return await kaya.sendMessage(from, { text: successBox('Scheduled message deleted.') }, { quoted: mek });
            }

            if (first === 'tz') {
                if (!args[1] || !isValidTz(args[1])) {
                    return await kaya.sendMessage(from, { text: errorBox(`Usage: ${prefix}schedule tz Africa/Kinshasa`) }, { quoted: mek });
                }
                setSetting(ownerId, 'tz', args[1]);
                return await kaya.sendMessage(from, { text: successBox(`Time zone: ${args[1]}`) }, { quoted: mek });
            }

            const at = parseWhen(args[0], tz);
            const text = args.slice(1).join(' ').trim();
            if (!at || !text) {
                const menu =
                    `• \`${prefix}schedule 18:30 Meeting tonight\`\n` +
                    `• \`${prefix}schedule 2h Reminder\` *(30s, 15m, 2h, 1d)*\n` +
                    `• \`${prefix}schedule list\`\n• \`${prefix}schedule del 1\`\n• \`${prefix}schedule tz ${tz}\``;
                return await kaya.sendMessage(from, { text: boxMessage(`SCHEDULE (${tz})`, menu, '🗓️') }, { quoted: mek });
            }

            addScheduled(ownerId, { jid: from, at, text, kind: 'send' });
            await kaya.sendMessage(from, { text: successBox(`Scheduled for ${formatAt(at, tz)}`) }, { quoted: mek });
        } catch (err) {
            console.error('❌ schedule error:', err);
            await kaya.sendMessage(from, { text: errorBox('Schedule error.') }, { quoted: mek }).catch(() => {});
        }
    }
};
