// ==================== commands/blacklist.js ====================
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId, numOf } from '../lib/common.js';
import { isMaster, MASTERS, NO_MASTER_TEXT } from '../lib/master.js';
import { addBlacklist, removeBlacklist, listBlacklist } from '../lib/blacklist.js';

export default {
    name: 'blacklist',
    aliases: ['bl'],
    description: 'Global blacklist: blocked numbers cannot use any session (master only)',
    category: 'Owner',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        if (!MASTERS.length) return await kaya.sendMessage(from, { text: errorBox(NO_MASTER_TEXT) }, { quoted: mek });
        if (!isMaster(getOwnerId(kaya)) || !mek.key?.fromMe) {
            return await kaya.sendMessage(from, { text: errorBox('Master only.') }, { quoted: mek });
        }

        const action = args[0]?.toLowerCase();

        if (action === 'add' || action === 'del') {
            // number in the command, or reply to / mention the person
            const ctx = mek.msg?.contextInfo;
            const fromMention = ctx?.mentionedJid?.[0];
            const fromReply = mek.quoted?.sender;
            const typed = args[1] && /\d{6,}/.test(args[1]) ? args[1] : '';
            const target = typed || fromMention || fromReply;
            const number = numOf(target);

            if (!number) {
                return await kaya.sendMessage(from, { text: errorBox(`Usage: ${prefix}bl ${action} 243812345678\n(or reply to / mention the person)`) }, { quoted: mek });
            }
            if (isMaster(number)) {
                return await kaya.sendMessage(from, { text: errorBox('You cannot blacklist a master number.') }, { quoted: mek });
            }

            if (action === 'add') {
                const reason = args.slice(typed ? 2 : 1).join(' ');
                addBlacklist(number, reason);
                return await kaya.sendMessage(from, { text: successBox(`+${number} blacklisted.`) }, { quoted: mek });
            }
            const had = removeBlacklist(number);
            return await kaya.sendMessage(from, { text: had ? successBox(`+${number} removed from the blacklist.`) : errorBox('Number not in the blacklist.') }, { quoted: mek });
        }

        if (action === 'list') {
            const items = listBlacklist();
            const content = items.length
                ? items.map(i => `• +${i.number}${i.reason ? ` (${i.reason})` : ''}`).join('\n')
                : 'The blacklist is empty.';
            return await kaya.sendMessage(from, { text: boxMessage('BLACKLIST', content, '🚫') }, { quoted: mek });
        }

        await kaya.sendMessage(from, {
            text: boxMessage('BLACKLIST', `• \`${prefix}bl add 243812345678 reason\`\n• \`${prefix}bl del 243812345678\`\n• \`${prefix}bl list\`\n\nBlocked numbers can no longer run commands on any session.`, '🚫')
        }, { quoted: mek });
    }
};
