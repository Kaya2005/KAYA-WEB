// autoreactch.js
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox, usageBox } from '../setting/theme.js';
import { getString } from '../setting/language.js';

const RANDOM_EMOJIS = ['❤️','😂','🎉','👍','🔥','😮','👏','🎊','🤯','😍','🥰','😎','🤩','💯','✨','🌟','💖','💕','💙','💚','💛','💜','🖤','🤍','🧡','😊','😇','🥳','😋','😜','🤪','🤗','🤭'];
const getRandomEmoji = () => RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
    name: 'autoreactch',
    category: 'Owner',
    description: 'Réagir automatiquement à une publication spécifique d\'une chaîne via son lien',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            const inputLink = args[0]; // Le lien de l'actu ex: https://whatsapp.com/channel/.../104

            if (!inputLink || !inputLink.includes('whatsapp.com/channel/')) {
                const usageContent = 
                    `• Utilisez le lien de l'actualité de la chaîne :\n` +
                    `\`${prefix}autoreactch https://whatsapp.com/channel/CODE/ID_MESSAGE\`\n\n` +
                    `*Exemple :*\n` +
                    `\`${prefix}autoreactch https://whatsapp.com/channel/0029Vb8GO1G9hXFAF1Taqr0q/104\``;

                return kaya.sendMessage(from, { 
                    text: boxMessage('REACTION CIBLÉE - CHAÎNE', usageContent, '🔗') 
                }, { quoted: mek });
            }

            // Extraction de l'ID du message à la fin du lien (ex: /104 -> 104)
            const parts = inputLink.split('/');
            const messageId = parts[parts.length - 1];

            // Extraction du code de la chaîne (ex: 0029Vb8GO1G9hXFAF1Taqr0q)
            // Sur WhatsApp, le JID d'une chaîne utilise souvent un format interne, 
            // mais on peut tenter de résoudre ou d'utiliser directement le lien si géré par Baileys,
            // ou cibler le chat actuel si vous êtes dans la chaîne.
            
            if (!messageId || isNaN(messageId)) {
                return kaya.sendMessage(from, { 
                    text: errorBox('Lien invalide. Impossible de trouver l\'identifiant de l\'actualité à la fin du lien.') 
                }, { quoted: mek });
            }

            await kaya.sendMessage(from, { text: successBox(`⏳ Recherche et ciblage de l'actualité ID : ${messageId}...`) }, { quoted: mek });

            // Petit délai de sécurité
            await delay(1000);

            // Pour réagir à une publication spécifique via son ID numérique dans la chaîne où l'on se trouve :
            const emoji = getRandomEmoji();
            
            // Construction de la clé spécifique pour l'actualité ciblée
            // Note: Les IDs de messages de chaînes nécessitent parfois le JID complet de la newsletter
            const targetJid = from.endsWith('@newsletter') ? from : `${parts[4]}@newsletter`;

            const reactionKey = {
                remoteJid: targetJid,
                id: messageId,
                fromMe: false
            };

            await kaya.sendMessage(targetJid, { 
                react: { 
                    text: emoji, 
                    key: reactionKey 
                } 
            });

            return kaya.sendMessage(from, { 
                text: successBox(`✅ Réaction (${emoji}) envoyée avec succès sur l'actualité ${messageId} !`) 
            }, { quoted: mek });

        } catch (err) { 
            console.error('❌ autoreactch error:', err);
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            await kaya.sendMessage(from, { 
                text: errorBox('Une erreur est survenue lors de la tentative de réaction sur la chaîne.') 
            }, { quoted: mek });
        }
    }
};
