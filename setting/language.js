// ==========================================
// FILE: ./setting/language.js
// GESTION MULTILINGUE POUR KAYA BOT
// ==========================================

import { getSetting, setSetting } from '../setting.js';

const translations = {
    // ==========================================
    // SYSTÈME & SÉCURITÉ
    // ==========================================
    ownerOnly: {
        fr: "❌ Cette commande est réservée au propriétaire.",
        en: "❌ This command is restricted to the bot owner."
    },
    groupOnly: {
        fr: "❌ Cette commande ne peut être utilisée que dans un groupe.",
        en: "❌ This command can only be used in a group."
    },
    adminOnly: {
        fr: "❌ Cette commande est réservée aux administrateurs.",
        en: "❌ This command is restricted to group admins."
    },
    botAdmin: {
        fr: "❌ Le bot doit être administrateur du groupe.",
        en: "❌ The bot must be an admin in this group."
    },
    errorOccurred: {
        fr: "❌ Une erreur est survenue lors de l'exécution.",
        en: "❌ An error occurred during execution."
    },

    // ==========================================
    // MOTS GÉNÉRAUX
    // ==========================================
    success: {
        fr: "✅ Opération réussie.",
        en: "✅ Operation successful."
    },
    enabled: {
        fr: "ACTIVÉ",
        en: "ENABLED"
    },
    disabled: {
        fr: "DÉSACTIVÉ",
        en: "DISABLED"
    },
    currentMode: {
        fr: "MODE ACTUEL",
        en: "CURRENT MODE"
    },
    newMode: {
        fr: "NOUVEAU MODE",
        en: "NEW MODE"
    },
    usage: {
        fr: "UTILISATION",
        en: "USAGE"
    },

    // ==========================================
    // COMMANDE LANGUE (LANG.JS)
    // ==========================================
    langTitle: {
        fr: "paramètres de langue",
        en: "language settings"
    },
    currentLang: {
        fr: "🌐 *LANGUE ACTUELLE :*",
        en: "🌐 *CURRENT LANGUAGE:*"
    },
    langSuccess: {
        fr: "✅ Langue changée avec succès en :",
        en: "✅ Language successfully changed to:"
    },
    langInvalid: {
        fr: "❌ Langue non supportée. Langues disponibles : `fr`, `en`.",
        en: "❌ Unsupported language. Available languages: `fr`, `en`."
    },

    // ==========================================
    // COMMANDE ADD (ADD.JS)
    // ==========================================
    addSuccess: {
        fr: "ᴍᴇᴍʙʀᴇ ᴀᴊᴏᴜᴛᴇ́ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !",
        en: "sᴜᴄᴄᴇssғᴜʟʟʏ ᴀᴅᴅᴇᴅ ᴍᴇᴍʙᴇʀ!"
    },
    addAlreadyInGroup: {
        fr: "ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ ᴇsᴛ ᴅᴇ́ᴊᴀ̀\nᴅᴀɴs ʟᴇ ɢʀᴏᴜᴘᴇ.",
        en: "ᴛʜᴇ ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ\nɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ."
    },
    addRestricted: {
        fr: "ᴇ́ᴄʜᴇᴄ : ʟᴇ ʙᴏᴛ ɴ'ᴇsᴛ ᴘᴀs\nᴀᴅᴍɪɴɪsᴛʀᴀᴛᴇᴜʀ ᴏᴜ ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ\nᴀ ʀᴇsᴛʀᴇɪɴᴛ ʟᴇs ɪɴᴠɪᴛᴀᴛɪᴏɴs.",
        en: "ғᴀɪʟᴇᴅ : ᴛʜᴇ ʙᴏᴛ ɪs ɴᴏᴛ\nᴀɴ ᴀᴅᴍɪɴ ᴏʀ ᴛʜᴇ ᴜsᴇʀ\nʜᴀs ʀᴇsᴛʀɪᴄᴛᴇᴅ ɪɴᴠɪᴛᴇs."
    },
    addError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅ'ᴀᴊᴏᴜᴛᴇʀ ᴄᴇ ᴍᴇᴍʙʀᴇ.",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ᴀᴅᴅ ᴛʜɪs ᴍᴇᴍʙᴇʀ."
    },

    // ==========================================
    // COMMANDE ALIVE (ALIVE.JS)
    // ==========================================
    aliveTitle: {
        fr: "système en ligne",
        en: "system alive"
    },
    aliveBotName: {
        fr: "ɴᴏᴍ ᴅᴜ ʙᴏᴛ",
        en: "ʙᴏᴛ ɴᴀᴍᴇ"
    },
    aliveStatus: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs"
    },
    aliveActive: {
        fr: "ᴀᴄᴛɪғ & ᴇɴ ᴄᴏᴜʀs",
        en: "ᴀᴄᴛɪᴠᴇ & ʀᴜɴɴɪɴɢ"
    },
    alivePrefix: {
        fr: "ᴘʀᴇ́ғɪxᴇ",
        en: "ᴘʀᴇғɪx"
    },
    aliveMode: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ"
    },
    alivePublic: {
        fr: "ᴘᴜʙʟɪᴄ",
        en: "ᴘᴜʙʟɪᴄ"
    },
    aliveTypeMenu: {
        fr: "ᴛᴀᴘᴇᴢ `{prefix}menu` ᴘᴏᴜʀ ʟᴇs ᴄᴏᴍᴍᴀɴᴅᴇs.",
        en: "ᴛʏᴘᴇ `{prefix}ᴍᴇɴᴜ` ғᴏʀ ᴄᴍᴅs."
    },
    aliveError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ᴠᴇ́ʀɪғɪᴇʀ ʟᴇ sᴛᴀᴛᴜᴛ.",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ᴄʜᴇᴄᴋ sᴛᴀᴛᴜs."
    },

    // ==========================================
    // COMMANDE ALLPREFIX (ALLPREFIX.JS)
    // ==========================================
    allPrefixStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀʟʟᴘʀᴇғɪx",
        en: "ᴀʟʟ ᴘʀᴇғɪx sᴛᴀᴛᴜs"
    },
    allPrefixUpdatedTitle: {
        fr: "ᴍᴏᴅᴇ ᴍɪs ᴀ̀ ᴊᴏᴜʀ",
        en: "ᴍᴏᴅᴇ ᴜᴘᴅᴀᴛᴇᴅ"
    },
    allPrefixCurrentMode: {
        fr: "ᴍᴏᴅᴇ ᴀᴄᴛᴜᴇʟ",
        en: "ᴄᴜʀʀᴇɴᴛ ᴍᴏᴅᴇ"
    },
    allPrefixNewMode: {
        fr: "ɴᴏᴜᴠᴇᴀᴜ ᴍᴏᴅᴇ",
        en: "ɴᴇᴡ ᴍᴏᴅᴇ"
    },
    allPrefixEnabled: {
        fr: "ᴀᴄᴛɪᴠᴇ́",
        en: "ᴇɴᴀʙʟᴇᴅ"
    },
    allPrefixDisabled: {
        fr: "ᴅᴇ́sᴀᴄᴛɪᴠᴇ́",
        en: "ᴅɪsᴀʙʟᴇᴅ"
    },
    allPrefixMultiActive: {
        fr: "ᴀᴄᴛɪᴠᴇ́ (ᴍᴜʟᴛɪ-ᴘʀᴇ́ғɪxᴇ)",
        en: "ᴇɴᴀʙʟᴇᴅ (ᴍᴜʟᴛɪ-ᴘʀᴇғɪx)"
    },
    allPrefixStrictActive: {
        fr: "ᴅᴇ́sᴀᴄᴛɪᴠᴇ́ (sᴛʀɪᴄᴛ)",
        en: "ᴅɪsᴀʙʟᴇᴅ (sᴛʀɪᴄᴛ)"
    },
    allPrefixUsage: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴀɢᴇ"
    },
    allPrefixError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ."
    }
};

/**
 * Récupère le texte traduit selon la langue choisie
 */
export function getString(ownerId, key) {
    const userLang = getSetting(ownerId, 'botLanguage', 'fr');
    
    // Si la clé existe, on renvoie la langue choisie (ou le français par défaut)
    if (translations[key]) {
        return translations[key][userLang] || translations[key]['fr'] || key;
    }
    
    return key;
}

/**
 * Définit la nouvelle langue
 */
export function setLanguage(ownerId, lang) {
    const supportedLangs = ['fr', 'en'];
    if (supportedLangs.includes(lang)) {
        setSetting(ownerId, 'botLanguage', lang);
        return true;
    }
    return false;
}
