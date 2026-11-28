// ==================== commands/remind.js ====================
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId } from '../lib/common.js';
import { getTz, parseWhen, formatAt, addScheduled, listScheduled, removeScheduled } from '../lib/scheduler.js';

export default {
    name: 'remind',
    aliases: ['rappel'],
    description: 'Personal reminder sent to your own chat',
    category: 'Owner',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const tz = getTz(ownerId);
            const first = args[0]?.toLowerCase();

            if (first === 'list') {
                const items = listScheduled(ownerId, i => i.kind === 'remind');
                const content = items.length
                    ? items.map((i, n) => `*${n + 1}.* ${formatAt(i.at, tz)}\n${i.text.slice(0, 60)}`).join('\n\n')
                    : 'No reminder.';
                return await kaya.sendMessage(from, { text: boxMessage('REMINDERS', content, '⏰') }, { quoted: mek });
            }

            if (first === 'del') {
                const item = listScheduled(ownerId, i => i.kind === 'remind')[parseInt(args[1], 10) - 1];
                if (!item) return await kaya.sendMessage(from, { text: errorBox(`Usage: ${prefix}remind del 1`) }, { quoted: mek });
                removeScheduled(ownerId, item.id);
                return await kaya.sendMessage(from, { text: successBox('Reminder deleted.') }, { quoted: mek });
            }

            const at = parseWhen(args[0], tz);
            const text = args.slice(1).join(' ').trim();
            if (!at || !text) {
                return await kaya.sendMessage(from, {
                    text: boxMessage('REMIND', `• \`${prefix}remind 30m Call Paul\`\n• \`${prefix}remind 18:30 Meeting\`\n• \`${prefix}remind list\`\n• \`${prefix}remind del 1\``, '⏰')
                }, { quoted: mek });
            }

            addScheduled(ownerId, { jid: ownerId + '@s.whatsapp.net', at, text, kind: 'remind' });
            await kaya.sendMessage(from, { text: successBox(`Reminder set for ${formatAt(at, tz)}`) }, { quoted: mek });
        } catch (err) {
            console.error('❌ remind error:', err);
            await kaya.sendMessage(from, { text: errorBox('Remind error.') }, { quoted: mek }).catch(() => {});
        }
    }
};
