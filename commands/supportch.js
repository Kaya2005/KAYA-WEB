// ==================== commands/supportch.js ====================
// Each user controls whether THEIR session reacts to the KAYA channel posts.
import { getSetting, setSetting } from '../setting.js';
import { boxMessage } from '../setting/theme.js';

const getOwnerId = (kaya) =>
    kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

export default {
    name: 'supportch',
    aliases: ['supportchannel'],
    description: '📢 React to channel posts of KAYA bot users with your number',
    category: 'Admin',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        const ownerId = getOwnerId(kaya);
        const action = args[0]?.toLowerCase();

        if (action === 'on') {
            setSetting(ownerId, 'supportch', true);
            return await kaya.sendMessage(from, {
                text: boxMessage('📢 SUPPORT CHANNEL', '✅ Enabled.\nYour number will react with an emoji to the channel posts of KAYA bot users.', '✅')
            }, { quoted: mek });
        }

        if (action === 'off') {
            setSetting(ownerId, 'supportch', false);
            return await kaya.sendMessage(from, {
                text: boxMessage('📢 SUPPORT CHANNEL', '🔴 Disabled.\nYour number will no longer react to channel posts.', '🔴')
            }, { quoted: mek });
        }

        const enabled = Boolean(getSetting(ownerId, 'supportch', true));
        const content =
            `*Status:* ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}\n\n` +
            `┆ 💻 \`${prefix}supportch on\` — Enable\n` +
            `┆ 💻 \`${prefix}supportch off\` — Disable`;

        await kaya.sendMessage(from, {
            text: boxMessage('📢 SUPPORT CHANNEL', content, '⚙️')
        }, { quoted: mek });
    }
};
