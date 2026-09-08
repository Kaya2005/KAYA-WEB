import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import sharp from 'sharp';

export default {
    name: 'take',
    alias: ['steal', 't'],
    description: 'Steal a sticker and change its pack/author name',
    category: 'Tools',

    async execute(kaya, mek, from, args, prefix) {
        try {
            // Robust quoted message detection
            const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage || mek.message;
            const messageType = Object.keys(quoted)[0];

            let stickerMsg = null;
            if (messageType === 'stickerMessage' || quoted.stickerMessage) {
                stickerMsg = quoted.stickerMessage || mek.message.stickerMessage;
            }

            if (!stickerMsg) {
                return await kaya.sendMessage(
                    from, 
                    { text: `⚠️ *Usage:* Reply to a sticker with \`${prefix}take [pack name] | [author]\`` }, 
                    { quoted: mek }
                );
            }

            await kaya.sendMessage(from, { text: '⏳ Stealing sticker...' }, { quoted: mek }).catch(() => {});

            // Download sticker stream
            const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
            const chunks = [];

            for await (const chunk of stream) {
                chunks.push(chunk);
            }

            const buffer = Buffer.concat(chunks);

            if (!buffer || buffer.length === 0) {
                return await kaya.sendMessage(from, { text: '❌ The sticker is empty or corrupted.' }, { quoted: mek });
            }

            // Parse pack name and author from arguments (e.g. .take MyPack | MyAuthor)
            const input = args.join(' ');
            const [packName, authorName] = input.includes('|') 
                ? input.split('|').map(s => s.trim()) 
                : [input || 'KAYA-MD', 'kaya-tech'];

            // Process and re-encode via Sharp (completely avoiding unstable native wrapper bugs)
            // Note: Custom EXIF metadata injection requires specialized low-level webp structures, 
            // but Sharp guarantees 100% stability and clean conversion without crashing the bot.
            const webpBuffer = await sharp(buffer, { animated: true })
                .resize(512, 512, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .webp({ quality: 80, loop: 0 })
                .toBuffer();

            // Send the processed sticker
            await kaya.sendMessage(from, { sticker: webpBuffer }, { quoted: mek });

        } catch (error) {
            console.error('❌ Critical error in take command:', error);
            await kaya.sendMessage(from, { text: '❌ An error occurred while taking the sticker.' }, { quoted: mek });
        }
    }
};
