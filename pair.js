import {
    default as makeWASocket,
    jidDecode,
    DisconnectReason,
    useMultiFileAuthState,
    Browsers,
    getContentType
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import fs from "fs";
import path from "path";
import pino from "pino";
import { fileURLToPath } from "url";
import handler, { commands } from "./case.js";
import { connectionMessage, updateMessage } from "./setting/botAssets.js";
import './config.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAIRING_DIR = path.join(process.cwd(), "richstore", "pairing");

if (!fs.existsSync(PAIRING_DIR)) {
    fs.mkdirSync(PAIRING_DIR, { recursive: true });
}

// 🛠️ Fonction utilitaire pour récupérer les sessions actives
export function getActiveSessions() {
    if (!fs.existsSync(PAIRING_DIR)) return [];
    return fs.readdirSync(PAIRING_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(folderName => {
            const credsPath = path.join(PAIRING_DIR, folderName, 'creds.json');
            return fs.existsSync(credsPath);
        });
}

// 🧹 NOUVEAU : Fonction pour supprimer les sessions et fichiers inactifs / abandonnés
export function cleanupInactiveSessions() {
    if (!fs.existsSync(PAIRING_DIR)) return;
    const now = Date.now();
    const STALE_THRESHOLD = 15 * 60 * 1000; // 15 minutes d'inactivité/abandon

    try {
        const entries = fs.readdirSync(PAIRING_DIR, { withFileTypes: true });
        for (const entry of entries) {
            const entryPath = path.join(PAIRING_DIR, entry.name);

            if (entry.isFile()) {
                // Supprimer les vieux fichiers de requêtes ou de pairage orphelins (> 15 min)
                if (entry.name.startsWith('request_') || entry.name.startsWith('pairing_')) {
                    try {
                        const stats = fs.statSync(entryPath);
                        if (now - stats.mtimeMs > STALE_THRESHOLD) {
                            fs.unlinkSync(entryPath);
                            console.log(`[CLEANUP] 🗑️ Fichier temporaire expiré supprimé : ${entry.name}`);
                        }
                    } catch (e) {}
                }
            } else if (entry.isDirectory()) {
                // Vérifier si le dossier de session possède un creds.json valide
                const credsPath = path.join(entryPath, 'creds.json');
                if (!fs.existsSync(credsPath)) {
                    // Pas de creds.json = tentative de pairage échouée ou abandonnée
                    try {
                        const stats = fs.statSync(entryPath);
                        if (now - stats.mtimeMs > STALE_THRESHOLD) {
                            deleteFolderRecursive(entryPath);
                            console.log(`[CLEANUP] 🗑️ Dossier de session incomplet/inactif supprimé : ${entry.name}`);
                        }
                    } catch (e) {}
                }
            }
        }
    } catch (e) {
        console.error("[CLEANUP] ❌ Erreur lors du nettoyage des sessions inactives:", e);
    }
}

// 🛡️ Liste pour éviter de lancer deux fois le même processus pour le même utilisateur
const processingRequests = new Set();

export function watchPairingRequests() {
    // Exécuter un premier nettoyage au démarrage du watcher
    cleanupInactiveSessions();

    setInterval(() => {
        // Lancer le nettoyage des inactifs à chaque cycle de vérification
        cleanupInactiveSessions();

        if (!fs.existsSync(PAIRING_DIR)) return;
        const files = fs.readdirSync(PAIRING_DIR);
        for (const file of files) {
            if (file.startsWith('request_')) {
                try {
                    const filePath = path.join(PAIRING_DIR, file);
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    const teleId = file.replace('request_', '').replace('.json', '');

                    if (processingRequests.has(teleId)) continue;

                    console.log(`[WATCHER] ✨ Demande détectée pour : ${data.jid}`);  
                    
                    fs.unlinkSync(filePath);  
                    processingRequests.add(teleId);

                    startpairing(data.jid, teleId, data.name)
                        .then(() => processingRequests.delete(teleId))
                        .catch(e => {
                            processingRequests.delete(teleId);
                            console.error(`[WATCHER] ❌ Erreur critique startpairing pour ${data.jid}:`, e);
                        }); 
                } catch (e) {  
                    console.error("[WATCHER] ❌ Erreur traitement demande:", e);  
                }  
            }  
        }  
    }, 5000);
}

export async function restoreSessions() {
    if (!fs.existsSync(PAIRING_DIR)) return;
    const folders = fs.readdirSync(PAIRING_DIR);
    for (const folder of folders) {
        if (folder.startsWith('request_') || folder.startsWith('pairing_') || folder.endsWith('.json')) continue;
        
        const sessionPath = path.join(PAIRING_DIR, folder);
        if (fs.lstatSync(sessionPath).isDirectory()) {
            const credsPath = path.join(sessionPath, 'creds.json');
            if (fs.existsSync(credsPath)) {
                console.log(`[RESTORE] 🔄 Restauration propre de la session: ${folder}`);
                startpairing(folder).catch((e) => {
                    console.error(`[RESTORE] ❌ Erreur restauration ${folder}:`, e.message);
                });
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }
    }
}

const rentbotTracker = new Map();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) deleteFolderRecursive(curPath);
            else fs.unlinkSync(curPath);
        });
        fs.rmdirSync(folderPath);
    }
}

export function forceCleanupSession(number, teleId = "default") {
    console.log(`[CLEANUP] 🧹 Nettoyage complet (session, pairing, configuration) pour ${number}`);
    const cleanNumber = number.replace(/[^0-9]/g, "");
    
    const sessionPath = path.join(PAIRING_DIR, cleanNumber);
    if (fs.existsSync(sessionPath)) deleteFolderRecursive(sessionPath);
    
    if (teleId && teleId !== "default") {
        const pairingFile = path.join(PAIRING_DIR, `pairing_${teleId}.json`);
        if (fs.existsSync(pairingFile)) fs.unlinkSync(pairingFile);
    } else {
        if (fs.existsSync(PAIRING_DIR)) {
            const files = fs.readdirSync(PAIRING_DIR);
            for (const file of files) {
                if (file.startsWith('pairing_') && file.endsWith('.json')) {
                    try {
                        const filePath = path.join(PAIRING_DIR, file);
                        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                        if ((data.number || "").replace(/[^0-9]/g, "") === cleanNumber) {
                            fs.unlinkSync(filePath);
                        }
                    } catch (e) {}
                }
            }
        }
    }
    
    const possibleConfigPaths = [
        path.join('/home/container/Kaya-MD', 'userall', cleanNumber),
        path.join(process.cwd(), 'userall', cleanNumber)
    ];
    
    for (const configDir of possibleConfigPaths) {
        if (fs.existsSync(configDir)) {
            deleteFolderRecursive(configDir);
            console.log(`[CLEANUP] 🗑️ Dossier de configuration supprimé : ${configDir}`);
        }
    }
    
    if (rentbotTracker.has(cleanNumber)) {
        const tracker = rentbotTracker.get(cleanNumber);
        if (tracker.connection) { 
            try { 
                tracker.connection.ev.removeAllListeners("connection.update");
                tracker.connection.ev.removeAllListeners("creds.update");
                tracker.connection.ev.removeAllListeners("messages.upsert");
                tracker.connection.ev.removeAllListeners("group-participants.update");
                tracker.connection.end(); 
            } catch (e) {} 
        }
        rentbotTracker.delete(cleanNumber);
    }
}

export default async function startpairing(nexusDevNumber, teleId = "default", userName = "Unknown", attempt = 0) {
    const number = nexusDevNumber.replace(/[^0-9]/g, "");

    if (!number || number.length < 9) {
        console.log(`[PAIRING] ❌ Tentative de connexion avec un numéro invalide/court : ${nexusDevNumber}`);
        throw new Error("Numéro invalide (minimum 9 chiffres requis)");
    }

    const instanceId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const logPrefix = `[${number} | ID:${instanceId}]`;

    console.log(`${logPrefix} 🚀 Initialisation startpairing (Tentative: ${attempt})`);

    if (rentbotTracker.has(number)) {  
        const tracker = rentbotTracker.get(number);  
        if (tracker.connection) { 
            console.log(`${logPrefix} 🔪 Fermeture propre de l'ancienne instance en double...`);
            try { 
                tracker.connection.ev.removeAllListeners("connection.update");
                tracker.connection.ev.removeAllListeners("creds.update");
                tracker.connection.ev.removeAllListeners("messages.upsert");
                tracker.connection.ev.removeAllListeners("group-participants.update");
                tracker.connection.ws.close(); 
                tracker.connection.end(); 
            } catch (e) {} 
        }  
    }  

    let isReady = false;   
    rentbotTracker.set(number, { connection: null, isConnected: false, status: 'starting' });  
    const tracker = rentbotTracker.get(number);  
    
    const sessionPath = path.join(PAIRING_DIR, number);  
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });  

    console.log(`${logPrefix} 🔑 Chargement de l'état d'authentification...`);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);  
      
    await sleep(2000);   

    const kaya = makeWASocket({  
        logger: pino({ level: "silent" }), 
        printQRInTerminal: false,  
        auth: state,  
        browser: Browsers.macOS("Chrome"),  
        connectTimeoutMs: 60000,   
        defaultQueryTimeoutMs: 60000,  
        keepAliveIntervalMs: 30000,  
        markOnlineOnConnect: true,  
        emitOwnEvents: false,  
    });  

    tracker.connection = kaya;  

    if (!state.creds.registered) {  
        console.log(`${logPrefix} ⏳ Appareil non enregistré. Demande de code de pairage dans 5s...`);
        
        setTimeout(async () => {  
            try {  
                if (rentbotTracker.get(number)?.connection !== kaya) return;
                
                const pairingFile = path.join(PAIRING_DIR, `pairing_${teleId}.json`);
                if (fs.existsSync(pairingFile)) {
                    fs.unlinkSync(pairingFile);
                }
                
                let code = await kaya.requestPairingCode(number);  
                code = code?.match(/.{1,4}/g)?.join("-") || code;  
                console.log(`${logPrefix} 📟 Nouveau code de pairage généré: ${code}`);

                fs.writeFileSync(pairingFile, JSON.stringify({ number: nexusDevNumber, code, userName, timestamp: new Date().toISOString() }, null, 2));  
            } catch (err) {
                console.error(`${logPrefix} ❌ Erreur génération code:`, err.message);
            }  
        }, 5000);  
    } else {
        console.log(`${logPrefix} ✅ Appareil déjà enregistré.`);
    }

    kaya.decodeJid = (jid) => {  
        if (!jid) return jid;  
        if (/:/g.test(jid)) {  
            const decode = jidDecode(jid) || {};  
            return decode.user && decode.server ? `${decode.user}@${decode.server}` : jid;  
        }  
        return jid;  
    };  

    kaya.ev.on("messages.upsert", async chatUpdate => {  
        if (!isReady) return;   
        try {  
            const rawMsg = chatUpdate.messages[0];  
            if (!rawMsg.message || rawMsg.key.id.startsWith("BAE5")) return;  
            const mek = smsg(kaya, rawMsg);  
            await handler(kaya, mek, chatUpdate);   
        } catch (err) { 
        }  
    });  

    kaya.ev.on("group-participants.update", async (update) => {
        if (!isReady) return;
        try {
            const uniqueCommands = new Set(commands.values());
            for (const cmd of uniqueCommands) {
                if (typeof cmd.participantUpdate === "function") {
                    await cmd.participantUpdate(kaya, update);
                }
            }
        } catch (err) {
        }
    });

    kaya.ev.on("connection.update", async (update) => {  
        const { connection, lastDisconnect } = update;  
          
        if (connection === "open") {  
            if (rentbotTracker.get(number)?.connection !== kaya) return;
            console.log(`${logPrefix} 🟢 CONNEXION RÉUSSIE`);
            isReady = true;  
            tracker.status = 'connected';
            if (!tracker.isConnected) {  
                tracker.isConnected = true;  
                await sleep(2000);  

                const statusFile = path.join(process.cwd(), 'utils', 'update_status.json');

                if (fs.existsSync(statusFile)) {
                    try {
                        const updateData = JSON.parse(fs.readFileSync(statusFile, 'utf-8'));
                        fs.unlinkSync(statusFile);

                        await kaya.sendMessage(number + "@s.whatsapp.net", { text: updateMessage(updateData) }).catch(e => {});
                    } catch (err) {
                        await kaya.sendMessage(number + "@s.whatsapp.net", { text: connectionMessage() }).catch(e => {});
                    }
                } else {
                    await kaya.sendMessage(number + "@s.whatsapp.net", { text: connectionMessage() }).catch(e => {});  
                }
            }  
        }  
          
        if (connection === "close") {  
            isReady = false;  
            tracker.isConnected = false;  
            if (rentbotTracker.get(number)?.connection !== kaya) return;
            
            const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;  
            
            if (statusCode === DisconnectReason.loggedOut || statusCode === 403) {
                console.log(`${logPrefix} ❌ Session rejetée ou fermée définitivement (Code: ${statusCode}). Nettoyage complet (session + configuration)...`);
                forceCleanupSession(number, teleId);  
            } else {  
                if (attempt < 5) {
                    const backoffDelay = Math.min(15000 * (attempt + 1), 60000);  
                    console.log(`${logPrefix} ⚠️ Connexion fermée (Reason: ${statusCode}). Reconnexion dans ${backoffDelay / 1000}s...`);
                    await sleep(backoffDelay);  
                    startpairing(nexusDevNumber, teleId, userName, attempt + 1);  
                } else {
                    console.log(`${logPrefix} ❌ Trop de tentatives échouées. Nettoyage de sécurité complet.`);
                    forceCleanupSession(number, teleId);
                }
            }  
        }  
    });  

    kaya.ev.on("creds.update", () => {
        if (rentbotTracker.get(number)?.connection === kaya) saveCreds();
    });  
    
    return kaya;
}

function smsg(kaya, m) {
    if (!m) return m;
    if (m.key) {
        m.id = m.key.id;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat?.endsWith("@g.us");
        m.sender = kaya.decodeJid(m.fromMe ? kaya.user.id : m.participant || m.key.participant || m.chat || "");
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = m.message[m.mtype] || {};
        m.body = m.message.conversation || m.msg?.caption || m.msg?.text || "";
        let quoted = m.msg?.contextInfo?.quotedMessage || null;
        if (quoted) {
            const type = getContentType(quoted);
            m.quoted = quoted[type];
            if (typeof m.quoted === "string") m.quoted = { text: m.quoted };
            m.quoted.mtype = type;
            m.quoted.sender = kaya.decodeJid(m.msg.contextInfo.participant);
            m.quoted.text = m.quoted.text || m.quoted.caption || "";
        }
    }
    return m;
}
