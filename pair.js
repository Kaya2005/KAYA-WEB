//pair.js
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
import express from "express";
import handler, { commands } from "./case.js";
import { connectionMessage, updateMessage } from "./setting/botAssets.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAIRING_DIR = path.join(process.cwd(), "richstore", "pairing");

if (!fs.existsSync(PAIRING_DIR)) {
    fs.mkdirSync(PAIRING_DIR, { recursive: true });
}

// ================= EXPRESS WEB SERVER SETUP =================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Page d'accueil avec interface web moderne pour le pairing
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KAYA-MD | Pairing Dashboard</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: #1e293b; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); width: 100%; max-width: 400px; text-align: center; }
            h2 { margin-bottom: 10px; color: #38bdf8; }
            p { color: #94a3b8; font-size: 14px; margin-bottom: 20px; }
            input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 16px; margin-bottom: 15px; box-sizing: border-box; text-align: center; }
            button { background: #0ea5e9; color: white; border: none; padding: 12px; width: 100%; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
            button:hover { background: #0284c7; }
            #result { margin-top: 20px; font-size: 18px; font-weight: bold; word-break: break-all; }
            .code-box { background: #0f172a; border: 2px dashed #38bdf8; padding: 15px; border-radius: 8px; margin-top: 15px; font-family: monospace; font-size: 24px; color: #4ade80; letter-spacing: 2px; }
            .loader { border: 4px solid #334155; border-top: 4px solid #0ea5e9; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 20px auto; display: none; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>KAYA-MD PAIRING</h2>
            <p>Entrez votre numéro WhatsApp avec l'indicatif (ex: 243xxxxxxxxx)</p>
            <input type="text" id="phone" placeholder="243999999999" autocomplete="off">
            <button onclick="getPairingCode()">Obtenir le Code</button>
            <div class="loader" id="loader"></div>
            <div id="result"></div>
        </div>

        <script>
            async function getPairingCode() {
                const phone = document.getElementById('phone').value.trim();
                const resultDiv = document.getElementById('result');
                const loader = document.getElementById('loader');

                if (!phone || phone.length < 9) {
                    resultDiv.innerHTML = '<span style="color: #ef4444;">Veuillez entrer un numéro valide.</span>';
                    return;
                }

                resultDiv.innerHTML = '';
                loader.style.display = 'block';

                try {
                    const response = await fetch('/api/connect', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ phone })
                    });
                    const data = await response.json();
                    loader.style.display = 'none';

                    if (data.success) {
                        resultDiv.innerHTML = 'Votre code de pairage :<div class="code-box">' + data.code + '</div>';
                    } else {
                        resultDiv.innerHTML = '<span style="color: #ef4444;">' + data.message + '</span>';
                    }
                } catch (err) {
                    loader.style.display = 'none';
                    resultDiv.innerHTML = '<span style="color: #ef4444;">Erreur de connexion au serveur.</span>';
                }
            }
        </script>
    </body>
    </html>
    `);
});

// API pour générer le code de pairage depuis le web
app.post('/api/connect', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.json({ success: false, message: 'Numéro requis.' });

        const number = phone.replace(/\D/g, '');
        if (number.length < 9) return res.json({ success: false, message: 'Numéro invalide (minimum 9 chiffres).' });

        const activeSessions = getActiveSessions();
        if (activeSessions.length >= 60 && !activeSessions.includes(number)) {
            return res.json({ success: false, message: 'Capacité maximale du serveur atteinte (60/60).' });
        }

        const jid = number + "@s.whatsapp.net";
        const webSessionId = `web_${number}`;

        const requestPath = path.join(PAIRING_DIR, `request_${webSessionId}.json`);
        fs.writeFileSync(requestPath, JSON.stringify({ jid, name: "WebUser" }));

        let attempts = 0;
        let cuObj = null;
        const pairingFile = path.join(PAIRING_DIR, `pairing_${webSessionId}.json`);

        while (attempts < 20) {
            if (fs.existsSync(pairingFile)) {
                try {
                    cuObj = JSON.parse(fs.readFileSync(pairingFile, 'utf-8'));
                    break;
                } catch (e) {}
            }
            await new Promise(r => setTimeout(r, 1000));
            attempts++;
        }

        if (cuObj && cuObj.code) {
            return res.json({ success: true, code: cuObj.code });
        } else {
            return res.json({ success: false, message: 'Impossible de générer le code de pairage. Veuillez réessayer.' });
        }
    } catch (err) {
        console.error("API Error:", err);
        res.json({ success: false, message: 'Erreur interne du serveur.' });
    }
});

app.get('/api/listpair', (req, res) => {
    const activeSessions = getActiveSessions();
    res.json({ total: activeSessions.length, sessions: activeSessions });
});

app.listen(PORT, () => {
    console.log(`▉ KAYA WEB SERVER is running on port ${PORT}`);
});

// 🛠️ Fonction utilitaire pour récupérer les sessions actives
function getActiveSessions() {
    if (!fs.existsSync(PAIRING_DIR)) return [];
    return fs.readdirSync(PAIRING_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(folderName => {
            const credsPath = path.join(PAIRING_DIR, folderName, 'creds.json');
            return fs.existsSync(credsPath);
        });
}

// 🛡️ Liste pour éviter de lancer deux fois le même processus pour le même utilisateur
const processingRequests = new Set();

export function watchPairingRequests() {
    setInterval(() => {
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
