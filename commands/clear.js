// ==================== commands/clear.js ====================
import { errorBox } from '../setting/theme.js';

export default {
  name: 'clear',
  aliases: ['clearchat'],
  description: 'Clear this conversation, for you only',
  category: 'Owner',
  ownerOnly: true,

  async execute(kaya, mek, from, args, prefix) {
    try {
      // Only the account owner typing from their own phone (not sudo users):
      // this deletes the chat on the owner's real WhatsApp.
      if (!mek.key?.fromMe) {
        return await kaya.sendMessage(from, {
          text: errorBox('Only the account owner can use this command.')
        }, { quoted: mek });
      }

      // The command message itself is used as the "last message" of the chat,
      // so everything up to this message is removed (for you only).
      const timestamp =
        Number(mek.messageTimestamp?.toString()) || Math.floor(Date.now() / 1000);

      await Promise.race([
        kaya.chatModify(
          {
            delete: true,
            lastMessages: [{ key: mek.key, messageTimestamp: timestamp }]
          },
          from
        ),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 20000))
      ]);

      // No confirmation message on purpose: it would put a message back in the cleared chat.
    } catch (err) {
      console.error('❌ clear.js error:', err?.message || err);
      await kaya.sendMessage(from, {
        text: errorBox('Could not clear this chat.')
      }, { quoted: mek }).catch(() => {});
    }
  }
};
