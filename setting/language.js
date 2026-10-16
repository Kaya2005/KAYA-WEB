// ==========================================
// FILE: ./setting/language.js
// GESTION MULTILINGUE POUR KAYA BOT (EN PAR DÉFAUT)
// ==========================================

import { getSetting, setSetting } from '../setting.js';

const translations = {
    // ==========================================
    // SYSTÈME & SÉCURITÉ
    // ==========================================
    ownerOnly: {
        fr: "❌ ᴄᴇᴛᴛᴇ ᴄᴏᴍᴍᴀɴᴅᴇ ᴇsᴛ ʀᴇsᴇʀᴠᴇ́ᴇ ᴀᴜ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ.",
        en: "❌ This command is restricted to the bot owner.",
        wo: "❌ Njuumte bi: Borom bot bi rekk mën na ko def.",
        ee: "❌ Ame si kpea ŋu la koe ate ŋu zazã esia.",
        ln: "❌ Botoko oyo ezali kaka po na nkolo ya bot.",
        sw: "❌ Amri hii imetengwa kwa ajili ya mmiliki wa bot tu.",
        zu: "❌ Lomyalo luvunyelwe umnikazi webot kuphela.",
        ht: "❌ Kòmand sa a rezève sèlman pou mèt bot la.",
        hi: "❌ यह कमांड केवल बॉट के मालिक के लिए है।"
    },
    groupOnly: {
        fr: "❌ ᴄᴇᴛᴛᴇ ᴄᴏᴍᴍᴀɴᴅᴇ ɴᴇ ᴘᴇᴜᴛ ᴇ̂ᴛʀᴇ ᴜᴛɪʟɪsᴇ́ᴇ ǫᴜᴇ ᴅᴀɴs ᴜɴ ɢʀᴏᴜᴘᴇ.",
        en: "❌ This command can only be used in a group.",
        wo: "❌ Li mën na ko def rekk ci béne kureel.",
        ee: "❌ Wotsɔ ŋusẽ sia zazã le ƒome ɖeka koe.",
        ln: "❌ Okoki kosalela yango kaka na etuluku ya bato.",
        sw: "❌ Amri hii inaweza kutumika kwenye kikundi pekee.",
        zu: "❌ Lomyalo lungasetshenziswa eqenjini kuphela.",
        ht: "❌ Ou ka sèvi ak kòmand sa a sèlman nan yon gwoup.",
        hi: "❌ इस कमांड का उपयोग केवल समूह में किया जा सकता है।"
    },
    adminOnly: {
        fr: "❌ ᴄᴇᴛᴛᴇ ᴄᴏᴍᴍᴀɴᴅᴇ ᴇsᴛ ʀᴇsᴇʀᴠᴇ́ᴇ ᴀᴜx ᴀᴅᴍɪɴɪsᴛʀᴀᴛᴇᴜʀs.",
        en: "❌ This command is restricted to group admins.",
        wo: "❌ Kureel bi rekk mën na ko def.",
        ee: "❌ Dɔdzikpɔlawo koe ate ŋu zazã esia.",
        ln: "❌ Oyo ezali kaka po na bakonzi ya etuluku.",
        sw: "❌ Amri hii ni kwa ajili ya wasimamizi wa kikundi tu.",
        zu: "❌ Lomyalo olwabaphathi benqula kuphela.",
        ht: "❌ Kòmand sa a se pou administratè gwoup yo sèlman.",
        hi: "❌ यह कमांड केवल समूह के प्रशासकों के लिए है।"
    },
    botAdmin: {
        fr: "❌ ʟᴇ ʙᴏᴛ ᴅᴏɪᴛ ᴇ̂ᴛʀᴇ ᴀᴅᴍɪɴɪsᴛʀᴀᴛᴇᴜʀ ᴅᴜ ɢʀᴏᴜᴘᴇ.",
        en: "❌ The bot must be an admin in this group.",
        wo: "❌ Bot bi war na nekk kilifa ci kureel bi.",
        ee: "❌ Ele be bot nanye dɔdzikpɔla le ƒome sia me.",
        ln: "❌ Bot esengeli ezala mokonzi na etuluku oyo.",
        sw: "❌ Bot lazima iwe msimamizi katika kikundi hiki.",
        zu: "❌ I-bot kufanele ibe umphathi kuleli qembu.",
        ht: "❌ Bot la dwe yon administratè nan gwoup sa a.",
        hi: "❌ बॉट को इस समूह में प्रशासक होना चाहिए।"
    },
    errorOccurred: {
        fr: "❌ ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ l'ᴇxᴇ́ᴄᴜᴛɪᴏɴ.",
        en: "❌ An error occurred during execution.",
        wo: "❌ Njuumte am na ci defar gi.",
        ee: "❌ Vodada ɖaba le dɔwɔwɔla la me.",
        ln: "❌ Mbuma mabe ebimi na bosaleli.",
        sw: "❌ Kosa limetokea wakati wa utekelezaji.",
        zu: "❌ Kuwe nephutha ngesikhathi sokwenza.",
        ht: "❌ Yon erè te fèt pandan egzekisyon an.",
        hi: "❌ निष्पादन के दौरान एक त्रुटि हुई।"
    },

    // ==========================================
    // MOTS GÉNÉRAUX
    // ==========================================
    success: {
        fr: "✅ ᴏᴘᴇ́ʀᴀᴛɪᴏɴ ʀᴇ́ᴜssɪᴇ.",
        en: "✅ Operation successful.",
        wo: "✅ Ligey bi am na njariñ.",
        ee: "✅ Dɔwɔwɔ la dze edzi.",
        ln: "✅ Mosala esuki malamu.",
        sw: "✅ Shughuli imefanikiwa.",
        zu: "✅ Umsebenzi uphumelele.",
        ht: "✅ Operasyon an reyisi.",
        hi: "✅ ऑपरेशन सफल हुआ।"
    },
    enabled: {
        fr: "ᴀᴄᴛɪᴠᴇ́",
        en: "ENABLED",
        wo: "TABAL NA",
        ee: "WƆ ŊUŊUTƆ",
        ln: "EZALI",
        sw: "IMewASHWA",
        zu: "KUVULILE",
        ht: "AKTIVE",
        hi: "सक्षम"
    },
    disabled: {
        fr: "ᴅᴇ́sᴀᴄᴛɪᴠᴇ́",
        en: "DISABLED",
        wo: "FEY NA",
        ee: "MEWƆ ŊUŊUTƆ O",
        ln: "EZALI TƐ",
        sw: "IMEZIMWA",
        zu: "VALEKILE",
        ht: "DESAKTIVE",
        hi: "अक्षम"
    },
    currentMode: {
        fr: "ᴍᴏᴅᴇ ᴀᴄᴛᴜᴇʟ",
        en: "CURRENT MODE",
        wo: "Cëtu jamono",
        ee: "Nɔnɔmɛ si le",
        ln: "Lolenge ya sikoyo",
        sw: "Hali ya sasa",
        zu: "Imodi yamanje",
        ht: "Mòd aktyèl la",
        hi: "वर्तमान मोड"
    },
    newMode: {
        fr: "ɴᴏᴜᴠᴇᴀᴜ ᴍᴏᴅᴇ",
        en: "NEW MODE",
        wo: "Cëtu bees",
        ee: "Nɔnɔmɛ yeyee",
        ln: "Lolenge ya sika",
        sw: "Hali mpya",
        zu: "Imodi entsha",
        ht: "Nouvo mòd",
        hi: "नया मोड"
    },
    usage: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "USAGE",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Matumizi",
        zu: "Ukusetshenziswa",
        ht: "Itilizasyon",
        hi: "उपयोग"
    },

    // ==========================================
    // COMMANDE LANGUE (LANG.JS)
    // ==========================================
    langTitle: {
        fr: "ᴘᴀʀᴀᴍᴇ̀ᴛʀᴇs ᴅᴇ ʟᴀɴɢᴜᴇ",
        en: "language settings",
        wo: "Teeytu làkk",
        ee: "Gbe ƒe ɖoɖowo",
        ln: "Bibongisi ya lokota",
        sw: "Mipangilio ya lugha",
        zu: "Izilungiselelo zolimi",
        ht: "Anviwònman lang",
        hi: "भाषा सेटिंग्स"
    },
    currentLang: {
        fr: "🌐 *ʟᴀɴɢᴜᴇ ᴀᴄᴛᴜᴇʟʟᴇ :*",
        en: "🌐 *CURRENT LANGUAGE:*",
        wo: "🌐 *Làkk bi nu tànn :*",
        ee: "🌐 *Gbe si le zazã ge:*",
        ln: "🌐 *Lokota ya sikoyo :*",
        sw: "🌐 *Lugha ya sasa:*",
        zu: "🌐 *Ulimi lwamanje:*",
        ht: "🌐 *Lang aktyèl la :*",
        hi: "🌐 *वर्तमान भाषा:*"
    },
    langSuccess: {
        fr: "✅ ʟᴀɴɢᴜᴇ ᴄʜᴀɴɢᴇ́ᴇ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s ᴇɴ :",
        en: "✅ Language successfully changed to:",
        wo: "✅ Làkk bi soppiku na bu baax ci :",
        ee: "✅ Trɔ gbe la ɖe:",
        ln: "✅ Lokota ebongwami malamu na :",
        sw: "✅ Lugha imebadilishwa kuwa:",
        zu: "✅ Ulimi lushintshwe lwahamba kahle lwaba:",
        ht: "✅ Lang la chanje ak siksè nan :",
        hi: "✅ भाषा सफलतापूर्वक बदल दी गई है:"
    },
    langInvalid: {
        fr: "❌ ʟᴀɴɢᴜᴇ ɴᴏɴ sᴜᴘᴘᴏʀᴛᴇ́ᴇ. ʟᴀɴɢᴜᴇs ᴅɪsᴘᴏɴɪʙʟᴇs : `fr`, `en`, `wo`, `ee`, `ln`, `sw`, `zu`, `ht`, `hi`.",
        en: "❌ Unsupported language. Available languages: `fr`, `en`, `wo`, `ee`, `ln`, `sw`, `zu`, `ht`, `hi`."
    },

    // ==========================================
    // COMMANDE ADD (ADD.JS)
    // ==========================================
    addSuccess: {
        fr: "ᴍᴇᴍʙʀᴇ ᴀᴊᴏᴜᴛᴇ́ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !",
        en: "sᴜᴄᴄᴇssғᴜʟʟʏ ᴀᴅᴅᴇᴅ ᴍᴇᴍʙᴇʀ!",
        wo: "Benn bokk dugal na!",
        ee: "Wɔ kpe ɖe ame ŋu!",
        ln: "Mopalani a bakisami malamu!",
        sw: "Mwanachama ameongezwa kwa mafanikio!",
        zu: "Ilungu lengezwe ngempumelelo!",
        ht: "Manm nan ajoute ak siksè!",
        hi: "सफलतापूर्वक सदस्य जोड़ा गया!"
    },
    addAlreadyInGroup: {
        fr: "ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ ᴇsᴛ ᴅᴇ́ᴊᴀ̀\nᴅᴀɴs ʟᴇ ɢʀᴏᴜᴘᴇ.",
        en: "ᴛʜᴇ ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ\nɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ.",
        wo: "Nit ku kooy dafa nekk\nci kureel bi.",
        ee: "Ame sia le\nƒome la me xoxo.",
        ln: "Moto oyo azali\nve na etuluku.",
        sw: "Mtumiaji yuko\nkwenye kikundi tayari.",
        zu: "Umsebenzisi usuvele\nuseqenjini.",
        ht: "Itilizatè a deja\nnan gwoup la.",
        hi: "उपयोगकर्ता पहले से ही\nसमूह में है।"
    },
    addRestricted: {
        fr: "ᴇ́ᴄʜᴇᴄ : ʟᴇ ʙᴏᴛ ɴ'ᴇsᴛ ᴘᴀs\nᴀᴅᴍɪɴɪsᴛʀᴀᴛᴇᴜʀ ᴏᴜ ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ\nᴀ ʀᴇsᴛʀᴇɪɴᴛ ʟᴇs ɪɴᴠɪᴛᴀᴛɪᴏɴs.",
        en: "ғᴀɪʟᴇᴅ : ᴛʜᴇ ʙᴏᴛ ɪs ɴᴏᴛ\nᴀɴ ᴀᴅᴍɪɴ ᴏʀ ᴛʜᴇ ᴜsᴇʀ\nʜᴀs ʀᴇsᴛʀɪᴄᴛᴇᴅ ɪɴᴠɪᴛᴇs.",
        wo: "Njuumte: Bot bi du kilifa\nwala nit ki tëj na as dëkk.",
        ee: "Vodada: Bot menye\ndɔdzikpɔla o.",
        ln: "Boyokani te: Bot azali\nte mokonzi to moto apekisi.",
        sw: "Imeshindikana: Bot sio\nmsimamizi au mtumiaji amezuia mialiko.",
        zu: "Kuhlulekile: I-bot akusiyo\numphathi noma umsebenzisi uvimbile.",
        ht: "Echèk: Bot la pa\nyon administratè.",
        hi: "असफल: बॉट प्रशासक नहीं है।"
    },
    addError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅ'ᴀᴊᴏᴜᴛᴇʀ ᴄᴇ ᴍᴇᴍʙʀᴇ.",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ᴀᴅᴅ ᴛʜɪs ᴍᴇᴍʙᴇʀ.",
        wo: "Mënula dugal nit ki.",
        ee: "Mekpe ɖe ame sia ŋu o.",
        ln: " Kokoka te kobakisa mopalani oyo.",
        sw: "Haiwezekani kumwongeza mwanachama huyu.",
        zu: "Akunakwenzeka ukungeza lelilungu.",
        ht: "Enposib pou ajoute manm sa a.",
        hi: "इस सदस्य को जोड़ना असमर्थ है।"
    },

    // ==========================================
    // COMMANDE ALIVE (ALIVE.JS)
    // ==========================================
    aliveTitle: {
        fr: "sʏsᴛᴇ̀ᴍᴇ ᴇɴ ʟɪɢɴᴇ",
        en: "system alive",
        wo: "System bi ngi dund",
        ee: "System le agbe",
        ln: "System ezali na bomoi",
        sw: "Mfumo uko hai",
        zu: "Uhlelo luyaphila",
        ht: "Sistèm nan vivan",
        hi: "सिस्टम जीवित है"
    },
    aliveBotName: {
        fr: "ɴᴏᴍ ᴅᴜ ʙᴏᴛ",
        en: "ʙᴏᴛ ɴᴀᴍᴇ",
        wo: "Tur bu bot bi",
        ee: "Bot ƒe ŋkɔ",
        ln: "Kombo ya bot",
        sw: "Jina la bot",
        zu: "Igama le-bot",
        ht: "Non bot la",
        hi: "बॉट का नाम"
    },
    aliveStatus: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    aliveActive: {
        fr: "ᴀᴄᴛɪғ & ᴇɴ ᴄᴏᴜʀs",
        en: "ᴀᴄᴛɪᴠᴇ & ʀᴜɴɴɪɴɢ",
        wo: "Dafa melni te di ligey",
        ee: "Le dɔ wɔm",
        ln: "Ezali kosala",
        sw: "Inafanya kazi",
        zu: "Iyasebenza",
        ht: "Aktif epi l ap mache",
        hi: "सक्रिय और चल रहा है"
    },
    alivePrefix: {
        fr: "ᴘʀᴇ́ғɪxᴇ",
        en: "ᴘʀᴇғɪx",
        wo: "Perefis",
        ee: "Prefis",
        ln: "Prefi",
        sw: "Awali",
        zu: "Isiqalo",
        ht: "Prefiks",
        hi: "उपसर्ग"
    },
    aliveMode: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    alivePublic: {
        fr: "ᴘᴜʙʟɪᴄ",
        en: "ᴘᴜʙʟɪᴄ",
        wo: "Public",
        ee: "Amewo katã",
        ln: "Ya bato nyonso",
        sw: "Umma",
        zu: "Umphakathi",
        ht: "Piblik",
        hi: "सार्वजनिक"
    },
    aliveTypeMenu: {
        fr: "ᴛᴀᴘᴇᴢ `{prefix}ᴍᴇɴᴜ` ᴘᴏᴜʀ ʟᴇs ᴄᴏᴍᴍᴀɴᴅᴇs.",
        en: "ᴛʏᴘᴇ `{prefix}ᴍᴇɴᴜ` ғᴏʀ ᴄᴍᴅs.",
        wo: "Bindal `{prefix}menu` ngir gis command yi.",
        ee: "Ɖe `{prefix}menu` tsɔ kpɔ dɔwɔwɔwo.",
        ln: "Koma `{prefix}menu` pona ba komande.",
        sw: "Andika `{prefix}menu` kwa amri.",
        zu: "Thayipha `{prefix}menu` ngemiyalo.",
        ht: "Tape `{prefix}menu` pou kòmand yo.",
        hi: "कमांड के लिए `{prefix}menu` टाइप करें।"
    },
    aliveError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ᴠᴇ́ʀɪғɪᴇʀ ʟᴇ sᴛᴀᴛᴜᴛ.",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ᴄʜᴇᴄᴋ sᴛᴀᴛᴜs.",
        wo: "Mënula seet statut bi.",
        ee: "Mate ŋu kpɔ nɔnɔmɛ la o.",
        ln: "Kokoka te kotala ezaleli.",
        sw: "Haiwezekani kuangalia hali.",
        zu: "Akunakwenzeka ukuhlola isimo.",
        ht: "Enposib pou tcheke estati a.",
        hi: "स्थिति की जाँच करने में असमर्थ।"
    },

    // ==========================================
    // COMMANDE ALLPREFIX (ALLPREFIX.JS)
    // ==========================================
    allPrefixStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀʟʟᴘʀᴇ́ғɪxᴇ",
        en: "ᴀʟʟ ᴘʀᴇғɪx sᴛᴀᴛᴜs",
        wo: "Statut allprefix",
        ee: "Allprefix nɔnɔmɛ",
        ln: "Ezaleli ya allprefix",
        sw: "Hali ya allprefix",
        zu: "Isimo se-allprefix",
        ht: "Estati allprefix",
        hi: "ऑलप्रिफ़िक्स स्थिति"
    },
    allPrefixUpdatedTitle: {
        fr: "ᴍᴏᴅᴇ ᴍɪs ᴀ̀ ᴊᴏᴜʀ",
        en: "ᴍᴏᴅᴇ ᴜᴘᴅᴀᴛᴇᴅ",
        wo: "Mode bees",
        ee: "Nɔnɔmɛ yeyee",
        ln: "Lolenge ya sika",
        sw: "Hali imesasishwa",
        zu: "Imodi ivuselelwe",
        ht: "Mòd mete ajou",
        hi: "मोड अपडेट किया गया"
    },
    allPrefixCurrentMode: {
        fr: "ᴍᴏᴅᴇ ᴀᴄᴛᴜᴇʟ",
        en: "ᴄᴜʀʀᴇɴᴛ ᴍᴏᴅᴇ",
        wo: "Mode jamono",
        ee: "Nɔnɔmɛ si le",
        ln: "Lolenge ya sikoyo",
        sw: "Hali ya sasa",
        zu: "Imodi yamanje",
        ht: "Mòd aktyèl",
        hi: "वर्तमान मोड"
    },
    allPrefixNewMode: {
        fr: "ɴᴏᴜᴠᴇᴀᴜ ᴍᴏᴅᴇ",
        en: "ɴᴇᴡ ᴍᴏᴅᴇ",
        wo: "Mode bees",
        ee: "Nɔnɔmɛ yeyee",
        ln: "Lolenge ya sika",
        sw: "Hali mpya",
        zu: "Imodi entsha",
        ht: "Nouvo mòd",
        hi: "नया मोड"
    },
    allPrefixEnabled: {
        fr: "ᴀᴄᴛɪᴠᴇ́",
        en: "ᴇɴᴀʙʟᴇᴅ",
        wo: "Tabal na",
        ee: "Wɔ ŋu",
        ln: "Ezali",
        sw: "Imewashwa",
        zu: "Kuvulile",
        ht: "Aktive",
        hi: "सक्षम"
    },
    allPrefixDisabled: {
        fr: "ᴅᴇsᴀᴄᴛɪᴠᴇ́",
        en: "ᴅɪsᴀʙʟᴇᴅ",
        wo: "Fey na",
        ee: "Mewɔ ŋu o",
        ln: "Ezali te",
        sw: "Imezimwa",
        zu: "Valekile",
        ht: "Desaktive",
        hi: "अक्षम"
    },
    allPrefixMultiActive: {
        fr: "ᴀᴄᴛɪᴠᴇ́ (ᴍᴜʟᴛɪ-ᴘʀᴇ́ғɪxᴇ)",
        en: "ᴇɴᴀʙʟᴇᴅ (ᴍᴜʟᴛɪ-ᴘʀᴇғɪx)",
        wo: "Tabal na (Multi-perefis)",
        ee: "Wɔ ŋu (Multi-prefix)",
        ln: "Ezali (Multi-prefi)",
        sw: "Imewashwa (Multi-prefix)",
        zu: "Kuvulile (Multi-prefix)",
        ht: "Aktive (Milti-prefiks)",
        hi: "सक्षम (मल्टी-प्रिफ़िक्स)"
    },
    allPrefixStrictActive: {
        fr: "ᴅᴇsᴀᴄᴛɪᴠᴇ́ (sᴛʀɪᴄᴛ)",
        en: "ᴅɪsᴀʙʟᴇᴅ (sᴛʀɪᴄᴛ)",
        wo: "Fey na (Strict)",
        ee: "Mewɔ ŋu o (Strict)",
        ln: "Ezali te (Strict)",
        sw: "Imezimwa (Strict)",
        zu: "Valekile (Strict)",
        ht: "Desaktive ( strik)",
        hi: "अक्षम (सख्त)"
    },
    allPrefixUsage: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴀɢᴇ",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Matumizi",
        zu: "Ukusetshenziswa",
        ht: "Itilizasyon",
        hi: "उपयोग"
    },
    allPrefixError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ.",
        wo: "Njuumte am na.",
        ee: "Vodada ɖaba.",
        ln: "Mbuma mabe ebimi.",
        sw: "Kosa limetokea.",
        zu: "Kuvele iphutha.",
        ht: "Yon erè fèt.",
        hi: "एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE AI (AI.JS)
    // ==========================================
    aiOnlyOwnerConfig: {
        fr: "sᴇᴜʟ ʟᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ ᴘᴇᴜᴛ ᴄᴏɴғɪɢᴜʀᴇʀ ʟᴀ ᴄʟᴇ́ ᴀᴘɪ.",
        en: "ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴄᴏɴғɪɢᴜʀᴇ ᴛʜᴇ ᴀᴘɪ ᴋᴇʏ.",
        wo: "Borom bot bi rekk mën na defar clé api bi.",
        ee: "Ame si kpea ŋu la koe ate ŋu wɔ api key ɖo.",
        ln: "Kaka nkolo akoki kobongisa api key.",
        sw: "Mmiliki pekee ndiye anayeweza kusanidi ufunguo wa api.",
        zu: "Umnikazi kuphela ongavula ukhiye we-api.",
        ht: "Sèl mèt la ki ka konfigure kle api a.",
        hi: "केवल मालिक एपीआई कुंजी कॉन्फ़िगर कर सकता है।"
    },
    aiKeySuccess: {
        fr: "ᴄʟᴇ́ ᴀᴘɪ ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴇɴʀᴇɢɪsᴛʀᴇ́ᴇ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !",
        en: "ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴀᴘɪ ᴋᴇʏ sᴜᴄᴄᴇssғᴜʟʟʏ ʀᴇɢɪsᴛᴇʀᴇᴅ !",
        wo: "Clé api OpenRouter bi dugal na bu baax!",
        ee: "Openrouter api key ɖo edzi nyuie!",
        ln: "Api key ya OpenRouter ebakisami malamu!",
        sw: "Ufunguo wa api wa OpenRouter umesajiliwa kwa mafanikio!",
        zu: "Ukhiye we-api we-OpenRouter ubhaliswe ngempumelelo!",
        ht: "Kle api OpenRouter an anrejistre ak siksè!",
        hi: "OpenRouter API कुंजी सफलतापूर्वक पंजीकृत हो गई!"
    },
    aiOnlyOwnerDelete: {
        fr: "sᴇᴜʟ ʟᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ ᴘᴇᴜᴛ sᴜᴘᴘʀɪᴍᴇʀ ᴄᴇᴛᴛᴇ ᴄᴏɴғɪɢᴜʀᴀᴛɪᴏɴ.",
        en: "ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴅᴇʟᴇᴛᴇ ᴛʜɪs ᴄᴏɴғɪɢᴜʀᴀᴛɪᴏɴ.",
        wo: "Borom bot bi rekk mën na far configuration bi.",
        ee: "Ame si kpea ŋu la koe ate ŋu tutu ɖoɖo sia.",
        ln: "Kaka nkolo akoki kolongola bosangisi oyo.",
        sw: "Mmiliki pekee ndiye anayeweza kufuta usanidi huu.",
        zu: "Umnikazi kuphela ongacisha lokhu.",
        ht: "Sèl mèt la ki ka efase konfigirasyon sa a.",
        hi: "केवल मालिक इस कॉन्फ़िगरेशन को हटा सकता है।"
    },
    aiKeyDeleted: {
        fr: "ᴄʟᴇ́ ᴀᴘɪ ᴘᴇʀsᴏɴɴᴀʟɪsᴇ́ᴇ sᴜᴘᴘʀɪᴍᴇ́ᴇ.",
        en: "ᴄᴜsᴛᴏᴍ ᴀᴘɪ ᴋᴇʏ ᴅᴇʟᴇᴛᴇᴅ.",
        wo: "Clé api bi far na ko.",
        ee: "Api key si nàtɔ ɖokuiwò la tutu.",
        ln: "Api key ebongwani elongolami.",
        sw: "Ufunguo maalum wa api umefutwa.",
        zu: "Ukhiye we-api osuselwe ucishelwe.",
        ht: "Kle api pèsonalize a efase.",
        hi: "कस्टम एपीआई कुंजी हटा दी गई।"
    },
    aiKeyMissingTitle: {
        fr: "ᴄʟᴇ́ ᴀᴘɪ ᴍᴀɴǫᴜᴀɴᴛᴇ",
        en: "ᴀᴘɪ ᴋᴇʏ ᴍɪssɪɴɢ",
        wo: "Clé api amul",
        ee: "Api key manɔ.",
        ln: "Api key ezali te",
        sw: "Ufunguo wa api haupo",
        zu: "Ukhiye we-api ungekho",
        ht: "Kle api manke",
        hi: "एपीआई कुंजी गायब है"
    },
    aiGuideLine1: {
        fr: "ᴇɴ ᴛᴀɴᴛ ǫᴜᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ, ᴠᴏᴜs ᴅᴇᴠᴇᴢ ᴄᴏɴғɪɢᴜʀᴇʀ",
        en: "ᴀs ᴛʜᴇ ᴏᴡɴᴇʀ, ʏᴏᴜ ᴍᴜsᴛ ᴄᴏɴғɪɢᴜʀᴇ",
        wo: "Naka borom, war nga defar",
        ee: "Nabe dɔdzikpɔla la, ele be nàwɔ ɖoɖo",
        ln: "Lokola nkolo, osengeli kobongisa",
        sw: "Kama mmiliki, lazima usanidi",
        zu: "Njengomnikazi, kufanele uvule",
        ht: "Kòm mèt la, ou dwe konfigure",
        hi: "मालिक के रूप में, आपको कॉन्फ़िगर करना होगा"
    },
    aiGuideLine2: {
        fr: "ᴜɴᴇ ᴄʟᴇ́ ᴀᴘɪ ɢʀᴀᴛᴜɪᴛᴇ ᴏᴘᴇɴʀᴏᴜᴛᴇʀ.",
        en: "ᴀ ғʀᴇᴇ ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴀᴘɪ ᴋᴇʏ.",
        wo: "Clé api OpenRouter bu fayuul.",
        ee: "Openrouter api key mahã.",
        ln: "Api key ya OpenRouter ya ofele.",
        sw: "Ufunguo wa api wa bure wa OpenRouter.",
        zu: "Ukhiye we-api wamahhala we-OpenRouter.",
        ht: "Yon kle api OpenRouter gratis.",
        hi: "एक मुफ्त OpenRouter API कुंजी।"
    },
    aiGuideStep1: {
        fr: "ᴀʟʟᴇᴢ sᴜʀ openrouter.ai",
        en: "ɢᴏ ᴛᴏ openrouter.ai",
        wo: "Demal ci openrouter.ai",
        ee: "Yi openrouter.ai",
        ln: "Kende na openrouter.ai",
        sw: "Nenda kwenye openrouter.ai",
        zu: "Yiya ku-openrouter.ai",
        ht: "Ale sou openrouter.ai",
        hi: "openrouter.ai पर जाएं"
    },
    aiGuideStep2: {
        fr: "ᴄʀᴇ́ᴇᴢ ᴜɴᴇ ɴᴏᴜᴠᴇʟʟᴇ ᴄʟᴇ́ ᴀᴘɪ",
        en: "ᴄʀᴇᴀᴛᴇ ᴀ ɴᴇᴡ ᴀᴘɪ ᴋᴇʏ",
        wo: "Sos benn clé api bu bees",
        ee: "Wɔ api key yeyee",
        ln: "Sala api key ya sika",
        sw: "Unda ufunguo mpya wa api",
        zu: "Dala ukhiye omusha we-api",
        ht: "Kreye yon nouvo kle api",
        hi: "एक नई एपीआई कुंजी बनाएं"
    },
    aiGuideStep3: {
        fr: "ᴇɴʀᴇɢɪsᴛʀᴇᴢ-ʟᴀ ᴀᴠᴇᴄ",
        en: "sᴀᴠᴇ ɪᴛ ᴜsɪɴɢ",
        wo: "Dugal ko ak",
        ee: "Dzraɖo kple",
        ln: "Bomba yango na",
        sw: "Ihifadhi kwa kutumia",
        zu: "Yigcine usebenzisa",
        ht: "Anrejistre l avèk",
        hi: "इसे उपयोग करके सहेजें"
    },
    aiOwnerNotConfigured: {
        fr: "ʟᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ ɴ'ᴀ ᴘᴀs ᴇɴᴄᴏʀᴇ ᴄᴏɴғɪɢᴜʀᴇ́ sᴏɴ ɪᴀ.",
        en: "ᴛʜᴇ ᴏᴡɴᴇʀ ʜᴀs ɴᴏᴛ ᴄᴏɴғɪɢᴜʀᴇᴅ ᴛʜᴇɪʀ ᴀɪ ᴀᴘɪ ʏᴇᴛ.",
        wo: "Borom bi defarul ia api bi.",
        ee: "Dɔdzikpɔla la mewɔ ai api ɖo haɖe o.",
        ln: "Nkolo abongisi naino ia api te.",
        sw: "Mmiliki hajasasisha api ya ai bado.",
        zu: "Umnikazi akakayivuli i-ai api yakhe.",
        ht: "Mèt la poko konfigure ai api li a.",
        hi: "मालिक ने अभी तक अपनी एआई एपीआई कॉन्फ़िगर नहीं की है।"
    },
    aiCommunicationError: {
        fr: "ᴅᴇ́solᴇ́, ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟᴀ ᴄᴏᴍᴍᴜɴɪᴄᴀᴛɪᴏɴ ᴀᴠᴇᴄ ʟ'ɪᴀ.",
        en: "Sorry, an error occurred while communicating with the AI.",
        wo: "Baal ma, njuumte am na ci waxtaan ak ia bi.",
        ee: "Tsɔ kpe ke, vodada dzɔ esime míewɔ kplikple ai.",
        ln: "Mawa, mbuma mabe ebimi na bosolo na ia.",
        sw: "Samahani, kosa limetokea wakati wa kuwasiliana na ai.",
        zu: "Uxolo, kube nephutha ngenkathi kuxoxwa ne-ai.",
        ht: "Padon, yon erè te fèt pandan kominikasyon an ak ai a.",
        hi: "क्षमा करें, AI के साथ संचार करते समय एक त्रुटि हुई।"
    },
    aiUnableToCommunicate: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ᴄᴏᴍᴍᴜɴɪǫᴜᴇʀ ᴀᴠᴇᴄ ʟ'ɪᴀ.",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ᴄᴏᴍᴍᴜɴɪᴄᴀᴛᴇ ᴡɪᴛʜ ᴛʜᴇ ᴀɪ.",
        wo: "Mënula waxtaan ak ia bi.",
        ee: "Mate ŋu ƒo nu kple ai o.",
        ln: "Kokoka koloba na ia te.",
        sw: "Haiwezekani kuwasiliana na ai.",
        zu: "Akunakwenzeka ukukhuluma ne-ai.",
        ht: "Enposib pou kominike ak ai a.",
        hi: "AI के साथ संचार करने में असमर्थ।"
    },

    // ==========================================
    // COMMANDE ALLKAYA (ALLKAYA.JS)
    // ==========================================
    allKayaNoGroups: {
        fr: "ᴀᴜᴄᴜɴ ɢʀᴏᴜᴘᴇ ᴛʀᴏᴜᴠᴇ́.",
        en: "ɴᴏ ɢʀᴏᴜᴘs ғᴏᴜɴᴅ.",
        wo: "Amul kureel bu ñu gis.",
        ee: "Womkpɔ ƒome aɖeke o.",
        ln: "Etuluku moko te ezwamaki.",
        sw: "Hakuna kikundi kilichopatikana.",
        zu: "Alikho iqembu elitholiwe.",
        ht: "Okenn gwoup jwenn.",
        hi: "कोई समूह नहीं मिला।"
    },
    allKayaBroadcastTitle: {
        fr: "ᴅɪғғᴜsɪᴏɴ",
        en: "ʙʀᴏᴀᴅᴄᴀsᴛ",
        wo: "Diffusion",
        ee: "Gbedeɖiɖi",
        ln: "Bolakisi",
        sw: "Utangazaji",
        zu: "Ukusakaza",
        ht: "Difizyon",
        hi: "प्रसारण"
    },
    allKayaStarted: {
        fr: "ᴅᴇᴍᴀʀʀᴇ́ ᴠᴇʀs {count} ɢʀᴏᴜᴘᴇs...",
        en: "sᴛᴀʀᴛᴇᴅ ᴛᴏ {count} ɢʀᴏᴜᴘs...",
        wo: "Tambali na ci {count} kureel...",
        ee: "Tek ɖe ƒome {count} ŋu...",
        ln: " Ebandi na bituluku {count}...",
        sw: " Imeanza kwa vikundi {count}...",
        zu: " Kuqaliswe emaqenjini angu-{count}...",
        ht: " Te kòmanse nan {count} gwoup...",
        hi: "{count} समूहों के लिए शुरू किया गया..."
    },
    allKayaCompleted: {
        fr: "ᴅɪғғᴜsɪᴏɴ ᴛᴇʀᴍɪɴᴇ́ᴇ !",
        en: "ʙʀᴏᴀᴅᴄᴀsᴛ ᴄᴏᴍᴘʟᴇᴛᴇᴅ !",
        wo: "Diffusion jeex na!",
        ee: "Gbedeɖiɖi vɔ!",
        ln: "Bolakisi esuki!",
        sw: "Utangazaji umekamilika!",
        zu: "Ukusakaza kuqediwe!",
        ht: "Difizyon an fini!",
        hi: "प्रसारण पूरा हुआ!"
    },
    allKayaSuccess: {
        fr: "sᴜᴄᴄᴇ̀s",
        en: "sᴜᴄᴄᴇss",
        wo: "Baax na",
        ee: "Dze edzi",
        ln: "Malamu",
        sw: "Mafanikio",
        zu: "Impumelelo",
        ht: "Siksè",
        hi: "सफलता"
    },
    allKayaFailed: {
        fr: "ᴇ́ᴄʜᴇᴄs",
        en: "ғᴀɪʟᴇᴅ",
        wo: "Njuumte",
        ee: "Vodada",
        ln: "Mabe",
        sw: "Imeshindikana",
        zu: "Kuhlulekile",
        ht: "Echèk",
        hi: "विफल"
    },
    allKayaError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ᴘᴇɴᴅᴀɴᴛ ʟᴀ ᴅɪғғᴜsɪᴏɴ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴅᴜʀɪɴɢ ʙʀᴏᴀᴅᴄᴀsᴛ.",
        wo: "Njuumte am na ca jamono diffusion bi.",
        ee: "Vodada dzɔ le gbedeɖiɖi la me.",
        ln: "Mbuma mabe ebimi ntango ya bolakisi.",
        sw: "Kosa limetokea wakati wa utangazaji.",
        zu: "Kuvele iphutha ngesikhathi sokusakaza.",
        ht: "Yon erè te fèt pandan difizyon an.",
        hi: "प्रसारण के दौरान एक त्रुटि हुई।"
    },

    // ==========================================
    // MODES & MENTIONS GÉNÉRALES
    // ==========================================
    mode_on: {
        fr: "ᴏᴜɪ (ᴀᴄᴛɪᴠᴇ́)",
        en: "ᴏɴ (ᴇɴᴀʙʟᴇᴅ)",
        wo: "Waaw (Tabal na)",
        ee: "Ɛ (Wɔ ŋu)",
        ln: "Ɛ (Ezali)",
        sw: "Ndiyo (Imewashwa)",
        zu: "Yebo (Kuvulile)",
        ht: "Wi (Aktive)",
        hi: "हाँ (सक्षम)"
    },
    mode_off: {
        fr: "ɴᴏɴ (ᴅᴇ́sᴀᴄᴛɪᴠᴇ́)",
        en: "ᴏғғ (ᴅɪsᴀʙʟᴇᴅ)",
        wo: "Déedéet (Fey na)",
        ee: "Ao (Mewɔ ŋu o)",
        ln: "Te (Ezali te)",
        sw: "Hapana (Imezimwa)",
        zu: "Cha (Valekile)",
        ht: "Non (Desaktive)",
        hi: "नहीं (अक्षम)"
    },
    mode_delete: {
        fr: "sᴜᴘᴘʀɪᴍᴇʀ",
        en: "ᴅᴇʟᴇᴛᴇ",
        wo: "Far",
        ee: "Tutu",
        ln: "Longola",
        sw: "Futa",
        zu: "Cisha",
        ht: "Efase",
        hi: "हटाएं"
    },
    mode_warn: {
        fr: "ᴀᴠᴇʀᴛɪʀ",
        en: "ᴡᴀʀɴ",
        wo: "Warning",
        ee: "Nyeɖu",
        ln: "Wisa",
        sw: "Oya",
        zu: "Xwayisa",
        ht: "Avèti",
        hi: "चेतावनी"
    },
    mode_kick: {
        fr: "ᴇxᴘᴜʟsᴇʀ",
        en: "ᴋɪᴄᴋ",
        wo: "Ganeel",
        ee: "Gbe ɖe aga",
        ln: "Longola na nguzu",
        sw: "Fukuza",
        zu: "Xosha",
        ht: "Bese deyò",
        hi: "बाहर निकालें"
    },

    // ==========================================
    // COMMANDE ANTIBADWORD (ANTIBADWORD.JS)
    // ==========================================
    antiBadWordMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ",
        en: "anti-badword menu",
        wo: "Menu anti-badword",
        ee: "Anti-badword menu",
        ln: "Menu anti-badword",
        sw: "Menyu ya anti-badword",
        zu: "Imenyu ye-anti-badword",
        ht: "Meni anti-badword",
        hi: "एंटी-बैडवर्ड मेनू"
    },
    antiBadWordDefaultDelete: {
        fr: "ᴘᴀʀ ᴅᴇ́ғᴀᴜᴛ : sᴜᴘᴘʀɪᴍᴇʀ",
        en: "ᴅᴇғᴀᴜʟᴛ: ᴅᴇʟᴇᴛᴇ",
        wo: "Ci ni mel: Far",
        ee: "Le esi nɔ: Tutu",
        ln: "Na bosikisiki: Longola",
        sw: "Chaguo-msingi: Futa",
        zu: "Okuzenzakalelayo: Cisha",
        ht: "Pa defo: Efase",
        hi: "डिफ़ॉल्ट: हटाएं"
    },
    antiBadWordStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ",
        en: "anti-badword status",
        wo: "Statut anti-badword",
        ee: "Anti-badword nɔnɔmɛ",
        ln: "Ezaleli ya anti-badword",
        sw: "Hali ya anti-badword",
        zu: "Isimo se-anti-badword",
        ht: "Estati anti-badword",
        hi: "एंटी-बैडवर्ड स्थिति"
    },
    antiBadWordDisabledMsg: {
        fr: "ʟ'ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ᴇsᴛ ᴀᴄᴛᴜᴇʟʟᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-badword bi fey na jamono ji.",
        ee: "Anti-badword le mewɔ ŋu o fifia.",
        ln: "Anti-badword ezali na mosala te sikoyo.",
        sw: "Anti-badword imezimwa kwa sasa.",
        zu: "I-anti-badword ivaliwe okwamanje.",
        ht: "Anti-badword la desaktive kounye a.",
        hi: "एंटी-बैडवर्ड वर्तमान में अक्षम है।"
    },
    antiBadWordStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    antiBadWordModeLabel: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    antiBadWordOffMsg: {
        fr: "ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-badword fey na.",
        ee: "Anti-badword mewɔ ŋu o.",
        ln: "Anti-badword elongolami.",
        sw: "Anti-badword imezimwa.",
        zu: "I-anti-badword ivaliwe.",
        ht: "Anti-badword desaktive.",
        hi: "एंटी-बैडवर्ड अक्षम किया गया।"
    },
    antiBadWordEnabledWithMode: {
        fr: "ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ᴀᴄᴛɪᴠᴇ́ ᴀᴠᴇᴄ ʟᴇ ᴍᴏᴅᴇ :",
        en: "ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ᴇɴᴀʙʟᴇᴅ ᴡɪᴛʜ ᴍᴏᴅᴇ :",
        wo: "Anti-badword tabal na ak mode bi:",
        ee: "Anti-badword wɔ ŋu kple nɔnɔmɛ:",
        ln: "Anti-badword ezali na lolenge:",
        sw: "Anti-badword imewashwa na hali:",
        zu: "I-anti-badword ivulwe ngemodi:",
        ht: "Anti-badword aktive ak mòd la:",
        hi: "एंटी-बैडवर्ड इस मोड के साथ सक्षम किया गया है:"
    },
    antiBadWordWarnKick: {
        fr: "ᴀ ᴀᴛᴛᴇɪɴᴛ 𝟹/𝟹 ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛs ᴇᴛ ᴀ ᴇ́ᴛᴇ́ ᴇxᴄʟᴜ.",
        en: "ʀᴇᴀᴄʜᴇᴅ 𝟹/𝟹 ᴡᴀʀɴs ᴀɴᴅ wᴀs ᴋɪᴄᴋᴇᴅ.",
        wo: "Am na 3/3 warnings te géné na ko.",
        ee: "Xɔ nyenu 3/3 eye wo gbe ɖe aga.",
        ln: "Akómi na 3/3 mabe mpe abengami.",
        sw: "Amefikia maonyo 3/3 na akaondolewa.",
        zu: "Ufike izixwayiso ezingu-3/3 waphuma.",
        ht: "Te tote 3/3 avètisman epi yo te met li deyò.",
        hi: "3/3 चेतावनियाँ पूरी हो गईं और बाहर निकाल दिया गया।"
    },
    antiBadWordAlertTitle: {
        fr: "ᴀʟᴇʀᴛᴇ ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ",
        en: "ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ ᴀʟᴇʀᴛ",
        wo: "Alerte anti-badword",
        ee: "Anti-badword dzadzro",
        ln: "Bosakoli anti-badword",
        sw: "Tahadhari ya anti-badword",
        zu: "Isaziso se-anti-badword",
        ht: "Alèt anti-badword",
        hi: "एंटी-बैडवर्ड चेतावनी"
    },
    antiBadWordUserLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴀɢᴇ",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Matumizi",
        zu: "Ukusetshenziswa",
        ht: "Itilizasyon",
        hi: "उपयोग"
    },
    antiBadWordWarnLabel: {
        fr: "ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛ",
        en: "ᴡᴀʀɴ",
        wo: "Warning",
        ee: "Nyeɖu",
        ln: "Wisa",
        sw: "Onyo",
        zu: "Isixwayiso",
        ht: "Avètisman",
        hi: "चेतावनी"
    },
    antiBadWordNotAllowed: {
        fr: "ʟᴇs ɢʀᴏs ᴍᴏᴛs ɴᴇ sᴏɴᴛ ᴘᴀs ᴀᴜᴛᴏʀɪsᴇ́s.",
        en: "bad words not allowed.",
        wo: "Baayiku wuthi baaxul.",
        ee: "Gbe gblẽwo menyeɖeɖe o.",
        ln: "Maloba mabe maponami te.",
        sw: "Maneno mabaya hayaruhusiwi.",
        zu: "Amagama amabi awavunyelwe.",
        ht: "Move mo pa otorize.",
        hi: "गलत शब्दों की अनुमति नहीं है।"
    },
    antiBadWordError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "An error occurred.",
        wo: "Njuumte am na.",
        ee: "Vodada ɖaba.",
        ln: "Mbuma mabe ebimi.",
        sw: "Kosa limetokea.",
        zu: "Kuvele iphutha.",
        ht: "Yon erè fèt.",
        hi: "एक त्रुटि हुई।"
    },

    // ==========================================
    // DESCRIPTIONS DES SOUS-COMMANDES DANS LES MENUS
    // ==========================================
    cmd_delete_desc: {
        fr: "sᴜᴘᴘʀɪᴍᴇʀ ʟᴇs ᴍᴇssᴀɢᴇs",
        en: "ᴅᴇʟᴇᴛᴇ ᴍᴇssᴀɢᴇs",
        wo: "Far message yi",
        ee: "Tutu mɔ̃",
        ln: "Longola mikanda",
        sw: "Futa ujumbe",
        zu: "Cisha imiyale",
        ht: "Efase mesaj yo",
        hi: "संदेश हटाएं"
    },
    cmd_warn_desc: {
        fr: "ᴀᴠᴇʀᴛɪʀ ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ",
        en: "ᴡᴀʀɴ ᴛʜᴇ ᴜsᴇʀ",
        wo: "Warning nit ki",
        ee: "Nyeɖu ame la",
        ln: "Wisa moto",
        sw: "Onya mtumiaji",
        zu: "Xwayisa umsebenzisi",
        ht: "Avèti itilizatè a",
        hi: "उपयोगकर्ता को चेतावनी दें"
    },
    cmd_kick_desc: {
        fr: "ᴇxᴘᴜʟsᴇʀ ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ",
        en: "ᴋɪᴄᴋ ᴛʜᴇ ᴜsᴇʀ",
        wo: "Ganeel nit ki",
        ee: "Gbe ɖe aga ame la",
        ln: "Longola moto",
        sw: "Fukuza mtumiaji",
        zu: "Xosha umsebenzisi",
        ht: "Mete itilizatè a deyò",
        hi: "उपयोगकर्ता को बाहर निकालें"
    },
    cmd_off_desc: {
        fr: "ᴅᴇ́sᴀᴄᴛɪᴠᴇʀ",
        en: "ᴅɪsᴀʙʟᴇ",
        wo: "Feyal",
        ee: "Mewɔ ŋu o",
        ln: "Zongisa te",
        sw: "Zima",
        zu: "Vala",
        ht: "Desaktive",
        hi: "अक्षम करें"
    },
    cmd_status_desc: {
        fr: "ᴠᴇ́ʀɪғɪᴇʀ ʟᴇ sᴛᴀᴛᴜᴛ",
        en: "ᴄʜᴇᴄᴋ sᴛᴀᴛᴜs",
        wo: "Seet statut bi",
        ee: "Kpɔ nɔnɔmɛ",
        ln: "Tala ezaleli",
        sw: "Angalia hali",
        zu: "Bheka isimo",
        ht: "Tcheke estati",
        hi: "स्थिति जांचें"
    },

    // ==========================================
    // COMMANDE ANTIBOT (ANTIBOT.JS)
    // ==========================================
    antiBotMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀɴᴛɪ-ʙᴏᴛ",
        en: "anti-bot menu",
        wo: "Menu anti-bot",
        ee: "Anti-bot menu",
        ln: "Menu anti-bot",
        sw: "Menyu ya anti-bot",
        zu: "Imenyu ye-anti-bot",
        ht: "Meni anti-bot",
        hi: "एंटी-बॉट मेनू"
    },
    antiBotDefaultWarn: {
        fr: "ᴘᴀʀ ᴅᴇ́ғᴀᴜᴛ : ᴀᴠᴇʀᴛɪʀ",
        en: "ᴅᴇғᴀᴜʟᴛ: ᴡᴀʀɴ",
        wo: "Ci ni mel: Warning",
        ee: "Le esi nɔ: Nyeɖu",
        ln: "Na bosikisiki: Wisa",
        sw: "Chaguo-msingi: Onyo",
        zu: "Okuzenzakalelayo: Xwayisa",
        ht: "Pa defo: Avèti",
        hi: "डिफ़ॉल्ट: चेतावनी"
    },
    antiBotStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀɴᴛɪ-ʙᴏᴛ",
        en: "anti-bot status",
        wo: "Statut anti-bot",
        ee: "Anti-bot nɔnɔmɛ",
        ln: "Ezaleli ya anti-bot",
        sw: "Hali ya anti-bot",
        zu: "Isimo se-anti-bot",
        ht: "Estati anti-bot",
        hi: "एंटी-बॉट स्थिति"
    },
    antiBotDisabledMsg: {
        fr: "ʟ'ᴀɴᴛɪ-ʙᴏᴛ ᴇsᴛ ᴀᴄᴛᴜᴇʟʟᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ʙᴏᴛ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-bot bi fey na jamono ji.",
        ee: "Anti-bot le mewɔ ŋu o fifia.",
        ln: "Anti-bot ezali na mosala te sikoyo.",
        sw: "Anti-bot imezimwa kwa sasa.",
        zu: "I-anti-bot ivaliwe okwamanje.",
        ht: "Anti-bot la desaktive kounye a.",
        hi: "एंटी-बॉट वर्तमान में अक्षम है।"
    },
    antiBotStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    antiBotModeLabel: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    antiBotOffMsg: {
        fr: "ᴀɴᴛɪ-ʙᴏᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ʙᴏᴛ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-bot fey na.",
        ee: "Anti-bot mewɔ ŋu o.",
        ln: "Anti-bot elongolami.",
        sw: "Anti-bot imezimwa.",
        zu: "I-anti-bot ivaliwe.",
        ht: "Anti-bot desaktive.",
        hi: "एंटी-बॉट अक्षम किया गया।"
    },
    antiBotEnabledWithMode: {
        fr: "ᴀɴᴛɪ-ʙᴏᴛ ᴀᴄᴛɪᴠᴇ́ ᴀᴠᴇᴄ ʟᴇ ᴍᴏᴅᴇ :",
        en: "ᴀɴᴛɪ-ʙᴏᴛ ᴇɴᴀʙʟᴇᴅ ᴡɪᴛʜ ᴍᴏᴅᴇ :",
        wo: "Anti-bot tabal na ak mode bi:",
        ee: "Anti-bot wɔ ŋu kple nɔnɔmɛ:",
        ln: "Anti-bot ezali na lolenge:",
        sw: "Anti-bot imewashwa na hali:",
        zu: "I-anti-bot ivulwe ngemodi:",
        ht: "Anti-bot aktive ak mòd la:",
        hi: "एंटी-बॉट इस मोड के साथ सक्षम किया गया है:"
    },
    antiBotKickedMsg: {
        fr: "ᴀ ᴇ́ᴛᴇ́ ᴇxᴄʟᴜ ᴘᴏᴜʀ ᴀᴄᴛɪᴠɪᴛᴇ́ ᴅᴇ ʙᴏᴛ.",
        en: "ᴡᴀs ᴋɪᴄᴋᴇᴅ ғᴏʀ ʙᴏᴛ ᴀᴄᴛɪᴠɪᴛʏ.",
        wo: "Ganeel na ko ndax ligeyu bot.",
        ee: "Wo gbe ɖe aga le bot dɔwɔwɔ ta.",
        ln: "Abengami mpo na misala ya bot.",
        sw: "Amefukuzwa kwa sababu ya shughuli za bot.",
        zu: "Uxoshiwe ngenxa yemisebenzi ye-bot.",
        ht: "Te met li deyò pou aktivite bot.",
        hi: "बॉट गतिविधि के लिए बाहर निकाल दिया गया।"
    },
    antiBotWarnKickMsg: {
        fr: "ᴀ ᴀᴛᴛᴇɪɴᴛ 𝟺/𝟺 ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛs ʙᴏᴛ ᴇᴛ ᴀ ᴇ́ᴛᴇ́ ᴇxᴄʟᴜ.",
        en: "ʀᴇᴀᴄʜᴇᴅ 𝟺/𝟺 ʙᴏᴛ wᴀʀɴs ᴀɴᴅ ᴡᴀs ᴋɪᴄᴋᴇᴅ.",
        wo: "Am na 4/4 warnings bot te géné na ko.",
        ee: "Xɔ bot nyeɖu 4/4 eye wo gbe ɖe aga.",
        ln: "Akómi na 4/4 wisa ya bot mpe abengami.",
        sw: "Amefikia maonyo 4/4 ya bot na akaondolewa.",
        zu: "Ufike izixwayiso ezingu-4/4 ze-bot waphuma.",
        ht: "Te tote 4/4 avètisman bot epi yo te met li deyò.",
        hi: "4/4 बॉट चेतावनियाँ पूरी हो गईं और बाहर निकाल दिया गया।"
    },
    antiBotAlertTitle: {
        fr: "ᴀʟᴇʀᴛᴇ ᴀɴᴛɪ-ʙᴏᴛ",
        en: "ᴀɴᴛɪ-ʙᴏᴛ ᴀʟᴇʀᴛ",
        wo: "Alerte anti-bot",
        ee: "Anti-bot dzadzro",
        ln: "Bosakoli anti-bot",
        sw: "Tahadhari ya anti-bot",
        zu: "Isaziso se-anti-bot",
        ht: "Alèt anti-bot",
        hi: "एंटी-बॉट चेतावनी"
    },
    antiBotUserLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴇʀ",
        wo: "Nit ki",
        ee: "Ame la",
        ln: "Moto",
        sw: "Mtumiaji",
        zu: "Umsebenzisi",
        ht: "Itilizatè",
        hi: "उपयोगकर्ता"
    },
    antiBotWarnLabel: {
        fr: "ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛ",
        en: "ᴡᴀʀɴ",
        wo: "Warning",
        ee: "Nyeɖu",
        ln: "Wisa",
        sw: "Onyo",
        zu: "Isixwayiso",
        ht: "Avètisman",
        hi: "चेतावनी"
    },
    antiBotError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ ʟ'ᴀɴᴛɪʙᴏᴛ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴀɴᴛɪʙᴏᴛ.",
        wo: "Njuumte am na ci defar antibot bi.",
        ee: "Vodada dzɔ esime nɔ antibot wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya antibot.",
        sw: "Kosa limetokea wakati wa kuendesha antibot.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-antibot.",
        ht: "Yon erè fèt pandan egzekisyon antibot la.",
        hi: "एंटीबॉट निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE ANTILINK (ANTILINK.JS)
    // ==========================================
    antiLinkMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀɴᴛɪ-ʟɪɴᴋ",
        en: "anti-link menu",
        wo: "Menu anti-link",
        ee: "Anti-link menu",
        ln: "Menu anti-link",
        sw: "Menyu ya anti-link",
        zu: "Imenyu ye-anti-link",
        ht: "Meni anti-link",
        hi: "एंटी-लिंक मेनू"
    },
    antiLinkDefaultWarn: {
        fr: "ᴘᴀʀ ᴅᴇ́ғᴀᴜᴛ : ᴀᴠᴇʀᴛɪʀ",
        en: "ᴅᴇғᴀᴜʟᴛ: ᴡᴀʀɴ",
        wo: "Ci ni mel: Warning",
        ee: "Le esi nɔ: Nyeɖu",
        ln: "Na bosikisiki: Wisa",
        sw: "Chaguo-msingi: Onyo",
        zu: "Okuzenzakalelayo: Xwayisa",
        ht: "Pa defo: Avèti",
        hi: "डिफ़ॉल्ट: चेतावनी"
    },
    antiLinkStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀɴᴛɪ-ʟɪɴᴋ",
        en: "anti-link status",
        wo: "Statut anti-link",
        ee: "Anti-link nɔnɔmɛ",
        ln: "Ezaleli ya anti-link",
        sw: "Hali ya anti-link",
        zu: "Isimo se-anti-link",
        ht: "Estati anti-link",
        hi: "एंटी-लिंक स्थिति"
    },
    antiLinkDisabledMsg: {
        fr: "ʟ'ᴀɴᴛɪ-ʟɪɴᴋ ᴇsᴛ ᴀᴄᴛᴜᴇʟʟᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ʟɪɴᴋ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-link bi fey na jamono ji.",
        ee: "Anti-link le mewɔ ŋu o fifia.",
        ln: "Anti-link ezali na mosala te sikoyo.",
        sw: "Anti-link imezimwa kwa sasa.",
        zu: "I-anti-link ivaliwe okwamanje.",
        ht: "Anti-link la desaktive kounye a.",
        hi: "एंटी-लिंक वर्तमान में अक्षम है।"
    },
    antiLinkStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    antiLinkModeLabel: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    antiLinkOffMsg: {
        fr: "ᴀɴᴛɪ-ʟɪɴᴋ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ʟɪɴᴋ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-link fey na.",
        ee: "Anti-link mewɔ ŋu o.",
        ln: "Anti-link elongolami.",
        sw: "Anti-link imezimwa.",
        zu: "I-anti-link ivaliwe.",
        ht: "Anti-link desaktive.",
        hi: "एंटी-लिंक अक्षम किया गया।"
    },
    antiLinkEnabledWithMode: {
        fr: "ᴀɴᴛɪ-ʟɪɴᴋ ᴀᴄᴛɪᴠᴇ́ ᴀᴠᴇᴄ ʟᴇ ᴍᴏᴅᴇ :",
        en: "ᴀɴᴛɪ-ʟɪɴᴋ ᴇɴᴀʙʟᴇᴅ ᴡɪᴛʜ ᴍᴏᴅᴇ :",
        wo: "Anti-link tabal na ak mode bi:",
        ee: "Anti-link wɔ ŋu kple nɔnɔmɛ:",
        ln: "Anti-link ezali na lolenge:",
        sw: "Anti-link imewashwa na hali:",
        zu: "I-anti-link ivulwe ngemodi:",
        ht: "Anti-link aktive ak mòd la:",
        hi: "एंटी-लिंक इस मोड के साथ सक्षम किया गया है:"
    },
    antiLinkWarnKickMsg: {
        fr: "ᴀ ᴀᴛᴛᴇɪɴᴛ 𝟺/𝟺 ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛs ᴇᴛ ᴀ ᴇ́ᴛᴇ́ ᴇxᴄʟᴜ.",
        en: "ʀᴇᴀᴄʜᴇᴅ 𝟺/𝟺 ᴡᴀʀɴs ᴀɴᴅ ᴡᴀs ᴋɪᴄᴋᴇᴅ.",
        wo: "Am na 4/4 warnings te géné na ko.",
        ee: "Xɔ nyeɖu 4/4 eye wo gbe ɖe aga.",
        ln: "Akómi na 4/4 wisa mpe abengami.",
        sw: "Amefikia maonyo 4/4 na akaondolewa.",
        zu: "Ufike izixwayiso ezingu-4/4 waphuma.",
        ht: "Te tote 4/4 avètisman epi yo te met li deyò.",
        hi: "4/4 चेतावनियाँ पूरी हो गईं और बाहर निकाल दिया गया।"
    },
    antiLinkAlertTitle: {
        fr: "ᴀʟᴇʀᴛᴇ ᴀɴᴛɪ-ʟɪɴᴋ",
        en: "ᴀɴᴛɪ-ʟɪɴᴋ ᴀʟᴇʀᴛ",
        wo: "Alerte anti-link",
        ee: "Anti-link dzadzro",
        ln: "Bosakoli anti-link",
        sw: "Tahadhari ya anti-link",
        zu: "Isaziso se-anti-link",
        ht: "Alèt anti-link",
        hi: "एंटी-लिंक चेतावनी"
    },
    antiLinkUserLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴀɢᴇ",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Matumizi",
        zu: "Ukusetshenziswa",
        ht: "Itilizasyon",
        hi: "उपयोग"
    },
    antiLinkWarnLabel: {
        fr: "ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛ",
        en: "ᴡᴀʀɴ",
        wo: "Warning",
        ee: "Nyeɖu",
        ln: "Wisa",
        sw: "Onyo",
        zu: "Isixwayiso",
        ht: "Avètisman",
        hi: "चेतावनी"
    },
    antiLinkError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ ʟ'ᴀɴᴛɪʟɪɴᴋ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴀɴᴛɪʟɪɴᴋ.",
        wo: "Njuumte am na ci defar antilink bi.",
        ee: "Vodada dzɔ esime nɔ antilink wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya antilink.",
        sw: "Kosa limetokea wakati wa kuendesha antilink.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-antilink.",
        ht: "Yon erè fèt pandan egzekisyon antilink la.",
        hi: "एंटीलिंक निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE ANTISPAM (ANTISPAM.JS)
    // ==========================================
    antiSpamMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀɴᴛɪ-sᴘᴀᴍ",
        en: "anti-spam menu",
        wo: "Menu anti-spam",
        ee: "Anti-spam menu",
        ln: "Menu anti-spam",
        sw: "Menyu ya anti-spam",
        zu: "Imenyu ye-anti-spam",
        ht: "Meni anti-spam",
        hi: "एंटी-स्पैम मेनू"
    },
    antiSpamStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀɴᴛɪ-sᴘᴀᴍ",
        en: "anti-spam status",
        wo: "Statut anti-spam",
        ee: "Anti-spam nɔnɔmɛ",
        ln: "Ezaleli ya anti-spam",
        sw: "Hali ya anti-spam",
        zu: "Isimo se-anti-spam",
        ht: "Estati anti-spam",
        hi: "एंटी-स्पैम स्थिति"
    },
    antiSpamDisabledMsg: {
        fr: "ʟ'ᴀɴᴛɪ-sᴘᴀᴍ ᴇsᴛ ᴀᴄᴛᴜᴇʟʟᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-sᴘᴀᴍ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-spam bi fey na jamono ji.",
        ee: "Anti-spam le mewɔ ŋu o fifia.",
        ln: "Anti-spam ezali na mosala te sikoyo.",
        sw: "Anti-spam imezimwa kwa sasa.",
        zu: "I-anti-spam ivaliwe okwamanje.",
        ht: "Anti-spam la desaktive kounye a.",
        hi: "एंटी-स्पैम वर्तमान में अक्षम है।"
    },
    antiSpamStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    antiSpamModeLabel: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    antiSpamOffMsg: {
        fr: "ᴀɴᴛɪ-sᴘᴀᴍ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-sᴘᴀᴍ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-spam fey na.",
        ee: "Anti-spam mewɔ ŋu o.",
        ln: "Anti-spam elongolami.",
        sw: "Anti-spam imezimwa.",
        zu: "I-anti-spam ivaliwe.",
        ht: "Anti-spam desaktive.",
        hi: "एंटी-स्पैम अक्षम किया गया।"
    },
    antiSpamEnabledWithMode: {
        fr: "ᴀɴᴛɪ-sᴘᴀᴍ ᴀᴄᴛɪᴠᴇ́ !",
        en: "ᴀɴᴛɪ-sᴘᴀᴍ ᴇɴᴀʙʟᴇᴅ !",
        wo: "Anti-spam tabal na!",
        ee: "Anti-spam wɔ ŋu!",
        ln: "Anti-spam ezali!",
        sw: "Anti-spam imewashwa!",
        zu: "I-anti-spam ivulwe!",
        ht: "Anti-spam aktive!",
        hi: "एंटी-स्पैम सक्षम किया गया!"
    },
    antiSpamStopSpamming: {
        fr: "ᴀʀʀᴇ̂ᴛᴇᴢ ᴅᴇ sᴘᴀᴍᴍᴇʀ !",
        en: "sᴛᴏᴘ sᴘᴀᴍᴍɪɴɢ!",
        wo: "Teeyal spam bi!",
        ee: "Gbɔɖe spam wɔwɔ gbɔ!",
        ln: "Tika spam!",
        sw: "Acha kuspam!",
        zu: "Yeka ukuswama!",
        ht: "Sispann spam!",
        hi: "स्पैम करना बंद करो!"
    },
    antiSpamKickedMsg: {
        fr: "ᴇxᴄʟᴜ ᴘᴏᴜʀ sᴘᴀᴍ.",
        en: "ʀᴇᴍᴏᴠᴇᴅ ғᴏʀ sᴘᴀᴍᴍɪɴɢ.",
        wo: "Ganeel na ko ndax spam.",
        ee: "Wo gbe ɖe aga le spam ta.",
        ln: "Abengami mpo na spam.",
        sw: "Ameondolewa kwa kuspam.",
        zu: "Uxoshiwe ngenxa yokuswama.",
        ht: "Mete deyò pou spam.",
        hi: "स्पैम के लिए हटाया गया।"
    },
    antiSpamError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ ʟ'ᴀɴᴛɪsᴘᴀᴍ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴀɴᴛɪsᴘᴀᴍ.",
        wo: "Njuumte am na ci defar antispam bi.",
        ee: "Vodada dzɔ esime nɔ antispam wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya antispam.",
        sw: "Kosa limetokea wakati wa kuendesha antispam.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-antispam.",
        ht: "Yon erè fèt pandan egzekisyon antispam la.",
        hi: "एंटीस्पैम निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE ANTITAG (ANTITAG.JS)
    // ==========================================
    antiTagMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀɴᴛɪ-ᴛᴀɢ",
        en: "anti-tag menu",
        wo: "Menu anti-tag",
        ee: "Anti-tag menu",
        ln: "Menu anti-tag",
        sw: "Menyu ya anti-tag",
        zu: "Imenyu ye-anti-tag",
        ht: "Meni anti-tag",
        hi: "एंटी-टैग मेनू"
    },
    antiTagDefaultDelete: {
        fr: "ᴘᴀʀ ᴅᴇ́ғᴀᴜᴛ : sᴜᴘᴘʀɪᴍᴇʀ",
        en: "ᴅᴇғᴀᴜʟᴛ: ᴅᴇʟᴇᴛᴇ",
        wo: "Ci ni mel: Far",
        ee: "Le esi nɔ: Tutu",
        ln: "Na bosikisiki: Longola",
        sw: "Chaguo-msingi: Futa",
        zu: "Okuzenzakalelayo: Cisha",
        ht: "Pa defo: Efase",
        hi: "डिफ़ॉल्ट: हटाएं"
    },
    antiTagStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀɴᴛɪ-ᴛᴀɢ",
        en: "anti-tag status",
        wo: "Statut anti-tag",
        ee: "Anti-tag nɔnɔmɛ",
        ln: "Ezaleli ya anti-tag",
        sw: "Hali ya anti-tag",
        zu: "Isimo se-anti-tag",
        ht: "Estati anti-tag",
        hi: "एंटी-टैग स्थिति"
    },
    antiTagDisabledMsg: {
        fr: "ʟ'ᴀɴᴛɪ-ᴛᴀɢ ᴇsᴛ ᴀᴄᴛᴜᴇʟʟᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ᴛᴀɢ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-tag bi fey na jamono ji.",
        ee: "Anti-tag le mewɔ ŋu o fifia.",
        ln: "Anti-tag ezali na mosala te sikoyo.",
        sw: "Anti-tag imezimwa kwa sasa.",
        zu: "I-anti-tag ivaliwe okwamanje.",
        ht: "Anti-tag la desaktive kounye a.",
        hi: "एंटी-टैग वर्तमान में अक्षम है।"
    },
    antiTagStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    antiTagModeLabel: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    antiTagOffMsg: {
        fr: "ᴀɴᴛɪ-ᴛᴀɢ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀɴᴛɪ-ᴛᴀɢ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Anti-tag fey na.",
        ee: "Anti-tag mewɔ ŋu o.",
        ln: "Anti-tag elongolami.",
        sw: "Anti-tag imezimwa.",
        zu: "I-anti-tag ivaliwe.",
        ht: "Anti-tag desaktive.",
        hi: "एंटी-टैग अक्षम किया गया।"
    },
    antiTagEnabledWithMode: {
        fr: "ᴀɴᴛɪ-ᴛᴀɢ ᴀᴄᴛɪᴠᴇ́ !",
        en: "ᴀɴᴛɪ-ᴛᴀɢ ᴇɴᴀʙʟᴇᴅ !",
        wo: "Anti-tag tabal na!",
        ee: "Anti-tag wɔ ŋu!",
        ln: "Anti-tag ezali!",
        sw: "Anti-tag imewashwa!",
        zu: "I-anti-tag ivulwe!",
        ht: "Anti-tag aktive!",
        hi: "एंटी-टैग सक्षम किया गया!"
    },
    antiTagKickedMsg: {
        fr: "ᴇxᴄʟᴜ ᴘᴏᴜʀ ᴀᴠᴏɪʀ ᴍᴇɴᴛɪᴏɴɴᴇ́/ᴛᴀɢɢᴜᴇ́.",
        en: "ʀᴇᴍᴏᴠᴇᴅ ғᴏʀ ᴛᴀɢɢɪɴɢ.",
        wo: "Ganeel na ko ndax tag.",
        ee: "Wo gbe ɖe aga le tag ta.",
        ln: "Abengami mpo na tag.",
        sw: "Ameondolewa kwa kutag.",
        zu: "Uxoshiwe ngenxa yokutaga.",
        ht: "Mete deyò pou tag.",
        hi: "टैग करने के लिए हटाया गया।"
    },
    antiTagError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ ʟ'ᴀɴᴛɪᴛᴀɢ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴀɴᴛɪᴛᴀɢ.",
        wo: "Njuumte am na ci defar antitag bi.",
        ee: "Vodada dzɔ esime nɔ antitag wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya antitag.",
        sw: "Kosa limetokea wakati wa kuendesha antitag.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-antitag.",
        ht: "Yon erè fèt pandan egzekisyon antitag la.",
        hi: "एंटीटैग निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE APK (APK.JS)
    // ==========================================
    apkMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴀᴘᴋ",
        en: "apk download menu",
        wo: "Menu download apk",
        ee: "Apk download menu",
        ln: "Menu ya téléchargement apk",
        sw: "Menyu ya kupakua apk",
        zu: "Imenyu yokulanda i-apk",
        ht: "Meni telechajman apk",
        hi: "APK डाउनलोड मेनू"
    },
    apkAppNameLabel: {
        fr: "ɴᴏᴍ ᴅᴇ ʟ'ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ",
        en: "ᴀᴘᴘ ɴᴀᴍᴇ",
        wo: "Tur application bi",
        ee: "App ŋkɔ",
        ln: "Kombo ya application",
        sw: "Jina la programu",
        zu: "Igama lohlelo",
        ht: "Non aplikasyon an",
        hi: "ऐप का नाम"
    },
    apkExampleLabel: {
        fr: "ᴇxᴇᴍᴘʟᴇ",
        en: "ᴇxᴀᴍᴘʟᴇ",
        wo: "Exemple",
        ee: "Kpɔɖeŋu",
        ln: "Ntembe",
        sw: "Mfano",
        zu: "Isibonelo",
        ht: "Egzanp",
        hi: "उदाहरण"
    },
    apkFetchingMsg: {
        fr: "ʀᴇᴄʜᴇʀᴄʜᴇ ᴅᴇs ᴅᴇ́ᴛᴀɪʟs ᴅᴇ l'ᴀᴘᴋ ᴘᴏᴜʀ {appName}",
        en: "ғᴇᴛᴄʜɪɴɢ ᴀᴘᴋ ᴅᴇᴛᴀɪʟs ғᴏʀ {appName}",
        wo: "Di seet details apk bu {appName}",
        ee: "Le apk ƒe nyawo dim na {appName}",
        ln: "Azali koluka makambo ya apk ya {appName}",
        sw: "Inatafuta maelezo ya apk ya {appName}",
        zu: "Ifuna imininingwane ye-apk ye-{appName}",
        ht: "Ap chèche detay apk pou {appName}",
        hi: "{appName} के लिए एपीआई विवरण प्राप्त कर रहा है"
    },
    apkApiError: {
        fr: "ᴇ́ᴄʜᴇᴄ ᴅᴇ ʟᴀ ʀᴇ́ᴄᴜᴘᴇ́ʀᴀᴛɪᴏɴ ᴅᴇs ɪɴғᴏs ᴀᴘᴋ. L'ᴀᴘɪ ᴇsᴛ ᴘᴇᴜᴛ-ᴇ̂ᴛʀᴇ ʜᴏʀs-ʟɪɴᴇ.",
        en: "ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ ᴀᴘᴋ ɪɴғᴏ. ᴀᴘɪ ᴍᴀʏ ʙᴇ ᴅᴏᴡɴ.",
        wo: "Mënula jot infos apk yi. Api bi mën na tuuti.",
        ee: "Mekpe ɖe apk ƒe nyawo ŋu o. Api la gblẽ.",
        ln: "Eboyi kozwa makambo ya apk. Api ekoki kozala te.",
        sw: "Imeshindikana kupata maelezo ya apk. Api inaweza kuwa chini.",
        zu: "Kuhlulekile ukuthola ulwazi lwe-apk. I-api kungenzeka ingasebenzi.",
        ht: "Echèk pou jwenn enfòmasyon apk la. Api a gendwa pa mache.",
        hi: "APK की जानकारी प्राप्त करने में विफल। एपीआई डाउन हो सकती है।"
    },
    apkNotFound: {
        fr: "ᴀᴜᴄᴜɴᴇ ᴀᴘᴋ ᴛʀᴏᴜᴠᴇ́ᴇ ᴘᴏᴜʀ {appName}.",
        en: "ɴᴏ ᴀᴘᴋ ғᴏᴜɴᴅ ғᴏʀ {appName}.",
        wo: "Gisul benn apk bu {appName}.",
        ee: "Mekpɔ apk aɖeke na {appName} o.",
        ln: "Ezwi apk moko te ya {appName}.",
        sw: "Hakuna apk iliyopatikana ya {appName}.",
        zu: "Ayikho i-apk etholakele ye-{appName}.",
        ht: "Okenn apk jwenn pou {appName}.",
        hi: "{appName} के लिए कोई APK नहीं मिला।"
    },
    apkFoundTitle: {
        fr: "ᴀᴘᴋ ᴛʀᴏᴜᴠᴇ́ᴇ",
        en: "ᴀᴘᴋ ғᴏᴜɴᴅ",
        wo: "Apk bi am na",
        ee: "Apk dze",
        ln: "Apk ezwami",
        sw: "Apk imepatikana",
        zu: "I-apk itholakele",
        ht: "Apk jwenn",
        hi: "APK मिल गया"
    },
    apkAppLabel: {
        fr: "ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ",
        en: "ᴀᴘᴘ",
        wo: "Application",
        ee: "App",
        ln: "Application",
        sw: "Programu",
        zu:Uhlelo",
        ht: "Aplikasyon",
        hi: "ऐप"
    },
    apkDeveloperLabel: {
        fr: "ᴅᴇ́ᴠᴇʟᴏᴘᴘᴇᴜʀ",
        en: "ᴅᴇᴠᴇʟᴏᴘᴇʀ",
        wo: "Developer",
        ee: "Developer",
        ln: "Mokeli",
        sw: "Msanidi",
        zu: "Umthuthukisi",
        ht: "Devlopè",
        hi: "डेवलपर"
    },
    apkUnknown: {
        fr: "ɪɴᴄᴏɴɴᴜ",
        en: "Unknown",
        wo: "Xamul ko",
        ee: "Menya nyateƒe o",
        ln: "Eyebani te",
        sw: "Haijulikani",
        zu: "Azaziwa",
        ht: "Nekoni",
        hi: "अज्ञात"
    },
    apkUserNote: {
        fr: "*ɴᴏᴛᴇ :* ᴘᴏᴜʀ ᴅᴇs ʀᴀɪsᴏɴs ᴅᴇ sᴇ́ᴄᴜʀɪᴛᴇ́, ʟᴇ ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴅɪʀᴇᴄᴛ ᴅᴜ ғɪᴄʜɪᴇʀ ᴀᴘᴋ ᴇsᴛ ʀᴇsᴇʀᴠᴇ́ ᴀᴜ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ. ᴠᴏɪᴄɪ ʟᴇ ʟɪᴇɴ ᴏғғɪᴄɪᴇʟ :",
        en: "*ɴᴏᴛᴇ:* For security reasons, direct APK file download is restricted to the owner. Here is the official link:",
        wo: "*Nota:* Ngir sécurité, download direct apk bi borom bot bi rekk mo ko mën. Lii la lien officiel bi:",
        ee: "*Nyaŋenyanya:* Le dedienɔnɔ ta, apk download le amesiamesee ta enye dɔdzikpɔla ƒe tɔ koe.",
        ln: "*Eyebisi:* Mpo na libateli, téléchargement ya apk ezali kaka pona nkolo. Talá lien ya ofisieli:",
        sw: "*Kumbuka:* Kwa sababu za kiusalama, kupakua faili moja kwa moja kumezuiliwa kwa mmiliki. Hapa kuna kiungo rasmi:",
        zu: "*Qaphela:* Ngezizathu zokuphepha, ukulanda i-apk kuqondile kuvunyelwe umnikazi kuphela. Nayi ixhumano esemthethweni:",
        ht: "*Nòt:* Pou rezon sekirite, telechajman dirèk dosye apk a rezève pou mèt la. Men lyen ofisyèl la:",
        hi: "*नोट:* सुरक्षा कारणों से, प्रत्यक्ष APK फ़ाइल डाउनलोड मालिक तक सीमित है। यहाँ आधिकारिक लिंक है:"
    },
    apkDownloadLabel: {
        fr: "ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ",
        en: "ᴅᴏᴡɴʟᴏᴀᴅ",
        wo: "Download",
        ee: "Download",
        ln: "Téléchargement",
        sw: "Pakua",
        zu: "Landa",
        ht: "Telechaje",
        hi: "डाउनलोड"
    },
    apkUrlUnavailable: {
        fr: "ʟɪᴇɴ ᴅᴇ ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴀᴘᴋ ɴᴏɴ ᴅɪsᴘᴏɴɪʙʟᴇ.",
        en: "ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ᴜʀʟ ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ.",
        wo: "Lien download apk amul.",
        ee: "Apk download url mele anyi o.",
        ln: "Lien ya téléchargement ya apk ezali te.",
        sw: "Kiungo cha kupakua cha apk hakipatikani.",
        zu: "Ixhumano sokulanda se-apk asitholakali.",
        ht: "Lyen telechajman apk an pa disponib.",
        hi: "APK डाउनलोड यूआरएल उपलब्ध नहीं है।"
    },
    apkDownloadingOwner: {
        fr: "ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴅᴇ l'ᴀᴘᴋ ᴘᴏᴜʀ ʟᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ : {appName}",
        en: "ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴀᴘᴋ ғᴏʀ ᴏᴡɴᴇʀ : {appName}",
        wo: "Di download apk bi ngir borom bi: {appName}",
        ee: "Le apk ɖem na dɔdzikpɔla la: {appName}",
        ln: "Azali kotélécharger apk pona nkolo: {appName}",
        sw: "Inapakua apk kwa ajili ya mmiliki: {appName}",
        zu: "Ilanda i-apk yumnikazi: {appName}",
        ht: "Ap telechaje apk pou mèt la: {appName}",
        hi: "{appName} के लिए मालिक द्वारा डाउनलोड किया जा रहा है"
    },
    apkDownloadFileError: {
        fr: "ᴇ́ᴄʜᴇᴄ ᴅᴜ ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴅᴜ ғɪᴄʜɪᴇʀ ᴀᴘᴋ.",
        en: "ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴀᴘᴋ ғɪʟᴇ.",
        wo: "Njuumte ci download fichier apk bi.",
        ee: "Mekpe ɖe apk fael la download ŋu o.",
        ln: "Eboyi kotélécharger fichier ya apk.",
        sw: "Imeshindikana kupakua faili ya apk.",
        zu: "Kuhlulekile ukulanda ifayela le-apk.",
        ht: "Echèk pou telechaje dosye apk la.",
        hi: "APK फ़ाइल डाउनलोड करने में विफल।"
    },
    apkOwnerModeTitle: {
        fr: "ғɪᴄʜɪᴇʀ ᴀᴘᴋ (ᴍᴏᴅᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ)",
        en: "ᴀᴘᴋ ғɪʟᴇ (ᴏᴡɴᴇʀ ᴍᴏᴅᴇ)",
        wo: "Fichier apk (Mode borom)",
        ee: "Apk fael (Dɔdzikpɔla mode)",
        ln: "Fichier ya apk (Mode ya nkolo)",
        sw: "Faili ya apk (Hali ya mmiliki)",
        zu: "Ifayela le-apk (Imodi yumnikazi)",
        ht: "Dosye apk (Mòd mèt)",
        hi: "APK फ़ाइल (मालिक मोड)"
    },
    apkSourceLabel: {
        fr: "sᴏᴜʀᴄᴇ",
        en: "sᴏᴜʀᴄᴇ",
        wo: "Source",
        ee: "Source",
        ln: "Ezaleli",
        sw: "Chanzo",
        zu: "Umthombo",
        ht: "Sous",
        hi: "स्रोत"
    },
    apkUnexpectedError: {
        fr: "ᴇʀʀᴇᴜʀ ɪɴᴀᴛᴛᴇɴᴅᴜᴇ",
        en: "ᴜɴᴇxᴘᴇᴄᴛᴇᴅ ᴇʀʀᴏʀ",
        wo: "Njuumte bu ñu xawul",
        ee: "Vodada si mënɔ mɔ kpɔ o",
        ln: "Mbuma mabe ya ebɛtɛ",
        sw: "Kosa lisilotarajiwa",
        zu: "Iphutha elingalindelekile",
        ht: "Erè ki pa t te dwe fèt",
        hi: "अप्रत्याशित त्रुटि"
    },

    // ==========================================
    // COMMANDE ATTP (ATTP.JS)
    // ==========================================
    attpUsage: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ : `{prefix}ᴀᴛᴛᴘ ᴠᴏᴛʀᴇ ᴛᴇxᴛᴇ ɪᴄɪ`",
        en: "Usage: `{prefix}attp your text here`",
        wo: "Jëfandikoo: `{prefix}attp sa baat bi fi`",
        ee: "Zazã: `{prefix}attp wò nya fa`",
        ln: "Bosaleli: `{prefix}attp maloba na yo awa`",
        sw: "Matumizi: `{prefix}attp maandishi yako hapa`",
        zu: "Ukusetshenziswa: `{prefix}attp umbhalo wakho lapha`",
        ht: "Itilizasyon: `{prefix}attp tèks ou an isit la`",
        hi: "उपयोग: `{prefix}attp यहाँ अपना पाठ दर्ज करें`"
    },
    attpError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ gᴇ́ɴᴇ́ʀᴇʀ l'ᴀᴜᴛᴏᴄᴏʟʟᴀɴᴛ.",
        en: "Could not generate the sticker.",
        wo: "Mënula sos sticker bi.",
        ee: "Mate ŋu wɔ sticker la o.",
        ln: "Kokoka te kosala sticker.",
        sw: "Haiwezekani kutengeneza nambari.",
        zu: "Akunakwenzeka ukwenza isitikha.",
        ht: "Enposib pou jenere fichye a.",
        hi: "स्टिकर जेनरेट करने में असमर्थ।"
    },

    // ==========================================
    // COMMANDE AUTOREACT (AUTOREACT.JS)
    // ==========================================
    autoReactMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ",
        en: "auto-react menu",
        wo: "Menu auto-react",
        ee: "Auto-react menu",
        ln: "Menu auto-react",
        sw: "Menyu ya auto-react",
        zu: "Imenyu ye-auto-react",
        ht: "Meni auto-react",
        hi: "ऑटो-रिएक्ट मेनू"
    },
    autoReactEnabledMsg: {
        fr: "ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ ᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ ᴇɴᴀʙʟᴇᴅ.",
        wo: "Auto-react tabal na.",
        ee: "Auto-react wɔ ŋu.",
        ln: "Auto-react ezali.",
        sw: "Auto-react imewashwa.",
        zu: "I-auto-react ivulwe.",
        ht: "Auto-react aktive.",
        hi: "ऑटो-रिएक्ट सक्षम किया गया।"
    },
    autoReactDisabledMsg: {
        fr: "ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Auto-react fey na.",
        ee: "Auto-react mewɔ ŋu o.",
        ln: "Auto-react elongolami.",
        sw: "Auto-react imezimwa.",
        zu: "I-auto-react ivaliwe.",
        ht: "Auto-react desaktive.",
        hi: "ऑटो-रिएक्ट अक्षम किया गया।"
    },
    autoReactModeSet: {
        fr: "ᴍᴏᴅᴇ ᴅᴇ́ғɪɴɪ sᴜʀ :",
        en: "ᴍᴏᴅᴇ sᴇᴛ ᴛᴏ :",
        wo: "Mode definaal ci:",
        ee: "Nɔnɔmɛ ɖo ɖe:",
        ln: "Lolenge elandi:",
        sw: "Hali imewekwa kwa:",
        zu: "Imodi imiselwe ku:",
        ht: "Mòd mete sou:",
        hi: "मोड सेट किया गया है:"
    },
    autoReactStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ",
        en: "auto-react status",
        wo: "Statut auto-react",
        ee: "Auto-react nɔnɔmɛ",
        ln: "Ezaleli ya auto-react",
        sw: "Hali ya auto-react",
        zu: "Isimo se-auto-react",
        ht: "Estati auto-react",
        hi: "ऑटो-रिएक्ट स्थिति"
    },
    autoReactStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "sᴛᴀᴛᴜs",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    autoReactModeLabel: {
        fr: "ᴍᴏᴅᴇ",
        en: "ᴍᴏᴅᴇ",
        wo: "Mode",
        ee: "Mode",
        ln: "Mode",
        sw: "Hali",
        zu: "Imodi",
        ht: "Mòd",
        hi: "मोड"
    },
    autoReactError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ ʟ'ᴀᴜᴛᴏʀᴇᴀᴄᴛ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴀᴜᴛᴏʀᴇᴀᴄᴛ.",
        wo: "Njuumte am na ci autoreact bi.",
        ee: "Vodada dzɔ esime nɔ autoreact wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya autoreact.",
        sw: "Kosa limetokea wakati wa kuendesha autoreact.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-autoreact.",
        ht: "Yon erè fèt pandan egzekisyon autoreact la.",
        hi: "ऑटोरिएक्ट निष्पादित करते समय एक त्रुटि हुई।"
    },
    mode_private: {
        fr: "ᴘʀɪᴠᴇ́",
        en: "ᴘʀɪᴠᴀᴛᴇ",
        wo: "Privé",
        ee: "Dotẽ",
        ln: "Ya peyi te",
        sw: "Binafsi",
        zu: "Okuyimfihlo",
        ht: "Prive",
        hi: "निजी"
    },
    mode_group: {
        fr: "ɢʀᴏᴜᴘᴇ",
        en: "ɢʀᴏᴜᴘ",
        wo: "Kureel",
        ee: "Ƒome",
        ln: "Etuluku",
        sw: "Kikundi",
        zu: "Iqembu",
        ht: "Gwoup",
        hi: "समूह"
    },
    mode_all: {
        fr: "ᴛᴏᴜᴛ",
        en: "ᴀʟʟ",
        wo: "Lépp",
        ee: "Katã",
        ln: "Nyonso",
        sw: "Yote",
        zu: "Konke",
        ht: "Tout",
        hi: "सभी"
    },

    // ==========================================
    // COMMANDE AUTOSTATUS (AUTOSTATUS.JS)
    // ==========================================
    autoStatusMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴀᴜᴛᴏ-sᴛᴀᴛᴜs",
        en: "auto-status menu",
        wo: "Menu auto-status",
        ee: "Auto-status menu",
        ln: "Menu auto-status",
        sw: "Menyu ya auto-status",
        zu: "Imenyu ye-auto-status",
        ht: "Meni auto-status",
        hi: "ऑटो-स्टेटस मेनू"
    },
    autoStatusViewLabel: {
        fr: "ᴠᴜᴇ ᴀᴜᴛᴏ",
        en: "ᴠɪᴇᴡ",
        wo: "Seet auto",
        ee: "Kpɔ auto",
        ln: "Tala auto",
        sw: "Angalia auto",
        zu: "Bheka auto",
        ht: "Gade auto",
        hi: "ऑटो देखें"
    },
    autoStatusLikeLabel: {
        fr: "ʟɪᴋᴇ ᴀᴜᴛᴏ",
        en: "ʟɪᴋᴇ",
        wo: "Like auto",
        ee: "Like auto",
        ln: "Like auto",
        sw: "Penda auto",
        zu: "Thanda auto",
        ht: "Renmen auto",
        hi: "ऑटो लाइक"
    },
    autoStatusEmojiLabel: {
        fr: "ᴇᴍᴏᴊɪ",
        en: "ᴇᴍᴏᴊɪ",
        wo: "Emoji",
        ee: "Emoji",
        ln: "Emoji",
        sw: "Emoji",
        zu: "I-emoji",
        ht: "Emoji",
        hi: "इमोजी"
    },
    autoStatusEnabledMsg: {
        fr: "ᴀᴜᴛᴏ-ᴠɪᴇᴡ ᴇᴛ ᴀᴜᴛᴏ-ʟɪᴋᴇ ᴅᴇs sᴛᴀᴛᴜᴛs ᴀᴄᴛɪᴠᴇ́s.",
        en: "ᴀᴜᴛᴏ sᴛᴀᴛᴜs ᴠɪᴇᴡ ᴀɴᴅ ʟɪᴋᴇ ᴇɴᴀʙʟᴇᴅ.",
        wo: "Auto-view ak auto-status like tabal na.",
        ee: "Auto status kpɔkpɔ kple like wɔ ŋu.",
        ln: "Auto-view mpe auto-like ya status ezali.",
        sw: "Auto-view na auto-like ya status imewashwa.",
        zu: "I-auto-view ne-auto-like yesimo zivulwe.",
        ht: "Auto-view ak auto-like estati yo aktive.",
        hi: "ऑटो स्टेटस व्यू और लाइक सक्षम किया गया।"
    },
    autoStatusDisabledMsg: {
        fr: "ᴀᴜᴛᴏ-ᴠɪᴇᴡ ᴇᴛ ᴀᴜᴛᴏ-ʟɪᴋᴇ ᴅᴇs sᴛᴀᴛᴜᴛs ᴅᴇ́sᴀᴄᴛɪᴠᴇ́s.",
        en: "ᴀᴜᴛᴏ sᴛᴀᴛᴜs ᴠɪᴇᴡ ᴀɴᴅ ʟɪᴋᴇ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Auto-view ak auto-status like fey na.",
        ee: "Auto status kpɔkpɔ kple like mewɔ ŋu o.",
        ln: "Auto-view mpe auto-like ya status elongolami.",
        sw: "Auto-view na auto-like ya status imezimwa.",
        zu: "I-auto-view ne-auto-like yesimo zivaliwe.",
        ht: "Auto-view ak auto-like estati yo desaktive.",
        hi: "ऑटो स्टेटस व्यू और लाइक अक्षम किया गया।"
    },
    autoStatusViewMsg: {
        fr: "ᴀᴜᴛᴏ-ᴠɪᴇᴡ ᴅᴇs sᴛᴀᴛᴜᴛs :",
        en: "ᴀᴜᴛᴏ sᴛᴀᴛᴜs ᴠɪᴇᴡ :",
        wo: "Auto-view status yi:",
        ee: "Auto status kpɔkpɔ:",
        ln: "Auto-view ya status:",
        sw: "Auto-view ya status:",
        zu: "I-auto-view yesimo:",
        ht: "Auto-view estati yo:",
        hi: "ऑटो स्टेटस व्यू:"
    },
    autoStatusLikeMsg: {
        fr: "ᴀᴜᴛᴏ-ʟɪᴋᴇ ᴅᴇs sᴛᴀᴛᴜᴛs :",
        en: "ᴀᴜᴛᴏ sᴛᴀᴛᴜs ʟɪᴋᴇ :",
        wo: "Auto-like status yi:",
        ee: "Auto status like:",
        ln: "Auto-like ya status:",
        sw: "Auto-like ya status:",
        zu: "I-auto-like yesimo:",
        ht: "Auto-like estati yo:",
        hi: "ऑटो स्टेटस लाइक:"
    },
    autoStatusEmojiSet: {
        fr: "ᴇᴍᴏᴊɪ ᴅᴇ ʟɪᴋᴇ ᴀᴜᴛᴏ ᴅᴇ́ғɪɴɪ sᴜʀ :",
        en: "ᴀᴜᴛᴏ sᴛᴀᴛᴜs ʟɪᴋᴇ ᴇᴍᴏᴊɪ sᴇᴛ ᴛᴏ :",
        wo: "Emoji auto like definaal ci:",
        ee: "Auto status like emoji ɖo ɖe:",
        ln: "Emoji ya auto-like ekomami:",
        sw: "Emoji ya auto-like imewekwa kwa:",
        zu: "I-emoji ye-auto-like imiselwe ku:",
        ht: "Emoji auto-like mete sou:",
        hi: "ऑटो स्टेटस लाइक इमोजी सेट किया गया:"
    },
    autoStatusError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ l'ᴀᴜᴛᴏsᴛᴀᴛᴜs.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴀᴜᴛᴏsᴛᴀᴛᴜs.",
        wo: "Njuumte am na ci defar autostatus bi.",
        ee: "Vodada dzɔ esime nɔ autostatus wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya autostatus.",
        sw: "Kosa limetokea wakati wa kuendesha autostatus.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-autostatus.",
        ht: "Yon erè fèt pandan egzekisyon autostatus la.",
        hi: "ऑटोस्टेटस निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE BAN (BAN.JS)
    // ==========================================
    banMenuTitle: {
        fr: "ᴍᴇɴᴜ ʙᴀɴ ᴜᴛɪʟɪsᴀᴛᴇᴜʀ",
        en: "ban user menu",
        wo: "Menu ban nit ki",
        ee: "Ame ban menu",
        ln: "Menu ban moto",
        sw: "Menyu ya ban mtumiaji",
        zu: "Imenyu yokuvimbela umsebenzisi",
        ht: "Meni ban itilizatè",
        hi: "यूज़र बैन मेनू"
    },
    banMentionLabel: {
        fr: "ᴍᴇɴᴛɪᴏɴ",
        en: "ᴍᴇɴᴛɪᴏɴ",
        wo: "Mention",
        ee: "Mention",
        ln: "Mention",
        sw: "Taja",
        zu: "Ukukhuluma",
        ht: "Mansyon",
        hi: "मेंशन"
    },
    banNumberLabel: {
        fr: "ɴᴜᴍᴇ́ʀᴏ",
        en: "ɴᴜᴍʙᴇʀ",
        wo: "Numero",
        ee: "Numero",
        ln: "Numero",
        sw: "Nambari",
        zu: "Inombolo",
        ht: "Nimewo",
        hi: "नंबर"
    },
    banAlreadyBanned: {
        fr: "ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ ᴇsᴛ ᴅᴇ́ᴊᴀ̀ ʙᴀɴɴɪ.",
        en: "ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ ʙᴀɴɴᴇᴅ.",
        wo: "Nit ki banni na ko fa xoxo.",
        ee: "Wo ban ame la xoxo.",
        ln: "Moto abangami kala.",
        sw: "Mtumiaji amezuiwa tayari.",
        zu: "Umsebenzisi usuvele uvimbekile.",
        ht: "Itilizatè a deja banni.",
        hi: "उपयोगकर्ता पहले से प्रतिबंधित है।"
    },
    banSuccessMsg: {
        fr: "ʟ'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ",
        en: "ᴜsᴇʀ",
        wo: "Nit ki",
        ee: "Ame la",
        ln: "Moto",
        sw: "Mtumiaji",
        zu: "Umsebenzisi",
        ht: "Itilizatè a",
        hi: "उपयोगकर्ता"
    },
    banError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ʙᴀɴɴɪʀ l'ᴜᴛɪʟɪsᴀᴛᴇᴜʀ",
        en: "ᴄᴏᴜʟᴅ ɴᴏᴛ ʙᴀɴ ᴜsᴇʀ",
        wo: "Mënula banni nit ki",
        ee: "Mate ŋu ban ame la o",
        ln: "Kokoka te kobanga moto",
        sw: "Haiwezekani kumzuia mtumiaji",
        zu: "Akunakwenzeka ukuvimbela umsebenzisi",
        ht: "Enposib pou banni itilizatè a",
        hi: "उपयोगकर्ता को प्रतिबंधित करने में असमर्थ"
    },

    // ==========================================
    // COMMANDE BLOCKINBOX (BLOCKINBOX.JS)
    // ==========================================
    blockInboxBlockedMsg: {
        fr: "ʟᴇ ʙᴏᴛ ʙʟᴏǫᴜᴇ ᴅᴇ́ᴇsᴏʀᴍᴀɪs ᴛᴏᴜs ʟᴇs ᴍᴇssᴀɢᴇs ᴘʀɪᴠᴇ́s.",
        en: "The bot is now blocking all private messages.",
        wo: "Bot bi tëj na lépp message privé yi.",
        ee: "Bot la le gbedeɖiɖi dotẽ tɔwo katã lé gé.",
        ln: "Bot ezali kanga mikanda nyonso ya private.",
        sw: "Bot sasa inazuia jumbe zote za kibinafsi.",
        zu: "I-bot manje ivimba yonke imiyale eyimfihlo.",
        ht: "Bot la ap bloke tout mesaj prive kounye a.",
        hi: "बॉट अब सभी निजी संदेशों को ब्लॉक कर रहा है।"
    },
    blockInboxAllowedMsg: {
        fr: "ʟᴇ ʙᴏᴛ ᴀᴄᴄᴇᴘᴛᴇ ᴅᴇ́sᴏʀᴍᴀɪs ʟᴇs ᴍᴇssᴀɢᴇs ᴘʀɪᴠᴇ́s.",
        en: "The bot is now accepting private messages.",
        wo: "Bot bi nangu na message privé yi.",
        ee: "Bot la xɔ gbedeɖiɖi dotẽ tɔwo fifia.",
        ln: "Bot ezali ndima mikanda nyonso ya private.",
        sw: "Bot sasa inakubali jumbe za kibinafsi.",
        zu: "I-bot manje yamukela imiyale eyimfihlo.",
        ht: "Bot la ap aksepte mesaj prive kounye a.",
        hi: "बॉट अब निजी संदेश स्वीकार कर रहा है।"
    },
    blockInboxStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ʙʟᴏᴄᴋɪɴʙᴏx",
        en: "blockinbox status",
        wo: "Statut blockinbox",
        ee: "Blockinbox nɔnɔmɛ",
        ln: "Ezaleli ya blockinbox",
        sw: "Hali ya blockinbox",
        zu: "Isimo se-blockinbox",
        ht: "Estati blockinbox",
        hi: "ब्लॉकइनबॉक्स स्थिति"
    },
    blockInboxStatusLabel: {
        fr: "ᴍᴇssᴀɢᴇs ᴘʀɪᴠᴇ́s",
        en: "ᴘʀɪᴠᴀᴛᴇ ɪɴʙᴏx",
        wo: "Message privé",
        ee: "Dotẽ gbedeɖiɖi",
        ln: "Mikanda ya private",
        sw: "Ujumbe wa kibinafsi",
        zu: "Umyale oyimfihlo",
        ht: "Mesaj prive",
        hi: "निजी इनबॉक्स"
    },
    blockInboxError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ l'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴇ ʙʟᴏᴄᴋɪɴʙᴏx.",
        en: "An error occurred while executing blockinbox.",
        wo: "Njuumte am na ci defar blockinbox bi.",
        ee: "Vodada dzɔ esime nɔ blockinbox wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya blockinbox.",
        sw: "Kosa limetokea wakati wa kuendesha blockinbox.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-blockinbox.",
        ht: "Yon erè fèt pandan egzekisyon blockinbox la.",
        hi: "ब्लॉकइनबॉक्स निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE BOTIMAGE (BOTIMAGE.JS)
    // ==========================================
    botImageOwnerError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ʀᴇ́ᴄᴜᴘᴇ́ʀᴇʀ l'ɪᴅ ᴅᴜ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ.",
        en: "Impossible to retrieve the owner ID.",
        wo: "Mënula jot id borom bot bi.",
        ee: "Mate ŋu kpɔ dɔdzikpɔla ƒe id o.",
        ln: "Kokoka te kozwa id ya nkolo.",
        sw: "Haiwezekani kupata id ya mmiliki.",
        zu: "Akunakwenzeka ukuthola id yumnikazi.",
        ht: "Enposib pou jwenn id mèt la.",
        hi: "मालिक की आईडी पुनः प्राप्त करने में असमर्थ।"
    },
    botImageReplyInstruction: {
        fr: "ʀᴇ́ᴘᴏɴᴅᴇᴢ ᴀ̀ ᴜɴᴇ ɪᴍᴀɢᴇ",
        en: "reply to an image",
        wo: "Tontul benn image",
        ee: "Ðo ɖe nɔnɔmɛ ŋu",
        ln: "Pesa eyano na elilingi",
        sw: "Jibu picha",
        zu: "Phendula isithombe",
        ht: "Reponn yon imaj",
        hi: "एक छवि का उत्तर दें"
    },
    botImageDownloading: {
        fr: "ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴇᴛ ᴍɪsᴇ ᴀ̀ ᴊᴏᴜʀ ᴅᴇ ᴠᴏᴛʀᴇ ɪᴍᴀɢᴇ ᴘᴇʀsᴏɴɴᴀʟɪsᴇ́ᴇ...",
        en: "Downloading and updating your custom image...",
        wo: "Di download ak yeesal sa image bi...",
        ee: "Le wò nɔnɔmɛ detɔ ɖem eye le yeyem...",
        ln: "Azali kotélécharger mpe kobongisa elilingi na yo...",
        sw: "Inapakua na kusasisha picha yako maalum...",
        zu: "Ilanda futhi ivuselela isithombe sakho...",
        ht: "Ap telechaje epi mete ajou imaj ou an...",
        hi: "आपकी कस्टम छवि डाउनलोड और अपडेट की जा रही है..."
    },
    botImageDownloadFailed: {
        fr: "ᴇ́ᴄʜᴇᴄ ᴅᴜ tᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴅᴇ l'ɪᴍᴀɢᴇ.",
        en: "Failed to download the image.",
        wo: "Njuumte ci download image bi.",
        ee: "Mekpe ɖe nɔnɔmɛ la download ŋu o.",
        ln: "Eboyi kotélécharger elilingi.",
        sw: "Imeshindikana kupakua picha.",
        zu: "Kuhlulekile ukulanda isithombe.",
        ht: "Echèk pou telechaje imaj la.",
        hi: "छवि डाउनलोड करने में विफल।"
    },
    botImageSuccess: {
        fr: "ᴠᴏᴛʀᴇ ɴᴏᴜᴠᴇʟʟᴇ ɪᴍᴀɢᴇ ᴅᴇ ʙᴏᴛ ᴀ ᴇ́ᴛᴇ́ ᴇɴʀᴇɢɪsᴛʀᴇ́ᴇ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !",
        en: "Your new bot image has been successfully saved!",
        wo: "Sa image bot bu bees bi dëpp na bu baax!",
        ee: "Wò bot ƒe nɔnɔmɛ yeyee la ɖo ɖe edzi nyuie!",
        ln: "Elilingi ya sika ya bot ebakisami malamu!",
        sw: "Picha mpya ya bot imehifadhiwa kwa mafanikio!",
        zu: "Isithombe esisha se-bot sigcinwe ngempumelelo!",
        ht: "Nouvo imaj bot ou a anrejistre ak siksè!",
        hi: "आपकी नई बॉट छवि सफलतापूर्वक सहेज ली गई है!"
    },
    botImageUnexpectedError: {
        fr: "ᴇʀʀᴇᴜʀ ɪɴᴀᴛᴛᴇɴᴅᴜᴇ",
        en: "Unexpected error",
        wo: "Njuumte bu ñu xawul",
        ee: "Vodada si mënɔ mɔ kpɔ o",
        ln: "Mbuma mabe ya ebɛtɛ",
        sw: "Kosa lisilotarajiwa",
        zu: "Iphutha elingalindelekile",
        ht: "Erè ki pa t te dwe fèt",
        hi: "अप्रत्याशित त्रुटि"
    },

    // ==========================================
    // COMMANDE BOTNAME (BOTNAME.JS)
    // ==========================================
    botNameOwnerError: {
        fr: "ᴇʀʀᴇᴜʀ : ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ʀᴇ́ᴄᴜᴘᴇ́ʀᴇʀ l'ɪᴅ ᴅᴜ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ ᴅᴜ ʙᴏᴛ.",
        en: "Error: Unable to retrieve the bot owner ID.",
        wo: "Njuumte: Mënula jot id borom bot bi.",
        ee: "Vodada: Mate ŋu kpɔ bot ƒe dɔdzikpɔla id o.",
        ln: "Mbuma mabe: Kokoka te kozwa id ya nkolo bot.",
        sw: "Kosa: Haiwezekani kupata id ya mmiliki wa bot.",
        zu: "Iphutha: Akunakwenzeka ukuthola id yumnikazi we-bot.",
        ht: "Erè: Enposib pou jwenn id mèt bot la.",
        hi: "त्रुटि: बॉट मालिक की आईडी पुनः प्राप्त करने में असमर्थ।"
    },
    botNameProvideNew: {
        fr: "ᴠᴇᴜɪʟʟᴇᴢ ғᴏᴜʀɴɪʀ ᴜɴ ɴᴏᴜᴠᴇᴀᴜ ɴᴏᴍ.",
        en: "Please provide a new name.",
        wo: "May ma tur bu bees.",
        ee: "Na ŋkɔ yeyee ɖeka.",
        ln: "Pesa kombo ya sika.",
        sw: "Tafadhali toa jina jipya.",
        zu: "Sicela unikeze igama elisha.",
        ht: "Tanpri bay yon nouvo non.",
        hi: "कृपया एक नया नाम प्रदान करें।"
    },
    botNameCurrent: {
        fr: "ɴᴏᴍ ᴀᴄᴛᴜᴇʟ ᴘᴏᴜʀ ᴠᴏᴛʀᴇ ᴘʀᴏғɪʟ",
        en: "Current name for your profile",
        wo: "Tur bu tay ci sa profil",
        ee: "ŋkɔ si le wò profil ŋu",
        ln: "Kombo ya sikoyo ya profil na yo",
        sw: "Jina la sasa la wasifu wako",
        zu: "Igama lamanje lephrofayela yakho",
        ht: "Non aktyèl pou pwofil ou",
        hi: "आपकी प्रोफ़ाइल के लिए वर्तमान नाम"
    },
    botNameUpdatedStatus: {
        fr: "ɴᴏᴍ ᴍɪs ᴀ̀ ᴊᴏᴜʀ",
        en: "NAME UPDATED",
        wo: "Tur bi yeesal na",
        ee: "Ŋkɔ yeyee",
        ln: "Kombo ebongwami",
        sw: "Jina limesasishwa",
        zu: "Igama luvuselelwe",
        ht: "Non mete ajou",
        hi: "नाम अपडेट किया गया"
    },
    botNameSuccessMsg: {
        fr: "ɴᴏᴍ ᴅᴜ ʙᴏᴛ ᴍɪs ᴀ̀ ᴊᴏᴜʀ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s ᴘᴏᴜʀ ᴠᴏᴛʀᴇ ᴘʀᴏғɪʟ !",
        en: "Bot name successfully updated for your profile!",
        wo: "Tur bot bi yeesal na bu baax ci sa profil!",
        ee: "Bot ƒe ŋkɔ la ɖo ɖe edzi nyuie le wò profil ŋu!",
        ln: "Kombo ya bot ebongwami malamu pona profil na yo!",
        sw: "Jina la bot limesasishwa kwa mafanikio kwa wasifu wako!",
        zu: "Igama le-bot liyaphumelela ukuvuselelwa kuphrofayela yakho!",
        ht: "Non bot la mete ajou ak siksè pou pwofil ou!",
        hi: "आपकी प्रोफ़ाइल के लिए बॉट का नाम सफलतापूर्वक अपडेट किया गया!"
    },
    botNameSaveError: {
        fr: "ᴇʀʀᴇᴜʀ ʟᴏʀs ᴅᴇ l'ᴇɴʀᴇɢɪsᴛʀᴇᴍᴇɴᴛ ᴅᴜ ɴᴏᴜᴠᴇᴀᴜ ɴᴏᴍ.",
        en: "Error while saving the new name.",
        wo: "Njuumte ci dugal tur bu bees bi.",
        ee: "Vodada esime nɔ ŋkɔ yeyee la dzram.",
        ln: "Mbuma mabe ntango ezali kobomba kombo ya sika.",
        sw: "Kosa wakati wa kuhifadhi jina jipya.",
        zu: "Iphutha ngenkathi kugcinwa igama elisha.",
        ht: "Erè pandan anrejistreman nouvo non an.",
        hi: "नया नाम सहेजते समय त्रुटि।"
    },

    // ==========================================
    // COMMANDE GOODBYE (GOODBYE.JS)
    // ==========================================
    goodbyeSettingsTitle: {
        fr: "ᴘᴀʀᴀᴍᴇ̀ᴛʀᴇs ɢᴏᴏᴅʙʏᴇ",
        en: "goodbye settings",
        wo: "Teeytu goodbye",
        ee: "Goodbye ɖoɖowo",
        ln: "Bibongisi ya goodbye",
        sw: "Mipangilio ya goodbye",
        zu: "Izilungiselelo ze-goodbye",
        ht: "Anviwònman goodbye",
        hi: "गुडबाय सेटिंग्स"
    },
    goodbyeUsageCurrent: {
        fr: "ɢʀᴏᴜᴘᴇ ᴀᴄᴛᴜᴇʟ",
        en: "Current group",
        wo: "Kureel bi tay",
        ee: "Ƒome si le",
        ln: "Etuluku ya sikoyo",
        sw: "Kikundi cha sasa",
        zu: "Iqembu lamanje",
        ht: "Gwoup aktyèl",
        hi: "वर्तमान समूह"
    },
    goodbyeUsageGlobal: {
        fr: "ɢʟᴏʙᴀʟ",
        en: "Global",
        wo: "Global",
        ee: "Global",
        ln: "Global",
        sw: "Kimataifa",
        zu: "Global",
        ht: "Global",
        hi: "ग्लोबल"
    },
    goodbyeUsageDisableGlobal: {
        fr: "ᴅᴇ́sᴀᴄᴛɪᴠᴇʀ ɢʟᴏʙᴀʟᴇᴍᴇɴᴛ",
        en: "Disable global",
        wo: "Feyal lépp",
        ee: "Mewɔ ŋu global o",
        ln: "Longola global",
        sw: "Zima kimataifa",
        zu: "Vala global",
        ht: "Desaktive global",
        hi: "ग्लोबल अक्षम करें"
    },
    goodbyeGroupEnabled: {
        fr: "ᴍᴇssᴀɢᴇ ᴅᴇ ᴅᴇ́ᴘᴀʀᴛ ᴀᴄᴛɪᴠᴇ́ ᴘᴏᴜʀ ᴄᴇ ɢʀᴏᴜᴘᴇ.",
        en: "Goodbye enabled for this group.",
        wo: "Message goodbye tabal na ci kureel bi.",
        ee: "Goodbye wɔ ŋu na ƒome sia.",
        ln: "Goodbye ezali na etuluku oyo.",
        sw: "Goodbye imewashwa kwa kikundi hiki.",
        zu: "I-goodbye ivulwe kuleli qembu.",
        ht: "Goodbye aktive pou gwoup sa a.",
        hi: "इस समूह के लिए गुडबाय सक्षम किया गया है।"
    },
    goodbyeGroupDisabled: {
        fr: "ᴍᴇssᴀɢᴇ ᴅᴇ ᴅᴇ́ᴘᴀʀᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́ ᴘᴏᴜʀ ᴄᴇ ɢʀᴏᴜᴘᴇ.",
        en: "Goodbye disabled for this group.",
        wo: "Message goodbye fey na ci kureel bi.",
        ee: "Goodbye mewɔ ŋu o na ƒome sia.",
        ln: "Goodbye ezali te na etuluku oyo.",
        sw: "Goodbye imezimwa kwa kikundi hiki.",
        zu: "I-goodbye ivaliwe kuleli qembu.",
        ht: "Goodbye desaktive pou gwoup sa a.",
        hi: "इस समूह के लिए गुडबाय अक्षम किया गया है।"
    },
    goodbyeGlobalEnabled: {
        fr: "ᴍᴇssᴀɢᴇ ᴅᴇ ᴅᴇ́ᴘᴀʀᴛ ᴀᴄᴛɪᴠᴇ́ ɢʟᴏʙᴀʟᴇᴍᴇɴᴛ ᴘᴏᴜʀ ᴛᴏᴜs ᴠᴏs ɢʀᴏᴜᴘᴇs.",
        en: "Goodbye enabled globally for all your groups.",
        wo: "Goodbye tabal na ci lépp sa kureel yi.",
        ee: "Goodbye wɔ ŋu global na wò ƒome katã.",
        ln: "Goodbye ezali global pona bituluku na yo nyonso.",
        sw: "Goodbye imewashwa kimataifa kwa vikundi vyako vyote.",
        zu: "I-goodbye ivulwe global kuwo wonke amaqembu akho.",
        ht: "Goodbye aktive globalman pou tout gwoup ou yo.",
        hi: "आपके सभी समूहों के लिए गुडबाय ग्लोबल रूप से सक्षम किया गया है।"
    },
    goodbyeGlobalDisabled: {
        fr: "ᴍᴇssᴀɢᴇ ᴅᴇ ᴅᴇ́ᴘᴀʀᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́ ɢʟᴏʙᴀʟᴇᴍᴇɴᴛ ᴘᴏᴜʀ ᴛᴏᴜs ᴠᴏs ɢʀᴏᴜᴘᴇs.",
        en: "Goodbye disabled globally for all your groups.",
        wo: "Goodbye fey na ci lépp sa kureel yi.",
        ee: "Goodbye mewɔ ŋu global o na wò ƒome katã.",
        ln: "Goodbye ezali te global pona bituluku na yo nyonso.",
        sw: "Goodbye imezimwa kimataifa kwa vikundi vyako vyote.",
        zu: "I-goodbye ivaliwe global kuwo wonke amaqembu akho.",
        ht: "Goodbye desaktive globalman pou tout gwoup ou yo.",
        hi: "आपके सभी समूहों के लिए गुडबाय ग्लोबल रूप से अक्षम किया गया है।"
    },
    goodbyeStatusTitle: {
        fr: "sᴛᴀᴛᴜᴛ ɢᴏᴏᴅʙʏᴇ",
        en: "goodbye status",
        wo: "Statut goodbye",
        ee: "Goodbye nɔnɔmɛ",
        ln: "Ezaleli ya goodbye",
        sw: "Hali ya goodbye",
        zu: "Isimo se-goodbye",
        ht: "Estati goodbye",
        hi: "गुडबाय स्थिति"
    },
    goodbyeLocalLabel: {
        fr: "ʟᴏᴄᴀʟ",
        en: "Local",
        wo: "Local",
        ee: "Local",
        ln: "Local",
        sw: "Ndani",
        zu: "Local",
        ht: "Lokal",
        hi: "स्थानीय"
    },
    goodbyeGlobalLabel: {
        fr: "ɢʟᴏʙᴀʟ (ᴛᴏᴜs)",
        en: "Global (All)",
        wo: "Global (Lépp)",
        ee: "Global (Katã)",
        ln: "Global (Nyonso)",
        sw: "Kimataifa (Yote)",
        zu: "Global (Konke)",
        ht: "Global (Tout)",
        hi: "ग्लोबल (सभी)"
    },
    goodbyeUserLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛᴇᴜʀ",
        en: "User",
        wo: "Nit ki",
        ee: "Ame la",
        ln: "Moto",
        sw: "Mtumiaji",
        zu: "Umsebenzisi",
        ht: "Itilizatè",
        hi: "उपयोगकर्ता"
    },
    goodbyeGroupLabel: {
        fr: "ɢʀᴏᴜᴘᴇ",
        en: "Group",
        wo: "Kureel",
        ee: "Ƒome",
        ln: "Etuluku",
        sw: "Kikundi",
        zu: "Iqembu",
        ht: "Gwoup",
        hi: "समूह"
    },
    goodbyeMembersLabel: {
        fr: "ᴍᴇᴍʙʀᴇs",
        en: "Members",
        wo: "Bokks",
        ee: "Dɔwɔlawo",
        ln: "Ba mopalani",
        sw: "Wanachama",
        zu: "Amalungu",
        ht: "Manm yo",
        hi: "सदस्य"
    },
    goodbyeCreatedLabel: {
        fr: "ᴅᴀᴛᴇ ᴅᴇ ᴄʀᴇ́ᴀᴛɪᴏɴ",
        en: "Date Created",
        wo: "Bésu sos bi",
        ee: "Wɔɣi si wo wɔe",
        ln: "Mikolo ya bosungi",
        sw: "Tarehe ya kuundwa",
        zu: "Usuku lokudalwa",
        ht: "Dat kreyasyon",
        hi: "बनाने की तिथि"
    },
    goodbyeUnknownDate: {
        fr: "ɪɴᴄᴏɴɴᴜᴇ",
        en: "Unknown",
        wo: "Xamul ko",
        ee: "Menya nyateƒe o",
        ln: "Eyebani te",
        sw: "Haijulikani",
        zu: "Azaziwa",
        ht: "Nekoni",
        hi: "अज्ञात"
    },

    // ==========================================
    // COMMANDE CAPCUT (CAPCUT.JS)
    // ==========================================
    capcutBoxTitle: {
        fr: "ᴍᴏᴅᴇ̀ʟᴇ ᴄᴀᴘᴄᴜᴛ",
        en: "ᴄᴀᴘᴄᴜᴛ ᴛᴇᴍᴘʟᴀᴛᴇ",
        wo: "Modèle capcut",
        ee: "Capcut nɔnɔmɛ",
        ln: "Modèle capcut",
        sw: "Kigezo cha capcut",
        zu: "Isibonelo se-capcut",
        ht: "Modèl capcut",
        hi: "कैपकट टेम्प्लेट"
    },
    capcutTitleLabel: {
        fr: "ᴛɪᴛʀᴇ",
        en: "ᴛɪᴛʟᴇ",
        wo: "Titre",
        ee: "Titre",
        ln: "Titre",
        sw: "Kichwa",
        zu: "Isihloko",
        ht: "Tit",
        hi: "शीर्षक"
    },
    capcutAuthorLabel: {
        fr: "ᴀᴜᴛᴇᴜʀ",
        en: "ᴀᴜᴛʜᴏʀ",
        wo: "Auteur",
        ee: "Auteur",
        ln: "Mokeli",
        sw: "Mwandishi",
        zu: "Umbhali",
        ht: "Otè",
        hi: "लेखक"
    },
    capcutDefaultTitle: {
        fr: "ᴍᴏᴅᴇ̀ʟᴇ ᴄᴀᴘᴄᴜᴛ",
        en: "ᴄᴀᴘᴄᴜᴛ ᴛᴇᴍᴘʟᴀᴛᴇ",
        wo: "Modèle capcut",
        ee: "Capcut nɔnɔmɛ",
        ln: "Modèle capcut",
        sw: "Kigezo cha capcut",
        zu: "Isibonelo se-capcut",
        ht: "Modèl capcut",
        hi: "कैपकट टेम्प्लेट"
    },
    capcutUnknownAuthor: {
        fr: "ɪɴᴄᴏɴɴᴜ",
        en: "ᴜɴᴋɴᴏᴡɴ",
        wo: "Xamul ko",
        ee: "Menya nyateƒe o",
        ln: "Eyebani te",
        sw: "Haijulikani",
        zu: "Azaziwa",
        ht: "Nekoni",
        hi: "अज्ञात"
    },
    capcutInvalidResponse: {
        fr: "ʀᴇ́ᴘᴏɴsᴇ ᴀᴘɪ ɪɴᴠᴀʟɪᴅᴇ.",
        en: "ɪɴᴠᴀʟɪᴅ ᴀᴘɪ ʀᴇsᴘᴏɴsᴇ.",
        wo: "Tontu api baaxul.",
        ee: "Api ɖoɖo menyo o.",
        ln: "Eyano ya api ezali malamu te.",
        sw: "Jibu la api si sahihi.",
        zu: "Impendulo ye-api ayilungile.",
        ht: "Repons api a pa valab.",
        hi: "अमान्य एपीआई प्रतिक्रिया।"
    },
    capcutDownloadFailed: {
        fr: "ᴇ́ᴄʜᴇᴄ ᴅᴜ ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ.",
        en: "ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ.",
        wo: "Njuumte ci download bi.",
        ee: "Mekpe ɖe download ŋu o.",
        ln: "Eboyi kotélécharger.",
        sw: "Imeshindikana kupakua.",
        zu: "Kuhlulekile ukulanda.",
        ht: "Echèk pou telechaje.",
        hi: "डाउनलोड करने में विफल।"
    },
    capcutTimeout: {
        fr: "ʟᴀ ʀᴇǫᴜᴇ̂ᴛᴇ ᴀ ᴇxᴘɪʀᴇ́.",
        en: "ʀᴇǫᴜᴇsᴛ ᴛɪᴍᴇᴅ ᴏᴜᴛ.",
        wo: "Waxtu bi jeex na.",
        ee: "Wɔɣi la nu vɔ.",
        ln: "Ntango esuki.",
        sw: "Muda wa ombi umeisha.",
        zu: "Isikhathi siphelile.",
        ht: "Tan an fini.",
        hi: "अनुरोध समाप्त हो गया।"
    },

    // ==========================================
    // COMMANDE CHATBOT (CHATBOT.JS)
    // ==========================================
    chatBotMenuTitle: {
        fr: "ᴍᴇɴᴜ ᴄʜᴀᴛʙᴏᴛ",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴍᴇɴᴜ",
        wo: "Menu chatbot",
        ee: "Chatbot menu",
        ln: "Menu chatbot",
        sw: "Menyu ya chatbot",
        zu: "Imenyu ye-chatbot",
        ht: "Meni chatbot",
        hi: "चैटबॉट मेनू"
    },
    chatBotOwnerOnly: {
        fr: "sᴇᴜʟ ʟᴇ ᴘʀᴏᴘʀɪᴇ́ᴛᴀɪʀᴇ ᴘᴇᴜᴛ ᴄᴏɴғɪɢᴜʀᴇʀ ᴄᴇᴛᴛᴇ ᴏᴘᴛɪᴏɴ.",
        en: "ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴄᴏɴғɪɢᴜʀᴇ ᴛʜɪs ᴏᴘᴛɪᴏɴ.",
        wo: "Borom bot bi rekk mën na defar option bi.",
        ee: "Ame si kpea ŋu la koe ate ŋu wɔ option sia ɖo.",
        ln: "Kaka nkolo akoki kobongisa option oyo.",
        sw: "Mmiliki pekee ndiye anayeweza kusanidi chaguo hili.",
        zu: "Umnikazi kuphela ongavula lokhu.",
        ht: "Sèl mèt la ki ka konfigure opsyon sa a.",
        hi: "केवल मालिक इस विकल्प को कॉन्फ़िगर कर सकता है।"
    },
    chatBotProvideKey: {
        fr: "ᴠᴇᴜɪʟʟᴇᴢ ғᴏᴜʀɴɪʀ ᴠᴏᴛʀᴇ ᴄʟᴇ́ ᴀᴘɪ ᴏᴘᴇɴʀᴏᴜᴛᴇʀ.",
        en: "ᴘʟᴇᴀsᴇ ᴘʀᴏ𝚟ɪᴅᴇ ʏᴏᴜʀ ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴀᴘɪ ᴋᴇʏ.",
        wo: "May ma sa clé api openrouter.",
        ee: "Na wò openrouter api key.",
        ln: "Pesa api key na yo ya openrouter.",
        sw: "Tafadhali toa ufunguo wako wa api wa openrouter.",
        zu: "Sicela unikeze ukhiye wakho we-api we-openrouter.",
        ht: "Tanpri bay kle api openrouter ou a.",
        hi: "कृपया अपनी ओपनरौटर एपीआई कुंजी प्रदान करें।"
    },
    chatBotKeyRegistered: {
        fr: "ᴄʟᴇ́ ᴀᴘɪ ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴇɴʀᴇɢɪsᴛʀᴇ́ᴇ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s ᴘᴏᴜʀ",
        en: "ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴀᴘɪ ᴋᴇʏ sᴜᴄᴄᴇssғᴜʟʟʏ ʀᴇɢɪsᴛᴇʀᴇᴅ ғᴏʀ",
        wo: "Clé api openrouter dugal na bu baax ngir",
        ee: "Openrouter api key ɖo edzi nyuie na",
        ln: "Api key ya openrouter ebakisami malamu pona",
        sw: "Ufunguo wa api wa openrouter umesajiliwa kwa mafanikio kwa",
        zu: "Ukhiye we-api we-openrouter ubhaliswe ngempumelelo ku",
        ht: "Kle api openrouter anrejistre ak siksè pou",
        hi: "ओपनरौटर एपीआई कुंजी सफलतापूर्वक पंजीकृत की गई"
    },
    chatBotKeyDeleted: {
        fr: "ᴄʟᴇ́ ᴀᴘɪ ᴘᴇʀsᴏɴɴᴀʟɪsᴇ́ᴇ sᴜᴘᴘʀɪᴍᴇ́ᴇ.",
        en: "ᴄᴜsᴛᴏᴍ ᴀᴘɪ ᴋᴇʏ ᴅᴇʟᴇᴛᴇᴅ.",
        wo: "Clé api bi far na ko.",
        ee: "Api key si nàtɔ ɖokuiwò la tutu.",
        ln: "Api key elongolami.",
        sw: "Ufunguo maalum wa api umefutwa.",
        zu: "Ukhiye we-api osuselwe ucishelwe.",
        ht: "Kle api pèsonalize a efase.",
        hi: "कस्टम एपीआई कुंजी हटा दी गई।"
    },
    chatBotDisabledMsg: {
        fr: "ᴄʜᴀᴛʙᴏᴛ ᴄᴏᴍᴘʟᴇ̀ᴛᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴄᴏᴍᴘʟᴇᴛᴇʟʏ ᴅɪsᴀʙʟᴇᴅ.",
        wo: "Chatbot fey na lépp.",
        ee: "Chatbot mewɔ ŋu kura o.",
        ln: "Chatbot elongolami mobimba.",
        sw: "Chatbot imezimwa kabisa.",
        zu: "I-chatbot ivaliwe ngokuphelele.",
        ht: "Chatbot la desaktive konplètman.",
        hi: "चैटबॉट पूरी तरह से अक्षम है।"
    },
    chatBotKeyNotConfigured: {
        fr: "ᴄʟᴇ́ ᴀᴘɪ ɴᴏɴ ᴄᴏɴғɪɢᴜʀᴇ́ᴇ",
        en: "ᴀᴘɪ ᴋᴇʏ ɴᴏᴛ ᴄᴏɴғɪɢᴜʀᴇᴅ",
        wo: "Clé api defarul ko",
        ee: "Api key mewɔ ɖo o",
        ln: "Api key ebongisami te",
        sw: "Ufunguo wa api haujasanidiwa",
        zu: "Ukhiye we-api awuvulwanga",
        ht: "Kle api pa konfigure",
        hi: "एपीआई कुंजी कॉन्फ़िगर नहीं की गई है"
    },
    chatBotStepGo: {
        fr: "ᴀʟʟᴇᴢ sᴜʀ openrouter.ai",
        en: "ɢᴏ ᴛᴏ openrouter.ai",
        wo: "Demal ci openrouter.ai",
        ee: "Yi openrouter.ai",
        ln: "Kende na openrouter.ai",
        sw: "Nenda kwenye openrouter.ai",
        zu: "Yiya ku-openrouter.ai",
        ht: "Ale sou openrouter.ai",
        hi: "openrouter.ai पर जाएं"
    },
    chatBotStepCreate: {
        fr: "ᴄʀᴇ́ᴇᴢ ᴜɴᴇ ɴᴏᴜᴠᴇʟʟᴇ ᴄʟᴇ́",
        en: "ᴄʀᴇᴀᴛᴇ ᴀ ɴᴇᴡ ᴋᴇʏ",
        wo: "Sos benn clé bu bees",
        ee: "Wɔ key yeyee",
        ln: "Sala key ya sika",
        sw: "Unda ufunguo mpya",
        zu: "Dala ukhiye omusha",
        ht: "Kreye yon nouvo kle",
        hi: "एक नई कुंजी बनाएं"
    },
    chatBotEnabledAll: {
        fr: "ᴄʜᴀᴛʙᴏᴛ ᴀᴄᴛɪᴠᴇ́ **ᴘᴀʀᴛᴏᴜᴛ** (ᴘʀɪᴠᴇ́ & ɢʀᴏᴜᴘᴇs).",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴇɴᴀʙʟᴇᴅ **ᴇᴠᴇʀʏᴡʜᴇʀᴇ** (ᴘʀɪᴠᴀᴛᴇ & ɢʀᴏᴜᴘs).",
        wo: "Chatbot tabal na **lépp** (privé & kureel yi).",
        ee: "Chatbot wɔ ŋu **teoɖe** (dotẽ & ƒome).",
        ln: "Chatbot ezali **epai nyonso** (private & bituluku).",
        sw: "Chatbot imewashwa **kila mahali** (binafsi na vikundi).",
        zu: "I-chatbot ivulwe **yonke indawo** (okuyimfihlo & amaqembu).",
        ht: "Chatbot aktive **pèch** (prive & gwoup).",
        hi: "चैटबॉट **हर जगह** सक्षम किया गया है (निजी और समूह)।"
    },
    chatBotEnabledPrivate: {
        fr: "ᴄʜᴀᴛʙᴏᴛ ᴀᴄᴛɪᴠᴇ́ **ᴜɴɪǫᴜᴇᴍᴇɴᴛ ᴇɴ ᴘʀɪᴠᴇ́**.",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴇɴᴀʙʟᴇᴅ **ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛs ᴏɴʟʏ**.",
        wo: "Chatbot tabal na **ci privé rekk**.",
        ee: "Chatbot wɔ ŋu **le dotẽ koe**.",
        ln: "Chatbot ezali **kaka na private**.",
        sw: "Chatbot imewashwa **kwa mazungumzo ya kibinafsi pekee**.",
        zu: "I-chatbot ivulwe **kwezingxoxo eziyimfihlo kuphela**.",
        ht: "Chatbot aktive **nan chat prive sèlman**.",
        hi: "चैटबॉट **केवल निजी चैट में** सक्षम किया गया है।"
    },
    chatBotEnabledAllGroups: {
        fr: "ᴄʜᴀᴛʙᴏᴛ ᴀᴄᴛɪᴠᴇ́ ᴅᴀɴs **ᴛᴏᴜs ʟᴇs ɢʀᴏᴜᴘᴇs**.",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴇɴᴀʙʟᴇᴅ ɪɴ **ᴀʟʟ ɢʀᴏᴜᴘs**.",
        wo: "Chatbot tabal na ci **lépp kureel yi**.",
        ee: "Chatbot wɔ ŋu le **ƒome katã me**.",
        ln: "Chatbot ezali na **bituluku nyonso**.",
        sw: "Chatbot imewashwa katika **vikundi vyote**.",
        zu: "I-chatbot ivulwe **kuwo wonke amaqembu**.",
        ht: "Chatbot aktive nan **tout gwoup yo**.",
        hi: "चैटबॉट **सभी समूहों में** सक्षम किया गया है।"
    },
    chatBotMustBeInGroup: {
        fr: "ᴄᴇᴛᴛᴇ sᴏᴜs-ᴄᴏᴍᴍᴀɴᴅᴇ ᴅᴏɪᴛ ᴇ̂ᴛʀᴇ ᴜᴛɪʟɪsᴇ́ᴇ ᴅᴀɴs ᴜɴ ɢʀᴏᴜᴘᴇ (ᴏᴜ ᴜᴛɪʟɪsᴇᴢ `{prefix}chatbot group all`).",
        en: "ᴛʜɪs sᴜʙᴄᴏᴍᴍᴀɴᴅ ᴍᴜsᴛ ʙᴇ ᴜsᴇᴅ ɪɴsɪᴅᴇ ᴀ ɢʀᴏᴜᴘ (ᴏʀ ᴜsᴇ `{prefix}chatbot group all`).",
        wo: "Sous-commande bi war na nekk ci kureel (wala jëfandikoo `{prefix}chatbot group all`).",
        ee: "Ele be woazã subcmd sia le ƒome me (alo zã `{prefix}chatbot group all`).",
        ln: "Subcommande oyo esengeli esalelama na etuluku (to sala `{prefix}chatbot group all`).",
        sw: "Subcommand hii lazima itumike ndani ya kikundi (au tumia `{prefix}chatbot group all`).",
        zu: "Le sub-command kumele isetshenziswe ngaphakathi kweqembu (noma sebenzisa `{prefix}chatbot group all`).",
        ht: "Sou-kòmand sa a dwe itilize nan yon gwoup (oswa itilize `{prefix}chatbot group all`).",
        hi: "इस उपकमांड का उपयोग समूह के भीतर किया जाना चाहिए (या `{prefix}chatbot group all` का उपयोग करें)।"
    },
    chatBotEnabledThisGroup: {
        fr: "ᴄʜᴀᴛʙᴏᴛ ᴀᴄᴛɪᴠᴇ́ ᴘᴏᴜʀ **ᴄᴇ ɢʀᴏᴜᴘᴇ sᴘᴇ́ᴄɪғɪǫᴜᴇ**.",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴇɴᴀʙʟᴇᴅ ғᴏʀ **ᴛʜɪs sᴘᴇᴄɪғɪᴄ ɢʀᴏᴜᴘ**.",
        wo: "Chatbot tabal na ngir **kureel bi rekk**.",
        ee: "Chatbot wɔ ŋu na **ƒome sia tɔ kpom**.",
        ln: "Chatbot ezali pona **etuluku oyo moko**.",
        sw: "Chatbot imewashwa kwa **kikundi hiki maalum**.",
        zu: "I-chatbot ivulwe **kulesi qembu elithile**.",
        ht: "Chatbot aktive pou **gwoup espesifik sa a**.",
        hi: "चैटबॉट **इस विशिष्ट समूह** के लिए सक्षम किया गया है।"
    },
    chatBotDisabledThisGroup: {
        fr: "ᴄʜᴀᴛʙᴏᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́ ᴘᴏᴜʀ ᴄᴇ ɢʀᴏᴜᴘᴇ sᴘᴇ́ᴄɪғɪǫᴜᴇ.",
        en: "ᴄʜᴀᴛʙᴏᴛ ᴅɪsᴀʙʟᴇᴅ ғᴏʀ ᴛʜɪs sᴘᴇᴄɪғɪᴄ ɢʀᴏᴜᴘ.",
        wo: "Chatbot fey na ngir kureel bi rekk.",
        ee: "Chatbot mewɔ ŋu o na ƒome sia tɔ kpom.",
        ln: "Chatbot elongolami pona etuluku oyo moko.",
        sw: "Chatbot imezimwa kwa kikundi hiki maalum.",
        zu: "I-chatbot ivaliwe kulesi qembu elithile.",
        ht: "Chatbot desaktive pou gwoup espesifik sa a.",
        hi: "चैटबॉट इस विशिष्ट समूह के लिए अक्षम किया गया है।"
    },
    chatBotError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ ʟ'ᴇxᴇ́ᴄᴜᴛɪᴏɴ ᴅᴜ ᴄʜᴀᴛʙᴏᴛ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴇxᴇᴄᴜᴛɪɴɢ ᴄʜᴀᴛʙᴏᴛ.",
        wo: "Njuumte am na ci defar chatbot bi.",
        ee: "Vodada dzɔ esime nɔ chatbot wɔm.",
        ln: "Mbuma mabe ebimi na bosaleli ya chatbot.",
        sw: "Kosa limetokea wakati wa kuendesha chatbot.",
        zu: "Kuvele iphutha ngesikhathi kuqaliswa i-chatbot.",
        ht: "Yon erè fèt pandan egzekisyon chatbot la.",
        hi: "चैटबॉट निष्पादित करते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE CHANNELID (CHANNELID.JS)
    // ==========================================
    channelIdInvalidLink: {
        fr: "ʟɪᴇɴ ᴅᴇ ᴄᴀɴᴀʟ ᴡʜᴀᴛsᴀᴘᴘ ɪɴᴠᴀʟɪᴅᴇ.",
        en: "ɪɴᴠᴀʟɪᴅ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ.",
        wo: "Lien canal whatsapp baaxul.",
        ee: "Whatsapp channel link menyo o.",
        ln: "Lien ya canal whatsapp ezali malamu te.",
        sw: "Kiungo cha kituo cha whatsapp si sahihi.",
        zu: "Ixhumano sesiteshi sika-whatsapp asilungile.",
        ht: "Lyen chanèl whatsapp la pa valab.",
        hi: "अमान्य व्हाट्सएप चैनल लिंक।"
    },
    channelIdFetchError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ʀᴇ́ᴄᴜᴘᴇ́ʀᴇʀ l'ɪᴅ ᴅᴜ ᴄᴀɴᴀʟ.",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ғᴇᴛᴄʜ ᴄʜᴀɴɴᴇʟ ɪᴅ.",
        wo: "Mënula jot id canal bi.",
        ee: "Mate ŋu kpɔ channel id la o.",
        ln: "Kokoka te kozwa id ya canal.",
        sw: "Haiwezekani kupata id ya kituo.",
        zu: "Akunakwenzeka ukuthola id yesiteshi.",
        ht: "Enposib pou jwenn id chanèl la.",
        hi: "चैनल आईडी प्राप्त करने में असमर्थ।"
    },
    channelIdSuccessTitle: {
        fr: "ɪᴅ ᴅᴜ ᴄᴀɴᴀʟ ᴡʜᴀᴛsᴀᴘᴘ",
        en: "ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ ɪᴅ",
        wo: "Id canal whatsapp",
        ee: "Whatsapp channel id",
        ln: "Id ya canal whatsapp",
        sw: "Id ya kituo cha whatsapp",
        zu: "Id yesiteshi sika-whatsapp",
        ht: "Id chanèl whatsapp",
        hi: "व्हाट्सएप चैनल आईडी"
    },
    channelIdGeneralError: {
        fr: "ᴇʀʀᴇᴜʀ ʟᴏʀs ᴅᴇ ʟᴀ ʀᴇ́ᴄᴜᴘᴇ́ʀᴀᴛɪᴏɴ ᴅᴇ l'ɪᴅ ᴅᴜ ᴄᴀɴᴀʟ",
        en: "ᴇʀʀᴏʀ ᴡʜɪʟᴇ ʀᴇᴛʀɪᴇᴠɪɴɢ ᴄʜᴀɴɴᴇʟ ɪᴅ",
        wo: "Njuumte bi mu ngi jot id canal bi",
        ee: "Vodada esime nɔ channel id dim",
        ln: "Mbuma mabe ntango ezali kozwa id ya canal",
        sw: "Kosa wakati wa kupata id ya kituo",
        zu: "Iphutha ngenkathi kutholakala id yesiteshi",
        ht: "Erè pandan y ap jwenn id chanèl la",
        hi: "चैनल आईडी पुनर्प्राप्त करते समय त्रुटि"
    },

    // ==========================================
    // COMMANDE COMPLIMENT (COMPLIMENT.JS)
    // ==========================================
    complimentUsage: {
        fr: "ᴜsᴀɢᴇ : ᴍᴇɴᴛɪᴏɴɴᴇᴢ quelqu’un ou répondez à son message pour lui faire un compliment !",
        en: "ᴜsᴀɢᴇ: ᴍᴇɴᴛɪᴏɴ sᴏᴍᴇᴏɴᴇ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴛʜᴇɪʀ ᴍᴇssᴀɢᴇ ᴛᴏ ɢɪᴠᴇ ᴀ ᴄᴏᴍᴘʟɪᴍᴇɴْت!",
        wo: "Jëfandikoo: Téglal nit ki wala tontul message bi ngir sédal ko!",
        ee: "Zazã: Ƒo nu kple ame alo ɖo ɖe eƒe gbedeɖiɖi ŋu tsɔ kafui!",
        ln: "Bosaleli: Koloba na moto to pesa eyano na ye mpo na kopesa y’elengi!",
        sw: "Matumizi: Taja mtu au jibu ujumbe wake ili kumsifu!",
        zu: "Ukusetshenziswa: Khuluma nomuntu noma phendula umlayezo wakhe ukuze umbonise uthando!",
        ht: "Itilizasyon: Mansyonnen yon moun oswa reponn mesaj li a pou fè l yon konpliman!",
        hi: "उपयोग: किसी को मेंशन करें या उसकी तारीफ करने के लिए उसके संदेश का उत्तर दें!"
    },
    complimentError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴇ l'ᴇɴᴠᴏɪ ᴅᴜ ᴄᴏᴍᴘʟɪᴍᴇɴᴛ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ sᴇɴᴅɪɴɢ ᴛʜᴇ ᴄᴏᴍᴘʟɪᴍᴇɴᴛ.",
        wo: "Njuumte am na ci yónni compliment bi.",
        ee: "Vodada dzɔ esime nɔ kafukafu ɖem ɖe ga.",
        ln: "Mbuma mabe ebimi ntango bazali kotinda compliment.",
        sw: "Kosa limetokea wakati wa kutuma sifa.",
        zu: "Kuvele iphutha ngesikhathi kuthunyelwa ukuncoma.",
        ht: "Yon erè fèt pandan y ap voye konpliman an.",
        hi: "तारीफ भेजते समय एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE DELPREFIX (DELPREFIX.JS)
    // ==========================================
    delPrefixMenuTitle: {
        fr: "ɢᴇsᴛɪᴏɴ ᴅᴜ ᴘʀᴇ́ғɪxᴇ",
        en: "ᴘʀᴇғɪx ᴍᴀɴᴀɢᴇᴍᴇɴᴛ",
        wo: "Teeytu perefis",
        ee: "Prefix dzi kpɔkpɔ",
        ln: "Bosungisi ya prefi",
        sw: "Usimamizi wa prefix",
        zu: "Ukuphathwa kwe-prefix",
        ht: "Jesyon prefiks",
        hi: "प्रिफ़िक्स प्रबंधन"
    },
    delPrefixCurrentLabel: {
        fr: "ᴘʀᴇ́ғɪxᴇ ᴀᴄᴛᴜᴇʟ",
        en: "ᴄᴜʀʀᴇɴᴛ ᴘʀᴇғɪx",
        wo: "Perefis bi tay",
        ee: "Prefix si le",
        ln: "Prefi ya sikoyo",
        sw: "Prefix ya sasa",
        zu: "I-prefix yamanje",
        ht: "Prefiks aktyèl",
        hi: "वर्तमान प्रिफ़िक्स"
    },
    delPrefixModeLabel: {
        fr: "ᴍᴏᴅᴇ sᴀɴs-ᴘʀᴇ́ғɪxᴇ",
        en: "ɴᴏ-ᴘʀᴇғɪx ᴍᴏᴅᴇ",
        wo: "Mode teeyul perefis",
        ee: "Prefix manɔ nɔnɔmɛ",
        ln: "Lolenge ya kozanga prefi",
        sw: "Hali ya bila prefix",
        zu: "Imodi engenayo i-prefix",
        ht: "Mòd san prefiks",
        hi: "बिना-प्रिफ़िक्स मोड"
    },
    delPrefixEnabledMsg: {
        fr: "ᴘʀᴇ́ғɪxᴇ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́ (ᴍᴏᴅᴇ sᴀɴs-ᴘʀᴇ́ғɪxᴇ ᴀᴄᴛɪғ).",
        en: "ᴘʀᴇғɪx ᴅɪsᴀʙʟᴇᴅ (ɴᴏ-ᴘʀᴇғɪx ᴍᴏᴅᴇ ᴀᴄᴛɪᴠᴇ).",
        wo: "Perefis fey na (Mode téeyul perefis tabal na).",
        ee: "Prefix mewɔ ŋu o (Prefix manɔ nɔnɔmɛ le dɔ wɔm).",
        ln: "Prefi elongolami (Lolenge ya kozanga prefi ezali).",
        sw: "Prefix imezimwa (Hali ya bila prefix inafanya kazi).",
        zu: "I-prefix ivaliwe (Imodi engenayo i-prefix iyasebenza).",
        ht: "Prefiks desaktive (Mòd san prefiks aktif).",
        hi: "प्रिफ़िक्स अक्षम किया गया (बिना-प्रिफ़िक्स मोड सक्रिय)।"
    },
    delPrefixEnabledSub: {
        fr: "ᴠᴏᴜs ᴘᴏᴜᴠᴇᴢ ᴍᴀɪɴᴛᴇɴᴀɴᴛ ᴇ́ᴄʀɪʀᴇ ᴠᴏs ᴄᴏᴍᴍᴀɴᴅᴇs sᴀɴs ᴘʀᴇ́ғɪxᴇ (ᴇx : ᴍᴇɴᴜ).",
        en: "ʏᴏᴜ ᴄᴀɴ ɴᴏᴡ ᴛʏᴘᴇ ʏᴏᴜʀ ᴄᴏᴍᴍᴀɴᴅs ᴡɪᴛʜᴏᴜᴛ ᴀɴʏ ᴘʀᴇғɪx (ᴇ.ɢ., ᴍᴇɴᴜ).",
        wo: "Mën nga bind sa command yi te du jëfandikoo perefis (ex: menu).",
        ee: "Àte ŋu aŋlɔ wò commandwo manɔ prefix o (ex: menu).",
        ln: "Okoki sikoyo kokoma ba command na yo kozanga prefi (ex: menu).",
        sw: "Sasa unaweza kuandika amri zako bila prefix yoyote (mf. menu).",
        zu: "Manje ungabhala imiyalo yakho ngaphandle kwe-prefix (isb. menu).",
        ht: "Ou ka ekri kòmand ou yo san okenn prefiks kounye a (eg., menu).",
        hi: "अब आप बिना किसी प्रिफ़िक्स के अपनी कमांड लिख सकते हैं (उदा., menu)।"
    },
    delPrefixDisabledMsg: {
        fr: "ᴘʀᴇ́ғɪxᴇ ʀᴇsᴛᴀᴜʀᴇ́.",
        en: "ᴘʀᴇғɪx ʀᴇsᴛᴏʀᴇᴅ.",
        wo: "Perefis dellu na.",
        ee: "Prefix trɔ gbɔ.",
        ln: "Prefi ezongi.",
        sw: "Prefix imerejeshwa.",
        zu: "I-prefix ibuyisiwe.",
        ht: "Prefiks restore.",
        hi: "प्रिफ़िक्स पुनर्स्थापित किया गया।"
    },
    delPrefixDisabledSub: {
        fr: "ʟᴇs ᴄᴏᴍᴍᴀɴᴅᴇs ɴᴇᴄᴇssɪᴛᴇɴᴛ ᴍᴀɪɴᴛᴇɴᴀɴᴛ ʟᴇ ᴘʀᴏᴄʜᴀɪɴ ᴘʀᴇ́ғɪxᴇ `{prefix}` (ᴇx : `{prefix}ᴍᴇɴᴜ`).",
        en: "ᴄᴏᴍᴍᴀɴᴅs ɴᴏᴡ ʀᴇǫᴜɪʀᴇ ᴛʜᴇ ᴘʀᴇғɪx `{prefix}` (ᴇ.ɢ., `{prefix}ᴍᴇɴᴜ`).",
        wo: "Command yi laaj nañu perefis bi `{prefix}` (ex: `{prefix}menu`).",
        ee: "Commandwo hiã prefix `{prefix}` fifia (ex: `{prefix}menu`).",
        ln: "Ba command esengi sikoyo prefi `{prefix}` (ex: `{prefix}menu`).",
        sw: "Amri sasa zinahitaji prefix `{prefix}` (mf. `{prefix}menu`).",
        zu: "Imiyalo manje idinga i-prefix `{prefix}` (isb. `{prefix}menu`).",
        ht: "Kòmand yo mande kounye a prefiks `{prefix}` (eg., `{prefix}menu`).",
        hi: "कमांड के लिए अब प्रिफ़िक्स `{prefix}` की आवश्यकता है (उदा., `{prefix}menu`)।"
    },
    delPrefixError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ",
        wo: "Njuumte am na",
        ee: "Vodada dzɔ",
        ln: "Mbuma mabe ebimi",
        sw: "Kosa limetokea",
        zu: "Kuvele iphutha",
        ht: "Yon erè fèt",
        hi: "एक त्रुटि हुई"
    },

    // ==========================================
    // COMMANDE PPGROUP (PPGROUP.JS)
    // ==========================================
    ppGroupReplyInstruction: {
        fr: "ʀᴇ́ᴘᴏɴᴅᴇᴢ ᴀ̀ ᴜɴᴇ ɪᴍᴀɢᴇ",
        en: "reply to an image",
        wo: "Tontul benn image",
        ee: "Ðo ɖe nɔnɔmɛ ŋu",
        ln: "Pesa eyano na elilingi",
        sw: "Jibu picha",
        zu: "Phendula isithombe",
        ht: "Reponn yon imaj",
        hi: "एक छवि का उत्तर दें"
    },
    ppGroupDownloading: {
        fr: "ᴛᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴇᴛ ᴍɪsᴇ ᴀ̀ ᴊᴏᴜʀ ᴅᴇ l'ɪᴍᴀɢᴇ ᴅᴜ ɢʀᴏᴜᴘᴇ...",
        en: "Downloading and updating the group image...",
        wo: "Di download ak yeesal image kureel bi...",
        ee: "Le ƒome ƒe nɔnɔmɛ ɖem eye le yeyem...",
        ln: "Azali kotélécharger mpe kobongisa elilingi ya etuluku...",
        sw: "Inapakua na kusasisha picha ya kikundi...",
        zu: "Ilanda futhi ivuselela isithombe seqembu...",
        ht: "Ap telechaje epi mete ajou imaj gwoup la...",
        hi: "समूह छवि डाउनलोड और अपडेट की जा रही है..."
    },
    ppGroupDownloadFailed: {
        fr: "ᴇ́ᴄʜᴇᴄ ᴅᴜ tᴇ́ʟᴇ́ᴄʜᴀʀɢᴇᴍᴇɴᴛ ᴅᴇ l'ɪᴍᴀɢᴇ.",
        en: "Failed to download the image.",
        wo: "Njuumte ci download image bi.",
        ee: "Mekpe ɖe nɔnɔmɛ la download ŋu o.",
        ln: "Eboyi kotélécharger elilingi.",
        sw: "Imeshindikana kupakua picha.",
        zu: "Kuhlulekile ukulanda isithombe.",
        ht: "Echèk pou telechaje imaj la.",
        hi: "छवि डाउनलोड करने में विफल।"
    },
    ppGroupSuccessContent: {
        fr: "ʟᴀ ᴘʜᴏᴛᴏ ᴅᴇ ᴘʀᴏғɪʟ ᴅᴜ ɢʀᴏᴜᴘᴇ ᴀ ᴇ́ᴛᴇ́ ᴍɪsᴇ ᴀ̀ ᴊᴏᴜʀ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !",
        en: "The group profile picture has been successfully updated!",
        wo: "Photo de profil kureel bi yeesal na bu baax!",
        ee: "Ƒome ƒe profil nɔnɔmɛ la ɖo ɖe edzi nyuie!",
        ln: "Elilingi ya profil ya etuluku ebongwami malamu!",
        sw: "Picha ya wasifu wa kikundi imesasishwa kwa mafanikio!",
        zu: "Isithombe sephrofayela seqembu sivuselelwe ngempumelelo!",
        ht: "Imaj pwofil gwoup la mete ajou ak siksè!",
        hi: "समूह प्रोफ़ाइल चित्र सफलतापूर्वक अपडेट किया गया!"
    },
    ppGroupSuccessTitle: {
        fr: "ɪᴍᴀɢᴇ ᴅᴜ ɢʀᴏᴜᴘᴇ ᴍɪsᴇ ᴀ̀ ᴊᴏᴜʀ",
        en: "Group Image Updated",
        wo: "Image kureel bi yeesal na",
        ee: "Ƒome nɔnɔmɛ yeyee",
        ln: "Elilingi ya etuluku ebongwami",
        sw: "Picha ya kikundi imesasishwa",
        zu: "Isithombe seqembu sivuselelwe",
        ht: "Imaj gwoup mete ajou",
        hi: "समूह छवि अपडेट की गई"
    },
    ppGroupError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ",
        en: "An error occurred",
        wo: "Njuumte am na",
        ee: "Vodada dzɔ",
        ln: "Mbuma mabe ebimi",
        sw: "Kosa limetokea",
        zu: "Kuvele iphutha",
        ht: "Yon erè fèt",
        hi: "एक त्रुटि हुई"
    },

    // ==========================================
    // COMMANDE GROUPNAME (GROUPNAME.JS)
    // ==========================================
    groupNameUsagePlaceholder: {
        fr: "ɴᴏᴜᴠᴇᴀᴜ ɴᴏᴍ",
        en: "NewName",
        wo: "Tur bu bees",
        ee: "Ŋkɔ yeyee",
        ln: "Kombo ya sika",
        sw: "Jina jipya",
        zu: "Igama elisha",
        ht: "Nouvo non",
        hi: "नया नाम"
    },
    groupNameSuccess: {
        fr: "ʟᴇ ɴᴏᴍ ᴅᴜ ɢʀᴏᴜᴘᴇ ᴀ ᴇ́ᴛᴇ́ ᴍᴏᴅɪғɪᴇ́ ᴇɴ",
        en: "Group name changed to",
        wo: "Tur kureel bi soppiku na ci",
        ee: "Ƒome ŋkɔ trɔ zu",
        ln: "Kombo ya etuluku ebongwami na",
        sw: "Jina la kikundi limebadilishwa kuwa",
        zu: "Igama leqembu lishintshwe laba",
        ht: "Non gwoup la chanje an",
        hi: "समूह का नाम बदलकर कर दिया गया है"
    },
    groupNameError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ᴍᴏᴅɪғɪᴇʀ ʟᴇ ɴᴏᴍ ᴅᴜ ɢʀᴏᴜᴘᴇ. ᴀssᴜʀᴇᴢ-ᴠᴏᴜs ǫᴜᴇ ᴊᴇ sᴜɪs ᴀᴅᴍɪɴɪsᴛʀᴀᴛᴇᴜʀ.",
        en: "Unable to change the group name. Make sure I am an admin.",
        wo: "Mënula soppi tur kureel bi. Seetal bu baax ne ma ngi nekk kilifa.",
        ee: "Mate ŋu trɔ ƒome ŋkɔ o. Kpɔ ɖa be nye dɔdzikpɔla.",
        ln: "Kokoka te kobongisa kombo ya etuluku. Tala ete nazali mokonzi.",
        sw: "Haiwezekani kubadilisha jina la kikundi. Hakikisha mimi ni msimamizi.",
        zu: "Akunakwenzeka ukushintsha igama leqembu. Qinisekisa ukuthi ngiwumphathi.",
        ht: "Enposib pou chanje non gwoup la. Asire w ke mwen se yon administratè.",
        hi: "समूह का नाम बदलने में असमर्थ। सुनिश्चित करें कि मैं प्रशासक हूँ।"
    },

    // ==========================================
    // COMMANDE KICK (KICK.JS)
    // ==========================================
    kickUsagePlaceholder: {
        fr: "@utilisateur ou répondre au message",
        en: "@user or reply to message",
        wo: "@nit ki wala tontul message bi",
        ee: "@ame alo ɖo ɖe gbedeɖiɖi ŋu",
        ln: "@moto to pesa eyano na mikanda",
        sw: "@mtumiaji au jibu ujumbe",
        zu: "@umsebenzisi noma phendula umlayezo",
        ht: "@itilizatè oswa reponn mesaj la",
        hi: "@उपयोगकर्ता या संदेश का उत्तर दें"
    },
    kickCannotAdmin: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ d'ᴇxᴘᴜʟsᴇʀ ᴜɴ **ᴀᴅᴍɪɴɪsᴛʀᴀᴛᴇᴜʀ**.",
        en: "Cannot kick an *Admin*.",
        wo: "Mënula ganeel **kilifa**.",
        ee: "Mate ŋu gbe ɖe aga **dɔdzikpɔla** o.",
        ln: "Kokoka te kobengana **mokonzi**.",
        sw: "Haiwezekani kumfukuza **msimamizi**.",
        zu: "Akunakwenzeka ukuxosha **umphathi**.",
        ht: "Enposib pou met yon **administratè** deyò.",
        hi: "किसी **प्रशासक** को बाहर नहीं निकाला जा सकता।"
    },
    kickError: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ sᴜᴘᴘʀɪᴍᴇʀ ᴄᴇ ᴍᴇᴍʙʀᴇ",
        en: "Unable to remove this member",
        wo: "Mënula far bokk bi",
        ee: "Mate ŋu kpe ɖe ame sia ŋu o",
        ln: "Kokoka te kolongola mopalani oyo",
        sw: "Haiwezekani kumwondoa mwanachama huyu",
        zu: "Akunakwenzeka ukususa lelilungu",
        ht: "Enposib pou retire manm sa a",
        hi: "इस सदस्य को हटाने में असमर्थ"
    },

    // ==========================================
    // COMMANDE ONLINE (ONLINE.JS)
    // ==========================================
    onlineMenuTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴇɴ ʟɪɢɴᴇ",
        en: "online status",
        wo: "Statut online",
        ee: "Online nɔnɔmɛ",
        ln: "Ezaleli ya online",
        sw: "Hali ya online",
        zu: "Isimo se-online",
        ht: "Estati an liy",
        hi: "ऑनलाइन स्थिति"
    },
    onlineStatusLabel: {
        fr: "sᴛᴀᴛᴜᴛ",
        en: "status",
        wo: "Statut",
        ee: "Nɔnɔmɛ",
        ln: "Ezaleli",
        sw: "Hali",
        zu: "Isimo",
        ht: "Estati",
        hi: "स्थिति"
    },
    onlineEnabledMsg: {
        fr: "ᴍᴏᴅᴇ ᴇɴ ʟɪɢɴᴇ ᴀᴄᴛɪᴠᴇ́.",
        en: "Online mode enabled.",
        wo: "Mode online tabal na.",
        ee: "Online mode wɔ ŋu.",
        ln: "Mode online ezali.",
        sw: "Hali ya online imewashwa.",
        zu: "Imodi ye-online ivulwe.",
        ht: "Mòd an liy aktive.",
        hi: "ऑनलाइन मोड सक्षम किया गया।"
    },
    onlineDisabledMsg: {
        fr: "ᴍᴏᴅᴇ ᴇɴ ʟɪɢɴᴇ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "Online mode disabled.",
        wo: "Mode online fey na.",
        ee: "Online mode mewɔ ŋu o.",
        ln: "Mode online elongolami.",
        sw: "Hali ya online imezimwa.",
        zu: "Imodi ye-online ivaliwe.",
        ht: "Mòd an liy desaktive.",
        hi: "ऑनलाइन मोड अक्षम किया गया।"
    },
    onlineError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ",
        en: "An error occurred",
        wo: "Njuumte am na",
        ee: "Vodada dzɔ",
        ln: "Mbuma mabe ebimi",
        sw: "Kosa limetokea",
        zu: "Kuvele iphutha",
        ht: "Yon erè fèt",
        hi: "एक त्रुटि हुई"
    },

    // ==========================================
    // COMMANDE PAIR (PAIR.JS)
    // ==========================================
    pairMenuTitle: {
        fr: "ᴀɪᴅᴇ ᴀᴜ ᴊᴜᴍᴇʟᴀɢᴇ",
        en: "ᴘᴀɪʀɪɴɢ ʜᴇʟᴘ",
        wo: "Dimbalu jumelage",
        ee: "Paired kpekpeɖeŋu",
        ln: "Lisungi ya pairing",
        sw: "Msaada wa pairing",
        zu: "Usizo lwe-pairing",
        ht: "Èd appari",
        hi: "पेयरिंग सहायता"
    },
    pairRulePlus: {
        fr: "ɴ'ɪɴᴄʟᴜᴇᴢ **ᴘᴀs** \`+\`.",
        en: "ᴅᴏ **ɴᴏᴛ** ɪɴᴄʟᴜᴅᴇ \`+\`.",
        wo: "Bugal **bul** duggale \`+\`.",
        ee: "Megawo **gbe** \`+\` o.",
        ln: "Kotisa **te** \`+\`.",
        sw: "Usijumuishe **kamwe** \`+\`.",
        zu: "Ungafaki **neze** \`+\`.",
        ht: "Pa enkli **pa** \`+\`.",
        hi: "शामिल **न करें** \`+\`।"
    },
    pairRuleDigits: {
        fr: "ᴇɴᴛʀᴇz ᴜɴɪǫᴜᴇᴍᴇɴᴛ ᴅᴇs ᴄʜɪғғʀᴇs.",
        en: "ᴇɴᴛᴇʀ ᴏɴʟʏ ᴅɪɢɪᴛs.",
        wo: "Dugalal chiffre rekk.",
        ee: "Tsɔ xexlẽme koe ɖo.",
        ln: "Kota kaka ba chiffres.",
        sw: "Ingiza nambari pekee.",
        zu: "Faka izinombolo kuphela.",
        ht: "Antre sèlman chif.",
        hi: "केवल अंक दर्ज करें।"
    },
    pairExampleLabel: {
        fr: "ᴇxᴇᴍᴘʟᴇ",
        en: "ᴇxᴀᴍᴘʟᴇ",
        wo: "Exemple",
        ee: "Kpɔɖeŋu",
        ln: "Ntembe",
        sw: "Mfano",
        zu: "Isibonelo",
        ht: "Egzanp",
        hi: "उदाहरण"
    },
    pairInvalidTitle: {
        fr: "ɴᴜᴍᴇ́ʀᴏ ɪɴᴠᴀʟɪᴅᴇ",
        en: "ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ",
        wo: "Numero baaxul",
        ee: "Numero menyo o",
        ln: "Numero ezali malamu te",
        sw: "Nambari si sahihi",
        zu: "Inombolo ayilungile",
        ht: "Nimewo pa valab",
        hi: "अमान्य नंबर"
    },
    pairServerBusyTitle: {
        fr: "sᴇʀᴠᴇᴜʀ ᴏᴄᴄᴜᴘᴇ́",
        en: "sᴇʀᴠᴇʀ ʙᴜsʏ",
        wo: "Server dafa busy",
        ee: "Server le dɔ wɔm",
        ln: "Serveur ezali na misala",
        sw: "Server iko busy",
        zu: "I-server imatasatasa",
        ht: "Sèvè a okipe",
        hi: "सर्वर व्यस्त है"
    },
    pairServerBusyMsg: {
        fr: "ᴠᴇᴜɪʟʟᴇᴢ ᴘᴀᴛɪᴇɴᴛᴇʀ *{remaining} sᴇᴄᴏɴᴅᴇs* ᴀᴠᴀɴᴛ ᴅᴇ ʀᴇ́ᴇssᴀʏᴇʀ.",
        en: "ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ *{remaining} sᴇᴄᴏɴᴅs* ʙᴇғᴏʀᴇ ʀᴇᴛʀʏɪɴɢ.",
        wo: "Xaral *{remaining} secondes* ba mu yagg ngadellu.",
        ee: "Taflatse lée ɖe te *{remaining} seconds* hafi nàgagbe.",
        ln: "Pesa ntango *{remaining} secondes* liboso ya komeka lisusu.",
        sw: "Tafadhali subiri *{remaining} sekunde* kabla ya kujaribu tena.",
        zu: "Sicela ulinde *{remaining} amasekhondi* ngaphambi kokuzama futhi.",
        ht: "Tanpri rete *{remaining} segonn* anvan w eseye ankò.",
        hi: "पुनः प्रयास करने से पहले कृपया *{remaining} सेकंड* प्रतीक्षा करें।"
    },
    pairBusyTitle: {
        fr: "ᴏᴄᴄᴜᴘᴇ́",
        en: "ʙᴜsʏ",
        wo: "Dafa busy",
        ee: "Le dɔ wɔm",
        ln: "Na misala",
        sw: "Busy",
        zu: "Matasatasa",
        ht: "Okipe",
        hi: "व्यस्त"
    },
    pairBusyMsg: {
        fr: "ᴜɴ ᴀᴜᴛʀᴇ ʙᴏᴛ ɢᴇ́ɴᴇ̀ʀᴇ ᴅᴇ́ᴊᴀ̀ ᴜɴ ᴄᴏᴅᴇ.",
        en: "ᴀɴᴏthᴇʀ ʙᴏᴛ ɪs ᴀʟʀᴇᴀᴅʏ ɢᴇɴᴇʀᴀᴛɪɴɢ ᴀ ᴄᴏᴅᴇ.",
        wo: "Beneen bot di sos code bi ba tay.",
        ee: "Bot bubu le code ɖem xoxo.",
        ln: "Bot mosusu ezali kosala code sikoyo.",
        sw: "Bot nyingine tayari inazalisha nambari ya siri.",
        zu: "Enye i-bot isivele ikhiqiza ikhodi.",
        ht: "Yon lòt bot deja ap jenere yon kòd.",
        hi: "एक अन्य बॉट पहले से ही कोड जेनरेट कर रहा है।"
    },
    pairGenerating: {
        fr: "ɢᴇ́ɴᴇ́ʀᴀᴛɪᴏɴ ᴅᴜ ᴄᴏᴅᴇ ᴅᴇ ᴊᴜᴍᴇʟᴀɢᴇ...",
        en: "ɢᴇ́ɴᴇ́ʀᴀᴛɪᴏɴ ᴅᴜ ᴄᴏᴅᴇ ᴅᴇ ᴊᴜᴍᴇʟᴀɢᴇ...",
        wo: "Di sos code jumelage bi...",
        ee: "Pairing code ɖem...",
        ln: "Ezali kosala code ya pairing...",
        sw: "Inazalisha nambari ya pairing...",
        zu: "Ikhiqiza ikhodi ye-pairing...",
        ht: "Ap jenere kòd appari a...",
        hi: "पेयरिंग कोड जेनरेट किया जा रहा है..."
    },
    pairCodeLabel: {
        fr: "🔑 *ᴄᴏᴅᴇ",
        en: "🔑 *ᴄᴏᴅᴇ",
        wo: "🔑 *Code",
        ee: "🔑 *Code",
        ln: "🔑 *Code",
        sw: "🔑 *Nambari",
        zu: "🔑 *Ikhodi",
        ht: "🔑 *Kòd",
        hi: "🔑 *कोड"
    },
    pairTimeoutTitle: {
        fr: "ᴇ́ᴄʜᴇᴄ ᴅᴇ́ʟᴀɪ ᴅᴇ́ᴘᴀssᴇ́",
        en: "ᴛɪᴍᴇᴏᴜᴛ",
        wo: "Delai jeex na",
        ee: "Wɔɣi nu vɔ",
        ln: "Ntango esuki",
        sw: "Muda umeisha",
        zu: "Isikhathi siphelile",
        ht: "Tan an fini",
        hi: "समय समाप्त"
    },
    pairTimeoutMsg: {
        fr: "ʟᴀ ɢᴇ́ɴᴇ́ʀᴀᴛɪᴏɴ ᴅᴜ ᴄᴏᴅᴇ ᴀ ᴇxᴘɪʀᴇ́.",
        en: "ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ ɢᴇɴᴇʀᴀᴛɪᴏɴ ᴛɪᴍᴇᴅ ᴏᴜᴛ.",
        wo: "Sos code bi jeex na.",
        ee: "Pairing code ɖeɖe nu vɔ.",
        ln: "Bosala ya code esuki.",
        sw: "Uzalishaji wa nambari ya pairing umeisha muda.",
        zu: "Ukukhiqizwa kwekhodi ye-pairing kuphelelwe yisikhathi.",
        ht: "Jenerasyon kòd appari a ekspire.",
        hi: "पेयरिंग कोड जनरेशन का समय समाप्त हो गया।"
    },
    pairError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ ʟᴏʀs ᴅᴜ ᴊᴜᴍᴇʟᴀɢᴇ",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴅᴜʀɪɴɢ ᴘᴀɪʀɪɴɢ",
        wo: "Njuumte am na ci jumelage bi",
        ee: "Vodada dzɔ esime nɔ pairing wɔm",
        ln: "Mbuma mabe ebimi na pairing",
        sw: "Kosa limetokea wakati wa pairing",
        zu: "Kuvele iphutha ngesikhathi se-pairing",
        ht: "Yon erè fèt pandan appari a",
        hi: "पेयरिंग के दौरान एक त्रुटि हुई"
    },

    // ==========================================
    // COMMANDE PHOTO (PHOTO.JS)
    // ==========================================
    photoUsage: {
        fr: "ᴜsᴀɢᴇ : ʀᴇ́ᴘᴏɴᴅᴇᴢ ᴀ̀ ᴜɴ sᴛɪᴄᴋᴇʀ ᴀᴠᴇᴄ {prefix}ᴘʜᴏᴛᴏ",
        en: "ᴜsᴀɢᴇ: ʀᴇᴘʟʏ ᴛᴏ ᴀ sᴛɪᴄᴋᴇʀ ᴡɪᴛ🇭 {prefix}ᴘʜᴏᴛᴏ",
        wo: "Jëfandikoo: Tontul benn sticker ak {prefix}photo",
        ee: "Zazã: Ɖo ɖe sticker ŋu kple {prefix}photo",
        ln: "Bosaleli: Pesa eyano na sticker na {prefix}photo",
        sw: "Matumizi: Jibu sticker na {prefix}photo",
        zu: "Ukusetshenziswa: Phendula isitikha nge-{prefix}photo",
        ht: "Itilizasyon: Reponn yon fichye ak {prefix}photo",
        hi: "उपयोग: `{prefix}photo` के साथ स्टिकर का उत्तर दें"
    },
    photoCorrupted: {
        fr: "ɪᴍᴘᴏssɪʙʟᴇ ᴅᴇ ʟɪʀᴇ ᴄᴇ sᴛɪᴄᴋᴇʀ (ᴄᴏʀʀᴏᴍᴘᴜ ᴏᴜ ɪɴᴠᴀʟɪᴅᴇ).",
        en: "ᴜɴᴀʙʟᴇ ᴛᴏ ʀᴇᴀᴅ ᴛʜɪs sᴛɪᴄᴋᴇʀ (ᴄᴏʀʀᴜᴘᴛᴇᴅ ᴏʀ ɪɴᴠᴀʟɪᴅ).",
        wo: "Mënula jang sticker bi (dafa corrupt wala baaxul).",
        ee: "Mate ŋu xla sticker sia o (gblẽ alo menyo o).",
        ln: "Kokoka te kotanga sticker oyo (ebebi to ezali malamu te).",
        sw: "Haiwezekani kusoma sticker hii (imeharibika au si sahihi).",
        zu: "Akunakwenzeka ukufunda lesi sitikha (sonakele noma asilungile).",
        ht: "Enposib pou li fichye sa a (koronpi oswa pa valab).",
        hi: "इस स्टिकर को पढ़ने में असमर्थ (भ्रष्ट या अमान्य)।"
    },
    photoSuccess: {
        fr: "sᴛɪᴄᴋᴇʀ ᴄᴏɴᴠᴇʀᴛɪ ᴇɴ ᴘɴɢ.",
        en: "sᴛɪᴄᴋᴇʀ ᴄᴏɴᴠᴇʀᴛᴇᴅ ᴛᴏ ᴘɴɢ.",
        wo: "Sticker soppiku na ci png.",
        ee: "Sticker trɔ zu png.",
        ln: "Sticker ebongwami na png.",
        sw: "Sticker imebadilishwa kuwa png.",
        zu: "Isitikha sishintshwe saba yisimo se-png.",
        ht: "Fichye konvèti an png.",
        hi: "स्टिकर PNG में परिवर्तित हो गया।"
    },
    photoError: {
        fr: "ᴇʀʀᴇᴜʀ ʟᴏʀs ᴅᴇ ʟᴀ ᴄᴏɴᴠᴇʀsɪᴏɴ ᴅᴜ sᴛɪᴄᴋᴇʀ.",
        en: "ᴇʀʀᴏʀ ᴡʜɪʟᴇ ᴄᴏɴᴠᴇʀᴛɪɴɢ ᴛʜᴇ sᴛɪᴄᴋᴇʀ.",
        wo: "Njuumte ci soppiku sticker bi.",
        ee: "Vodada esime nɔ sticker trɔm.",
        ln: "Mbuma mabe ntango ezali kobongola sticker.",
        sw: "Kosa wakati wa kubadilisha sticker.",
        zu: "Iphutha ngenkathi kuguqulwa isitikha.",
        ht: "Erè pandan konvèsyon fichye a.",
        hi: "स्टिकर परिवर्तित करते समय त्रुटि।"
    },

    // ==========================================
    // COMMANDE PREFIX (PREFIX.JS)
    // ==========================================
    prefixCurrentLabel: {
        fr: "ᴘʀᴇ́ғɪxᴇ ᴀᴄᴛᴜᴇʟ",
        en: "ᴄᴜʀʀᴇɴᴛ ᴘʀᴇғɪx",
        wo: "Perefis bi tay",
        ee: "Prefix si le",
        ln: "Prefi ya sikoyo",
        sw: "Prefix ya sasa",
        zu: "I-prefix yamanje",
        ht: "Prefiks aktyèl",
        hi: "वर्तमान प्रिफ़िक्स"
    },
    prefixUsageLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴀɢᴇ",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Matumizi",
        zu: "Ukusetshenziswa",
        ht: "Itilizasyon",
        hi: "उपयोग"
    },
    prefixTooLong: {
        fr: "ᴇʀʀᴇᴜʀ : ᴘʀᴇ́ғɪxᴇ ᴛʀᴏᴘ ʟᴏɴɢ (ᴍᴀx 𝟹 ᴄᴀʀᴀᴄᴛᴇ̀ʀᴇs).",
        en: "ᴇʀʀᴏʀ: ᴘʀᴇғɪx ɪs ᴛᴏᴏ ʟᴏɴɢ (ᴍᴀx 𝟹 ᴄʜᴀʀᴀᴄᴛᴇʀs).",
        wo: "Njuumte: Perefis dafa gudd (max 3 caractères).",
        ee: "Vodada: Prefix did ɖe eme akpa (max 3 characters).",
        ln: "Mbuma mabe: Prefi ezali molayi mingi (max 3 caractères).",
        sw: "Kosa: Prefix ni ndefu sana (angalau herufi 3).",
        zu: "Iphutha: I-prefix inde kakhulu (kufanele ibe izinhlamvu ezingu-3).",
        ht: "Erè: Prefiks la twò long (maksimòm 3 karaktè).",
        hi: "त्रुटि: प्रिफ़िक्स बहुत लंबा है (अधिकतम 3 वर्ण)।"
    },
    prefixUpdatedStatus: {
        fr: "sᴛᴀᴛᴜᴛ : ᴘʀᴇ́ғɪxᴇ ᴍɪs À ᴊᴏᴜʀ",
        en: "sᴛᴀᴛᴜs: ᴘʀᴇғɪx ᴜᴘᴅᴀᴛᴇᴅ",
        wo: "Statut: Perefis yeesal na",
        ee: "Nɔnɔmɛ: Prefix yeyee",
        ln: "Ezaleli: Prefi ebongwami",
        sw: "Hali: Prefix imesasishwa",
        zu: "Isimo: I-prefix ivuselelwe",
        ht: "Estati: Prefiks mete ajou",
        hi: "स्थिति: प्रिफ़िक्स अपडेट किया गया"
    },
    prefixNewSetText: {
        fr: "ɴᴏᴜᴠᴇᴀᴜ ᴘʀᴇ́ғɪxᴇ ᴅᴇ́ғɪɴɪ sᴜʀ",
        en: "ɴᴇᴡ ᴘʀᴇғɪx sᴇᴛ ᴛᴏ",
        wo: "Perefis bu bees definaal ci",
        ee: "Prefix yeyee ɖo ɖe",
        ln: "Prefi ya sika ekomami",
        sw: "Prefix mpya imewekwa kwa",
        zu: "I-prefix entsha imiselwe ku",
        ht: "Nouvo prefiks mete sou",
        hi: "नया प्रिफ़िक्स इस पर सेट किया गया"
    },
    prefixError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ.",
        wo: "Njuumte am na.",
        ee: "Vodada ɖaba.",
        ln: "Mbuma mabe ebimi.",
        sw: "Kosa limetokea.",
        zu: "Kuvele iphutha.",
        ht: "Yon erè fèt.",
        hi: "एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE PRIVATE (PRIVATE.JS)
    // ==========================================
    privateMenuTitle: {
        fr: "ᴘᴀʀᴀᴍᴇ̀ᴛʀᴇs ᴅᴜ ᴍᴏᴅᴇ ᴘʀɪᴠᴇ́",
        en: "ᴘʀɪᴠᴀᴛᴇ ᴍᴏᴅᴇ sᴇᴛᴛɪɴɢs",
        wo: "Teeytu mode privé",
        ee: "Dotẽ nɔnɔmɛ ɖoɖowo",
        ln: "Bibongisi ya mode private",
        sw: "Mipangilio ya mode ya kibinafsi",
        zu: "Izilungiselelo zemodi eyimfihlo",
        ht: "Anviwònman mòd prive",
        hi: "निजी मोड सेटिंग्स"
    },
    privateUsageLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ᴜsᴀɢᴇ",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Matumizi",
        zu: "Ukusetshenziswa",
        ht: "Itilizasyon",
        hi: "उपयोग"
    },
    privateOnDesc: {
        fr: "ᴍᴏᴅᴇ ᴘʀɪᴠᴇ́ ᴘᴏᴜʀ ᴄᴇᴛᴛᴇ ɪɴsᴛᴀɴᴄᴇ",
        en: "ᴘʀɪᴠᴀᴛᴇ ᴍᴏᴅᴇ ғᴏʀ ᴛʜɪs ɪɴsᴛᴀɴᴄᴇ",
        wo: "Mode privé ngir instance bi",
        ee: "Dotẽ nɔnɔmɛ na instance sia",
        ln: "Mode private pona instance oyo",
        sw: "Mode ya kibinafsi kwa tukio hili",
        zu: "Imodi eyimfihlo yalesi sikhungo",
        ht: "Mòd prive pou instans sa a",
        hi: "इस इंस्टेंस के लिए निजी मोड"
    },
    privateOffDesc: {
        fr: "ᴍᴏᴅᴇ ᴘᴜʙʟɪᴄ",
        en: "ᴘᴜʙʟɪᴄ ᴍᴏᴅᴇ",
        wo: "Mode public",
        ee: "Amewo katã nɔnɔmɛ",
        ln: "Mode public",
        sw: "Mode ya umma",
        zu: "Imodi yomphakathi",
        ht: "Mòd piblik",
        hi: "सार्वजनिक मोड"
    },
    privateSuccessText: {
        fr: "ʟᴇ ᴍᴏᴅᴇ ᴘʀɪᴠᴇ́ ᴘᴏᴜʀ ᴄᴇ ʙᴏᴛ ᴇsᴛ ᴅᴇ́ᴇsᴏʀᴍᴀɪs",
        en: "ᴘʀɪᴠᴀᴛᴇ ᴍᴏᴅᴇ ғᴏʀ ᴛʜɪs ʙᴏᴛ ɪs ɴᴏᴡ",
        wo: "Mode privé ngir bot bi léegi mu ngi",
        ee: "Dotẽ nɔnɔmɛ na bot sia le fifia",
        ln: "Mode private pona bot oyo ezali sikoyo",
        sw: "Mode ya kibinafsi kwa bot hii sasa ni",
        zu: "Imodi eyimfihlo yale bot manje isiyi",
        ht: "Mòd prive pou bot sa a kounye a se",
        hi: "इस बॉट के लिए निजी मोड अब है"
    },
    privateError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ.",
        wo: "Njuumte am na.",
        ee: "Vodada ɖaba.",
        ln: "Mbuma mabe ebimi.",
        sw: "Kosa limetokea.",
        zu: "Kuvele iphutha.",
        ht: "Yon erè fèt.",
        hi: "एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE RECORDING (RECORDING.JS)
    // ==========================================
    recordingMenuTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴅ'ᴇɴʀᴇɢɪsᴛʀᴇᴍᴇɴْت",
        en: "ʀᴇᴄᴏʀᴅɪɴɢ sᴛᴀᴛᴜs",
        wo: "Statut enregistrement",
        ee: "Recording nɔnɔmɛ",
        ln: "Ezaleli ya enregistrement",
        sw: "Hali ya recording",
        zu: "Isimo se-recording",
        ht: "Estati anrejistreman",
        hi: "रिकॉर्डिंग स्थिति"
    },
    recordingStatusLabel: {
        fr: "ᴍᴏᴅᴇ ᴇɴʀᴇɢɪsᴛʀᴇᴍᴇɴᴛ",
        en: "ʀᴇᴄᴏʀᴅɪɴɢ ᴍᴏᴅᴇ",
        wo: "Mode enregistrement",
        ee: "Recording mode",
        ln: "Mode enregistrement",
        sw: "Mode ya recording",
        zu: "Imodi ye-recording",
        ht: "Mòd anrejistreman",
        hi: "रिकॉर्डिंग मोड"
    },
    recordingEnabledMsg: {
        fr: "ᴍᴏᴅᴇ ᴅ'ᴇɴʀᴇɢɪsᴛʀᴇᴍᴇɴᴛ ᴀᴄᴛɪᴠᴇ́.",
        en: "Recording mode enabled.",
        wo: "Mode enregistrement tabal na.",
        ee: "Recording mode wɔ ŋu.",
        ln: "Mode enregistrement ezali.",
        sw: "Mode ya recording imewashwa.",
        zu: "Imodi ye-recording ivulwe.",
        ht: "Mòd anrejistreman aktive.",
        hi: "रिकॉर्डिंग मोड सक्षम किया गया।"
    },
    recordingDisabledMsg: {
        fr: "ᴍᴏᴅᴇ ᴅ'ᴇɴʀᴇɢɪsᴛʀᴇᴍᴇɴᴛ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "Recording mode disabled.",
        wo: "Mode enregistrement fey na.",
        ee: "Recording mode mewɔ ŋu o.",
        ln: "Mode enregistrement elongolami.",
        sw: "Mode ya recording imezimwa.",
        zu: "Imodi ye-recording ivaliwe.",
        ht: "Mòd anrejistreman desaktive.",
        hi: "रिकॉर्डिंग मोड अक्षम किया गया।"
    },
    recordingError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "An error occurred.",
        wo: "Njuumte am na.",
        ee: "Vodada ɖaba.",
        ln: "Mbuma mabe ebimi.",
        sw: "Kosa limetokea.",
        zu: "Kuvele iphutha.",
        ht: "Yon erè fèt.",
        hi: "एक त्रुटि हुई।"
    },

    // ==========================================
    // COMMANDE SPEED (SPEED.JS)
    // ==========================================
    speedMenuTitle: {
        fr: "ɢᴇsᴛɪᴏɴ ᴅᴇ ʟᴀ ᴠɪᴛᴇssᴇ ᴅᴜ ʙᴏᴛ",
        en: "ʙᴏᴛ sᴘᴇᴇᴅ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ",
        wo: "Teeytu gaawu bot bi",
        ee: "Bot duƒo dzi kpɔkpɔ",
        ln: "Bosungisi ya lombangu ya bot",
        sw: "Usimamizi wa kasi ya bot",
        zu: "Ukuphathwa kwejubane le-bot",
        ht: "Jesyon vitès bot",
        hi: "बॉट स्पीड प्रबंधन"
    },
    speedCurrentLabel: {
        fr: "ᴠɪᴛᴇssᴇ ᴀᴄᴛᴜᴇʟʟᴇ",
        en: "ᴄᴜʀʀᴇɴᴛ sᴘᴇᴇᴅ",
        wo: "Gaawu bi tay",
        ee: "Duƒo si le",
        ln: "Lombangu ya sikoyo",
        sw: "Kasi ya sasa",
        zu: "Ijubane lamanje",
        ht: "Vitès aktyèl",
        hi: "वर्तमान गति"
    },
    speedOptionsLabel: {
        fr: "ᴏᴘᴛɪᴏɴs ᴅɪsᴘᴏɴɪʙʟᴇs",
        en: "ᴀᴠᴀɪʟᴀʙʟᴇ ᴏᴘᴛɪᴏɴs",
        wo: "Option yi am",
        ee: "Option siwo le",
        ln: "Ba option ezali",
        sw: "Chaguo zinazopatikana",
        zu: "Izinketho ezitholakalayo",
        ht: "Opsyon ki disponib",
        hi: "उपलब्ध विकल्प"
    },
    speedUsageLabel: {
        fr: "ᴜᴛɪʟɪsᴀᴛɪᴏɴ",
        en: "ʜᴏᴡ ᴛᴏ ᴜsᴇ",
        wo: "Jëfandikoo",
        ee: "Zazã",
        ln: "Bosaleli",
        sw: "Jinsi ya kutumia",
        zu: "Indlela yokusebenzisa",
        ht: "Ki jan pou itilize",
        hi: "कैसे उपयोग करें"
    },
    speedExampleLabel: {
        fr: "ᴇxᴇᴍᴘʟᴇ",
        en: "ᴇxᴀᴍᴘʟᴇ",
        wo: "Exemple",
        ee: "Kpɔɖeŋu",
        ln: "Ntembe",
        sw: "Mfano",
        zu: "Isibonelo",
        ht: "Egzanp",
        hi: "उदाहरण"
    },
    speedSuccess: {
        fr: "ᴠɪᴛᴇssᴇ ᴅᴇ ʀᴇ́ᴘᴏɴsᴇ ᴍɪsᴇ ᴀ̀ ᴊᴏᴜʀ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s",
        en: "ʀᴇsᴘᴏɴsᴇ sᴘᴇᴇᴅ ᴜᴘᴅᴀᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ",
        wo: "Gaawu tontu bi yeesal na bu baax",
        ee: "Ɖoɖo duƒo ɖo ɖe edzi nyuie",
        ln: "Lombangu ya eyano ebongwami malamu",
        sw: "Kasi ya jibu imesasishwa kwa mafanikio",
        zu: "Ijubane lempendulo livuselelwe ngempumelelo",
        ht: "Vitès repons lan mete ajou ak siksè",
        hi: "प्रतिक्रिया गति सफलतापूर्वक अपडेट की गई"
    },
    speedNewRange: {
        fr: "ɴᴏᴜᴠᴇᴀᴜ ɪɴᴛᴇʀᴠᴀʟʟᴇ",
        en: "ɴᴇᴡ ʀᴀɴɢᴇ",
        wo: "Intervalle bu bees",
        ee: "Game yeyee",
        ln: "Intervalle ya sika",
        sw: "Kiwango kipya",
        zu: "Ibanga elisha",
        ht: "Nouvo entèval",
        hi: "नया रेंज"
    },
    speedError: {
        fr: "ᴇʀʀᴇᴜʀ",
        en: "ᴇʀʀᴏʀ",
        wo: "Njuumte",
        ee: "Vodada",
        ln: "Mbuma mabe",
        sw: "Kosa",
        zu: "Iphutha",
        ht: "Erè",
        hi: "त्रुटि"
    },

    // ==========================================
    // COMMANDE TYPING (TYPING.JS)
    // ==========================================
    typingMenuTitle: {
        fr: "sᴛᴀᴛᴜᴛ ᴅ'ᴇ́ᴄʀɪᴛᴜʀᴇ",
        en: "ᴛʏᴘɪɴɢ sᴛᴀᴛᴜs",
        wo: "Statut bind",
        ee: "Typing nɔnɔmɛ",
        ln: "Ezaleli ya kokoma",
        sw: "Hali ya kuandika",
        zu: "Isimo sokubhala",
        ht: "Estati ekri",
        hi: "टाइपिंग स्थिति"
    },
    typingStatusLabel: {
        fr: "ᴍᴏᴅᴇ ᴇ́ᴄʀɪᴛᴜʀᴇ",
        en: "ᴛʏᴘɪɴɢ ᴍᴏᴅᴇ",
        wo: "Mode bind",
        ee: "Typing mode",
        ln: "Mode ya kokoma",
        sw: "Mode ya kuandika",
        zu: "Imodi yokubhala",
        ht: "Mòd ekri",
        hi: "टाइपिंग मोड"
    },
    typingEnabledMsg: {
        fr: "ᴍᴏᴅᴇ ᴅ'ᴇ́ᴄʀɪᴛᴜʀᴇ ᴀᴄᴛɪᴠᴇ́.",
        en: "Typing mode enabled.",
        wo: "Mode bind tabal na.",
        ee: "Typing mode wɔ ŋu.",
        ln: "Mode ya kokoma ezali.",
        sw: "Mode ya kuandika imewashwa.",
        zu: "Imodi yokubhala ivulwe.",
        ht: "Mòd ekri aktive.",
        hi: "टाइपिंग मोड सक्षम किया गया।"
    },
    typingDisabledMsg: {
        fr: "ᴍᴏᴅᴇ ᴅ'ᴇ́ᴄʀɪᴛᴜʀᴇ ᴅᴇ́sᴀᴄᴛɪᴠᴇ́.",
        en: "Typing mode disabled.",
        wo: "Mode bind fey na.",
        ee: "Typing mode mewɔ ŋu o.",
        ln: "Mode ya kokoma elongolami.",
        sw: "Mode ya kuandika imezimwa.",
        zu: "Imodi yokubhala ivaliwe.",
        ht: "Mòd ekri desaktive.",
        hi: "टाइपिंग मोड अक्षम किया गया।"
    },
    typingError: {
        fr: "ᴜɴᴇ ᴇʀʀᴇᴜʀ ᴇsᴛ sᴜʀᴠᴇɴᴜᴇ.",
        en: "An error occurred.",
        wo: "Njuumte am na.",
        ee: "Vodada ɖaba.",
        ln: "Mbuma mabe ebimi.",
        sw: "Kosa limetokea.",
        zu: "Kuvele iphutha.",
        ht: "Yon erè fèt.",
        hi: "एक त्रुटि हुई।"
    }
};

/**
 * Récupère le texte traduit selon la langue choisie.
 * Si la traduction n'existe pas dans la langue demandée, 
 * elle utilise la langue par défaut ('en', ou 'fr' si l'anglais manque).
 */
export function getString(ownerId, key) {
    const userLang = getSetting(ownerId, 'botLanguage', 'en');
    
    if (translations[key]) {
        return translations[key][userLang] || translations[key]['en'] || translations[key]['fr'] || key;
    }
    
    return key;
}

/**
 * Définit la nouvelle langue parmi la liste supportée des pays/régions.
 */
export function setLanguage(ownerId, lang) {
    const supportedLangs = [
        'fr', 'en', 'wo', 'bm', 'mos', 'ha', 'ee', 
        'ar', 'ln', 'sw', 'pt', 'mg', 'ny', 'zu', 'ht', 'hi'
    ];
    
    if (supportedLangs.includes(lang)) {
        setSetting(ownerId, 'botLanguage', lang);
        return true;
    }
    return false;
}
