import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { addExif } from '../lib/sticker.js';

export default {
    name: 'take',
    alias: ['steal', 't'],
    description: 'Steal a sticker and change its pack/author name',
    category: 'Tools',

    async execute(kaya, mek, from, args, prefix) {
        try {
            // Détection robuste du message cité contenant un sticker
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

            // Téléchargement du flux du sticker
            const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
            const chunks = [];

            for await (const chunk of stream) {
                chunks.push(chunk);
            }

            const buffer = Buffer.concat(chunks);

            if (!buffer || buffer.length === 0) {
                return await kaya.sendMessage(from, { text: '❌ The sticker is empty or corrupted.' }, { quoted: mek });
            }

            // Récupération du packname et de l'auteur depuis les arguments (ex: .take MonPack | MonAuteur)
            const input = args.join(' ');
            const [packName, authorName] = input.includes('|') 
                ? input.split('|').map(s => s.trim()) 
                : [input || 'KAYA-BOT', 'kaya-tech'];

            // Utilisation de ta fonction addExif existante pour générer le sticker avec les métadonnées
            const stickerBuffer = await addExif(buffer, {
                packname: packName,
                author: authorName,
                quality: 50
            });

            if (!stickerBuffer || stickerBuffer.length === 0) {
                return await kaya.sendMessage(from, { text: '❌ Failed to process the sticker.' }, { quoted: mek });
            }

            // Envoi direct du sticker sans message textuel d'accompagnement
            await kaya.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });

        } catch (error) {
            console.error('❌ Critical error in take command:', error);
            await kaya.sendMessage(from, { text: '❌ An error occurred while taking the sticker.' }, { quoted: mek });
        }
    }
};
