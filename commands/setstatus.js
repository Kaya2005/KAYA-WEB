// ==================== commands/setstatus.js ====================
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { getSetting } from '../setting.js';

export default {
    name: 'setstatus',
    aliases: ['poststatus', 'statuspost'],
    description: '📢 Poste n\'importe quel type de contenu (photo, vidéo, audio, document, texte) en statut WhatsApp en répondant au message.',
    category: 'Owner',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = kaya.user.id.split(':')[0];

            // Vérification si la commande est une réponse à un message
            const isQuoted = mek.message && 
                             mek.message.extendedTextMessage && 
                             mek.message.extendedTextMessage.contextInfo && 
                             mek.message.extendedTextMessage.contextInfo.quotedMessage;
            
            if (!isQuoted) {
                await kaya.sendMessage(from, { text: `❌ Veuillez répondre à un message (photo, vidéo, audio, document ou texte) avec la commande *${prefix}setstatus* pour le poster en statut !` }, { quoted: mek });
                return;
            }

            const quotedMsg = mek.message.extendedTextMessage.contextInfo.quotedMessage;
            
            // Récupération des participants pour diffuser le statut à tous les contacts/groupes selon le comportement Baileys
            let participants = [];
            const isGroup = from.endsWith('@g.us');
            if (isGroup) {
                const groupMetadata = await kaya.groupMetadata(from).catch(() => {});
                if (groupMetadata && groupMetadata.participants) {
                    participants = groupMetadata.participants.map(p => p.id);
                }
            } else {
                participants = [ownerId + '@s.whatsapp.net'];
            }

            // Utilitaire pour télécharger n'importe quel type de flux média
            const getMediaBuffer = async (messageContent, mediaType) => {
                const stream = await downloadContentFromMessage(messageContent, mediaType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                return buffer;
            };

            // Traitement selon le type de message cité
            if (quotedMsg.imageMessage) {
                const mediaBuffer = await getMediaBuffer(quotedMsg.imageMessage, 'image');
                await kaya.sendMessage('status@broadcast', {
                    image: mediaBuffer,
                    caption: quotedMsg.imageMessage.caption || ''
                }, {
                    statusJidList: participants,
                    broadcast: true
                });
                await kaya.sendMessage(from, { text: "✅ Image postée avec succès en statut !" }, { quoted: mek });
                
            } else if (quotedMsg.videoMessage) {
                const mediaBuffer = await getMediaBuffer(quotedMsg.videoMessage, 'video');
                await kaya.sendMessage('status@broadcast', {
                    video: mediaBuffer,
                    caption: quotedMsg.videoMessage.caption || ''
                }, {
                    statusJidList: participants,
                    broadcast: true
                });
                await kaya.sendMessage(from, { text: "✅ Vidéo postée avec succès en statut !" }, { quoted: mek });
                
            } else if (quotedMsg.audioMessage) {
                const mediaBuffer = await getMediaBuffer(quotedMsg.audioMessage, 'audio');
                await kaya.sendMessage('status@broadcast', {
                    audio: mediaBuffer,
                    mimetype: quotedMsg.audioMessage.mimetype || 'audio/mp4',
                    ptt: quotedMsg.audioMessage.ptt || false
                }, {
                    statusJidList: participants,
                    broadcast: true
                });
                await kaya.sendMessage(from, { text: "✅ Audio/Vocale posté avec succès en statut !" }, { quoted: mek });
                
            } else if (quotedMsg.documentMessage) {
                const mediaBuffer = await getMediaBuffer(quotedMsg.documentMessage, 'document');
                await kaya.sendMessage('status@broadcast', {
                    document: mediaBuffer,
                    mimetype: quotedMsg.documentMessage.mimetype,
                    fileName: quotedMsg.documentMessage.fileName || 'document',
                    caption: quotedMsg.documentMessage.caption || ''
                }, {
                    statusJidList: participants,
                    broadcast: true
                });
                await kaya.sendMessage(from, { text: "✅ Document posté avec succès en statut !" }, { quoted: mek });
                
            } else if (quotedMsg.conversation || quotedMsg.extendedTextMessage) {
                const textContent = quotedMsg.conversation || quotedMsg.extendedTextMessage.text;
                const finalCaption = args.length > 0 ? args.join(' ') : textContent;
                
                await kaya.sendMessage('status@broadcast', {
                    text: finalCaption
                }, {
                    statusJidList: participants,
                    broadcast: true,
                    backgroundColor: "#007AFF"
                });
                await kaya.sendMessage(from, { text: "✅ Texte posté avec succès en statut !" }, { quoted: mek });
                
            } else {
                await kaya.sendMessage(from, { text: "❌ Ce format de message n'est pas pris en charge pour la publication en statut." }, { quoted: mek });
            }

        } catch (err) {
            console.error('❌ Erreur dans setstatus.js :', err);
            await kaya.sendMessage(from, { text: `⚠️ Une erreur est survenue lors de la publication du statut : ${err.message}` }, { quoted: mek });
        }
    }
};
