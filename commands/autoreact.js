// autoreact.js
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox, usageBox } from '../setting/theme.js';
import { getString } from '../setting/language.js';

const RANDOM_EMOJIS = ['❤️','😂','🎉','👍','🔥','😮','👏','🎊','🤯','😍','🥰','😎','🤩','💯','✨','🌟','💖','💕','💙','💚','💛','💜','🖤','🤍','🧡','😊','😇','🥳','😋','😜','🤪','🤗','🤭'];
const getRandomEmoji = () => RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];

// Cache pour éviter de réagir 10 fois à la même seconde et limiter la fréquence
const lastReaction = new Map();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
    name: 'autoreact',
    category: 'Owner',
    description: 'Configure auto-reaction mode',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            const rawAction = args[0]?.toLowerCase();

            // 🔄 MAPPING DES COMMANDES SELON LA LANGUE (FR/EN)
            const actionMap = {
                "on": "on",
                "oui": "on",
                "yes": "on",

                "off": "off",
                "non": "off",
                "no": "off",

                "mode": "mode",

                "status": "status",
                "statut": "status"
            };

            const action = actionMap[rawAction];

            if (!action) {
                const menuContent = 
                    `• \`${prefix}autoreact on / oui / off / non\`\n` +
                    `• \`${prefix}autoreact mode <private/group/all>\`\n` +
                    `• \`${prefix}autoreact status / statut\``;

                return kaya.sendMessage(from, { 
                    text: boxMessage(getString(ownerId, 'autoReactMenuTitle'), menuContent, '🎭') 
                }, { quoted: mek });
            }

            if (action === 'on') {
                setSetting(ownerId, 'autoreact', true);
                return kaya.sendMessage(from, { 
                    text: successBox(getString(ownerId, 'autoReactEnabledMsg')) 
                }, { quoted: mek });
            }

            if (action === 'off') {
                setSetting(ownerId, 'autoreact', false);
                return kaya.sendMessage(from, { 
                    text: boxMessage('auto-react', getString(ownerId, 'autoReactDisabledMsg'), '❌') 
                }, { quoted: mek });
            }

            if (action === 'mode') {
                const rawMode = args[1]?.toLowerCase();
                const modeMap = {
                    "private": "private",
                    "prive": "private",
                    "privé": "private",

                    "group": "group",
                    "groupe": "group",

                    "all": "all",
                    "tout": "all"
                };

                const mode = modeMap[rawMode];

                if (!mode) {
                    return kaya.sendMessage(from, { 
                        text: usageBox(prefix, 'autoreact mode', '<private/group/all>') 
                    }, { quoted: mek });
                }
                setSetting(ownerId, 'autoreactMode', mode);

                const translatedMode = getString(ownerId, `mode_${mode}`) || mode.toUpperCase();

                return kaya.sendMessage(from, { 
                    text: successBox(`${getString(ownerId, 'autoReactModeSet')}\n*${translatedMode}*`) 
                }, { quoted: mek });
            }

            if (action === 'status') {
                const isEnabled = getSetting(ownerId, 'autoreact', false);
                const mode = getSetting(ownerId, 'autoreactMode', 'all');
                
                const statusValue = isEnabled ? `${getString(ownerId, 'mode_on')} ✅` : `${getString(ownerId, 'mode_off')} ❌`;
                const translatedMode = getString(ownerId, `mode_${mode}`) || mode.toUpperCase();

                const statusContent = `• *${getString(ownerId, 'autoReactStatusLabel')} :* ${statusValue}\n• *${getString(ownerId, 'autoReactModeLabel')} :* ${translatedMode}`;
                return kaya.sendMessage(from, { 
                    text: boxMessage(getString(ownerId, 'autoReactStatusTitle'), statusContent, '📊') 
                }, { quoted: mek });
            }
        } catch (err) { 
            console.error('❌ autoreact error:', err);
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            await kaya.sendMessage(from, { 
                text: errorBox(getString(ownerId, 'autoReactError')) 
            }, { quoted: mek });
        }
    },

    async listen(kaya, mek, from) {
        try {
            // 🔎 LOG 1 : Message reçu
            console.log("📥 [AUTOREACT LOG] Message reçu depuis :", from);

            if (mek.key?.fromMe) {
                console.log("🛑 [AUTOREACT LOG] Message ignoré (provient de moi-même)");
                return;
            }
            
            const ownerId = kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';
            const isEnabled = getSetting(ownerId, 'autoreact', false);
            
            // 🔎 LOG 2 : Vérification du statut d'activation
            console.log("⚙️ [AUTOREACT LOG] Statut autoreact :", isEnabled, "(Owner ID:", ownerId, ")");
            if (!isEnabled) return;

            // SÉCURITÉ : Cooldown de 10 secondes par chat pour éviter le flood
            const now = Date.now();
            if (lastReaction.has(from) && now - lastReaction.get(from) < 10000) {
                console.log("⏳ [AUTOREACT LOG] Ignoré en raison du cooldown sur :", from);
                return;
            }
            lastReaction.set(from, now);

            const mode = getSetting(ownerId, 'autoreactMode', 'all');
            const isGroup = from.endsWith('@g.us');

            // 🔎 LOG 3 : Vérification du mode
            console.log("📊 [AUTOREACT LOG] Mode actuel :", mode, "| Est un groupe :", isGroup);

            if (mode === 'private' && isGroup) {
                console.log("🛑 [AUTOREACT LOG] Ignoré (Mode privé actif et chat est un groupe)");
                return;
            }
            if (mode === 'group' && !isGroup) {
                console.log("🛑 [AUTOREACT LOG] Ignoré (Mode groupe actif et chat est privé)");
                return;
            }

            // SÉCURITÉ : Petit délai aléatoire pour simuler une lecture humaine
            await delay(Math.floor(Math.random() * 2000) + 1000); 
            
            const emoji = getRandomEmoji();
            await kaya.sendMessage(from, { react: { text: emoji, key: mek.key } });
            console.log("✅ [AUTOREACT LOG] Réaction envoyée avec succès (", emoji, ") à :", from);
        } catch (err) {
            console.error('❌ Auto-react listen error:', err);
        }
    }
};
