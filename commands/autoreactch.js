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
            // 🔎 LOG 1 : Vérifier si un message arrive d'une chaîne
            console.log("📥 [AUTOREACTCH LOG] Message capturé, JID source :", from);

            const isChannel = from?.endsWith('@newsletter');
            if (!isChannel) {
                console.log("🛑 [AUTOREACTCH LOG] Ignoré (ce n'est pas une chaîne @newsletter)");
                return;
            }

            console.log("📢 [AUTOREACTCH LOG] C'est bien une chaîne WhatsApp !");

            if (mek.key?.fromMe) {
                console.log("🛑 [AUTOREACTCH LOG] Message ignoré (provient de moi-même)");
                return;
            }

            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            const isEnabled = getSetting(ownerId, 'autoreactch', false);
            
            // 🔎 LOG 2 : Statut de la configuration
            console.log("⚙️ [AUTOREACTCH LOG] Statut autoreactch :", isEnabled, "(Owner ID:", ownerId, ")");
            if (!isEnabled) return;

            // Cooldown de 10 secondes par chaîne
            const now = Date.now();
            if (lastReaction.has(from) && now - lastReaction.get(from) < 10000) {
                console.log("⏳ [AUTOREACTCH LOG] Ignoré (cooldown de 10s actif sur cette chaîne)");
                return;
            }
            lastReaction.set(from, now);

            // Petit délai aléatoire simulé
            await delay(Math.floor(Math.random() * 2000) + 1000); 
            
            const emoji = getRandomEmoji();
            await kaya.sendMessage(from, { react: { text: emoji, key: mek.key } });
            console.log("✅ [AUTOREACTCH LOG] Réaction envoyée avec succès (", emoji, ") dans la chaîne :", from);
        } catch (err) {
            console.error('❌ Auto-react channel listen error:', err);
        }
    }
};
