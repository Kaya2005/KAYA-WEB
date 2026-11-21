import { downloadContentFromMessage, getContentType } from '@whiskeysockets/baileys';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import { usageBox, errorBox } from '../setting/theme.js';

// Returns the media object (imageMessage / videoMessage) to convert, or null
function getMedia(mek) {
    // 1) Replied message
    let media = mek.quoted || null;

    // Quoted message wrapped (view once / ephemeral)
    if (media?.message) {
        const inner =
            media.message.ephemeralMessage?.message ||
            media.message.viewOnceMessage?.message ||
            media.message.viewOnceMessageV2?.message ||
            media.message;
        media = inner[getContentType(inner)] || null;
    }

    // 2) Image/video sent with the command as caption
    if (!media?.mimetype && /^(image|video)Message$/.test(mek.mtype || '')) {
        media = mek.msg;
    }

    return media?.mimetype && /^(image|video)\//.test(media.mimetype) ? media : null;
}

export default {
    name: 'sticker',
    alias: ['s', 'stiker', 'stick'],
    description: 'Convert image or video to sticker',
    category: 'Tools',

    async execute(kaya, mek, from, args, prefix) {
        try {
            const media = getMedia(mek);

            if (!media) {
                return await kaya.sendMessage(
                    from,
                    { text: usageBox(prefix, 'sticker', 'reply to an image or video') },
                    { quoted: mek }
                );
            }

            const mediaType = media.mimetype.split('/')[0]; // image | video

            if (mediaType === 'video' && (media.seconds || 0) > 10) {
                return await kaya.sendMessage(
                    from,
                    { text: errorBox('Video too long (10 seconds max).') },
                    { quoted: mek }
                );
            }

            // Download
            let buffer = Buffer.alloc(0);
            try {
                const stream = await downloadContentFromMessage(media, mediaType);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
            } catch (dlError) {
                console.error('❌ Sticker download error:', dlError);
                return await kaya.sendMessage(from, { text: errorBox('Unable to download this media.') }, { quoted: mek });
            }

            if (!buffer.length) {
                return await kaya.sendMessage(from, { text: errorBox('The file is empty or corrupted.') }, { quoted: mek });
            }

            // Create the sticker (animated videos/GIFs are detected automatically)
            let stickerBuffer;
            try {
                const sticker = new Sticker(buffer, {
                    pack: 'KAYA-MD',
                    author: 'kaya-tech',
                    type: StickerTypes.FULL,
                    quality: 50
                });
                stickerBuffer = await sticker.toBuffer();
            } catch (stickerError) {
                console.error('❌ Sticker creation error:', stickerError);
                return await kaya.sendMessage(
                    from,
                    { text: errorBox('Sticker creation failed (file too heavy or format not supported).') },
                    { quoted: mek }
                );
            }

            await kaya.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });

        } catch (err) {
            console.error('❌ Sticker command error:', err);
            await kaya.sendMessage(from, { text: errorBox('An error occurred while creating the sticker.') }, { quoted: mek }).catch(() => {});
        }
    }
};
