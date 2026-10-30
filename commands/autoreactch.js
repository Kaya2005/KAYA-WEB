// autoreactch.js
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getString } from '../setting/language.js';

const RANDOM_EMOJIS = ['❤️','😂','🎉','👍','🔥','😮','👏','🎊','🤯','😍','🥰','😎','🤩','💯','✨','🌟','💖','💕','💙','💚','💛','💜','🖤','🤍','🧡','😊','😇','🥳','😋','😜','🤪','🤗','🤭'];
const getRandomEmoji = () => RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];

const lastReaction = new Map();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
    name: 'autoreactch',
    category: 'Owner',
    description: 'Activer ou désactiver l\'auto-réaction dans les chaînes (Channels)',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            const rawAction = args[0]?.toLowerCase();

            const actionMap = {
                "on": "on",
                "oui": "on",
                "yes": "on",

                "off": "off",
                "non": "off",
                "no": "off",

                "status": "status",
                "statut": "status"
            };

            const action = actionMap[rawAction];

            if (!action) {
                const menuContent = 
                    `• \`${prefix}autoreactch on / oui\` : Activer\n` +
                    `• \`${prefix}autoreactch off / non\` : Désactiver\n` +
                    `• \`${prefix}autoreactch status\` : Vérifier le statut`;

                return kaya.sendMessage(from, { 
                    text: boxMessage('AUTOREACT CHANNEL', menuContent, '📢') 
                }, { quoted: mek });
            }

            if (action === 'on') {
                setSetting(ownerId, 'autoreactch', true);
                return kaya.sendMessage(from, { 
                    text: successBox('Auto-réaction pour les chaînes activée avec succès ! 📢') 
                }, { quoted: mek });
            }

            if (action === 'off') {
                setSetting(ownerId, 'autoreactch', false);
                return kaya.sendMessage(from, { 
                    text: boxMessage('AUTOREACT CHANNEL', 'Auto-réaction pour les chaînes désactivée. ❌', '📢') 
                }, { quoted: mek });
            }

            if (action === 'status') {
                const isEnabled = getSetting(ownerId, 'autoreactch', false);
                const statusValue = isEnabled ? 'ACTIVÉ ✅' : 'DÉSACTIVÉ ❌';

                const statusContent = `• *Statut Chaînes :* ${statusValue}`;
                return kaya.sendMessage(from, { 
                    text: boxMessage('STATUT AUTOREACT CHANNEL', statusContent, '📊') 
                }, { quoted: mek });
            }
        } catch (err) { 
            console.error('❌ autoreactch error:', err);
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            await kaya.sendMessage(from, { 
                text: errorBox('Une erreur est survenue avec la commande autoreactch.') 
            }, { quoted: mek });
        }
    },

    async listen(kaya, mek, from) {
        try {
            // Uniquement cibler les chaînes WhatsApp (@newsletter)
            const isChannel = from.endsWith('@newsletter');
            if (!isChannel) return;

            if (mek.key?.fromMe) return;

            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            const isEnabled = getSetting(ownerId, 'autoreactch', false);
            if (!isEnabled) return;

            // Cooldown de 10 secondes par chaîne
            const now = Date.now();
            if (lastReaction.has(from) && now - lastReaction.get(from) < 10000) return;
            lastReaction.set(from, now);

            // Petit délai aléatoire simulé
            await delay(Math.floor(Math.random() * 2000) + 1000); 
            
            await kaya.sendMessage(from, { react: { text: getRandomEmoji(), key: mek.key } });
        } catch (err) {
            console.error('❌ Auto-react channel listen error:', err);
        }
    }
};
