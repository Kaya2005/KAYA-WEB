import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

export default {
    name: 'take',
    alias: ['steal', 't'],
    description: 'Steal a sticker and change its pack/author name',
    category: 'Tools',

    async execute(kaya, mek, from, args, prefix) {
        try {
            // 1. Utiliser mek.quoted pour récupérer le message cité de manière fiable
            const quoted = mek.quoted ? mek.quoted : mek;
            const mime = (quoted.msg || quoted).mimetype || '';

            if (!/image|webp/.test(mime) && !quoted.stickerMessage) {
                return await kaya.sendMessage(from, { text: `⚠️ *Usage:* Réponds à un sticker avec ${prefix}take [nom du pack] | [auteur]` }, { quoted: mek });
            }

            await kaya.sendMessage(from, { text: '⏳ Récupération du sticker en cours...' }, { quoted: mek }).catch(() => {});

            // 2. Définir le nom et l'auteur
            const input = args.join(' ');
            const [packName, authorName] = input.includes('|') 
                ? input.split('|').map(s => s.trim()) 
                : [input || mek.pushName || 'KAYA-MD', 'kaya-tech'];

            // 3. Téléchargement sécurisé du sticker
            let stream;
            try {
                // Si c'est un sticker, le type de contenu pour Baileys est 'sticker'
                stream = await downloadContentFromMessage(quoted, 'sticker');
            } catch (dlError) {
                console.error('❌ Erreur téléchargement sticker :', dlError);
                return await kaya.sendMessage(from, { text: '❌ Impossible de télécharger ce sticker.' }, { quoted: mek });
            }

            let buffer = Buffer.alloc(0);
            try {
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
            } catch (chunkError) {
                console.error('❌ Erreur lecture flux sticker :', chunkError);
                return await kaya.sendMessage(from, { text: '❌ Erreur lors de la lecture du sticker.' }, { quoted: mek });
            }

            if (!buffer || buffer.length === 0) {
                return await kaya.sendMessage(from, { text: '❌ Le sticker est vide ou corrompu.' }, { quoted: mek });
            }

            // 4. Reformater le sticker avec wa-sticker-formatter
            let stickerBuffer;
            try {
                const sticker = new Sticker(buffer, {
                    pack: packName,
                    author: authorName,
                    type: StickerTypes.FULL,
                    quality: 50
                });
                stickerBuffer = await sticker.toBuffer();
            } catch (formatError) {
                console.error('❌ Erreur formatage sticker :', formatError);
                return await kaya.sendMessage(from, { text: '❌ Erreur lors de la modification des métadonnées du sticker.' }, { quoted: mek });
            }

            if (!stickerBuffer || stickerBuffer.length === 0) {
                return await kaya.sendMessage(from, { text: '❌ Échec du traitement du sticker.' }, { quoted: mek });
            }

            // 5. Envoyer le résultat
            await kaya.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });

        } catch (error) {
            console.error('❌ Erreur critique dans la commande take :', error);
            await kaya.sendMessage(from, { text: '❌ Une erreur est survenue lors de la récupération du sticker.' }, { quoted: mek });
        }
    }
};
