import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
    name: 'url',
    alias: ['tourl', 'catbox', 'imgurl'],
    description: 'Convert a replied image or video into a public URL',
    category: 'Tools',

    async execute(kaya, mek, from, args, prefix) {
        try {
            // Robust quoted message detection
            const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage || mek.message;
            const messageType = Object.keys(quoted)[0];

            let mediaMsg = null;
            let mime = '';

            if (messageType === 'imageMessage' || quoted.imageMessage) {
                mediaMsg = quoted.imageMessage || mek.message.imageMessage;
                mime = mediaMsg.mimetype || 'image/jpeg';
            } else if (messageType === 'videoMessage' || quoted.videoMessage) {
                mediaMsg = quoted.videoMessage || mek.message.videoMessage;
                mime = mediaMsg.mimetype || 'video/mp4';
            } else if (messageType === 'documentMessage' || quoted.documentMessage) {
                mediaMsg = quoted.documentMessage || mek.message.documentMessage;
                mime = mediaMsg.mimetype || 'application/octet-stream';
            }

            if (!mediaMsg || !/image|video|document/.test(mime)) {
                return kaya.sendMessage(
                    from,
                    {
                        text: `⚠️ *Usage:* Reply to an image or video with \`${prefix}url\``
                    },
                    { quoted: mek }
                );
            }

            await kaya.sendPresenceUpdate('composing', from);

            // Secure media download
            const typeDownload = mime.includes('video') ? 'video' : (mime.includes('document') ? 'document' : 'image');
            const stream = await downloadContentFromMessage(mediaMsg, typeDownload);
            const chunks = [];

            for await (const chunk of stream) {
                chunks.push(chunk);
            }

            const buffer = Buffer.concat(chunks);

            if (!buffer || buffer.length === 0) {
                return kaya.sendMessage(
                    from,
                    {
                        text: '❌ The media file is empty or corrupted.'
                    },
                    { quoted: mek }
                );
            }

            // Determine correct file extension
            let ext = 'jpg';
            if (mime.includes('png')) ext = 'png';
            else if (mime.includes('webp')) ext = 'webp';
            else if (mime.includes('mp4')) ext = 'mp4';
            else if (mime.includes('gif')) ext = 'gif';

            // Native fetch with FormData and Blob for Catbox upload
            const formData = new FormData();
            formData.append('reqtype', 'fileupload');
            const blob = new Blob([buffer], { type: mime });
            formData.append('fileToUpload', blob, `media_${Date.now()}.${ext}`);

            const response = await fetch('https://catbox.moe/user/api.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Catbox server error (Status ${response.status})`);
            }

            const url = (await response.text()).trim();

            if (!url.startsWith('http')) {
                throw new Error(url || 'Invalid response from Catbox');
            }

            await kaya.sendMessage(
                from,
                {
                    text: `✅ *Media uploaded successfully!*\n\n🔗 ${url}`
                },
                { quoted: mek }
            );

        } catch (err) {
            console.error('❌ Critical error in url command:', err);

            await kaya.sendMessage(
                from,
                {
                    text: `❌ An error occurred: ${err.message}`
                },
                { quoted: mek }
            );
        }
    }
};
