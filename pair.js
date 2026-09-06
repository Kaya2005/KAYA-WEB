// ==================== pair.js ====================

import {
    default as makeWASocket,
    jidDecode,
    DisconnectReason,
    Browsers,
    getContentType
} from "@whiskeysockets/baileys";

import { MongoClient } from "mongodb";
import { useMongoDBAuthState } from "mongo-baileys";

import { Boom } from "@hapi/boom";
import fs from "fs";
import path from "path";
import pino from "pino";
import { fileURLToPath } from "url";

import handler, {
    commands
} from "./case.js";

import {
    connectionMessage,
    updateMessage,
    getBotName,
    sendWithBotImage
} from "./setting/botAssets.js";

import {
    getContextInfo
} from "./setting/contextInfo.js";

import {
    getSetting,
    setSetting
} from "./setting.js";

// ==========================================
// SEND QUEUE
// ==========================================

import {
    sendLimited,
    destroySendQueue
} from "./utils/kayaUtils.js";

// ==========================================
// MODE ONLINE
// ==========================================

import {
    startAlwaysOnline
} from "./commands/online.js";

// ==========================================
// ANTI DELETE
// ==========================================

import {
    handleAntiDelete
} from "./commands/antidelete.js";

// ==========================================
// PATHS
// ==========================================

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);

// ==========================================
// MONGODB CONFIGURATION
// ==========================================

const MONGO_URI = process.env.MONGO_URI || "ta_chaine_de_connexion_mongodb";
let mongoClient = null;
let sessionsCollection = null;

async function getMongoCollection() {
    if (!mongoClient) {
        mongoClient = new MongoClient(MONGO_URI);
        await mongoClient.connect();
        const db = mongoClient.db("kaya_bot_sessions");
        sessionsCollection = db.collection("whatsapp_auth");
        console.log("[MONGODB] 📦 Connecté avec succès pour les sessions WhatsApp !");
    }
    return sessionsCollection;
}

// ==========================================
// STOCKAGE PERSISTANT UNIVERSEL (pour pairing et config)
// ==========================================

const STORAGE_DIR =
    process.env.RAILWAY_VOLUME_MOUNT_PATH ||
    process.env.STORAGE_DIR ||
    path.join(process.cwd(), "data");

const PAIRING_DIR =
    path.join(
        STORAGE_DIR,
        "richstore",
        "pairing"
    );

if (!fs.existsSync(PAIRING_DIR)) {
    fs.mkdirSync(
        PAIRING_DIR,
        { recursive: true }
    );
}

// ==========================================
// PAIRING REQUESTS
// ==========================================

const processingRequests =
    new Set();

export function watchPairingRequests() {

    setInterval(() => {

        if (!fs.existsSync(PAIRING_DIR)) {
            return;
        }

        const files =
            fs.readdirSync(
                PAIRING_DIR
            );

        for (const file of files) {

            if (
                !file.startsWith(
                    "request_"
                )
            ) {
                continue;
            }

            try {

                const filePath =
                    path.join(
                        PAIRING_DIR,
                        file
                    );

                const data =
                    JSON.parse(
                        fs.readFileSync(
                            filePath,
                            "utf-8"
                        )
                    );

                const teleId =
                    file
                        .replace(
                            "request_",
                            ""
                        )
                        .replace(
                            ".json",
                            ""
                        );

                const cleanNumber =
                    (
                        data.jid || ""
                    ).replace(
                        /[^0-9]/g,
                        ""
                    );

                const requestKey =
                    `${teleId}_${cleanNumber}`;

                if (
                    processingRequests.has(
                        requestKey
                    )
                ) {

                    fs.unlinkSync(
                        filePath
                    );

                    continue;
                }

                console.log(
                    `[WATCHER] 📥 Demande de pairing détectée pour : ${data.jid}`
                );

                fs.unlinkSync(
                    filePath
                );

                processingRequests.add(
                    requestKey
                );

                startpairing(
                    data.jid,
                    teleId,
                    data.name ||
                        "Client WhatsApp"
                )
                    .then(() => {
                        processingRequests.delete(
                            requestKey
                        );
                    })
                    .catch(error => {

                        processingRequests.delete(
                            requestKey
                        );

                        console.error(
                            `[WATCHER] ❌ Erreur startpairing pour ${data.jid}:`,
                            error
                        );
                    });

            } catch (error) {

                console.error(
                    "[WATCHER] ❌ Erreur traitement demande:",
                    error
                );
            }
        }

    }, 5000);
}

// ==========================================
// RESTAURATION DES SESSIONS (MongoDB)
// ==========================================

export async function restoreSessions() {
    try {
        const collection = await getMongoCollection();
        // Récupère toutes les sessions distinctes enregistrées dans MongoDB
        const storedCreds = await collection.distinct("id");

        for (const sessionId of storedCreds) {
            // Le sessionId dans mongo-baileys correspond souvent au numéro ou à l'identifiant
            if (!sessionId || sessionId.includes("-")) continue;

            console.log(`[RESTORE] 🔄 Restauration de la session MongoDB pour : ${sessionId}`);

            startpairing(
                sessionId,
                "default",
                "Client WhatsApp"
            ).catch(error => {
                console.error(
                    `[RESTORE] ❌ Erreur restauration ${sessionId}:`,
                    error.message
                );
            });

            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (err) {
        console.error("[RESTORE] ❌ Erreur lors de la récupération des sessions MongoDB:", err);
    }
}

// ==========================================
// TRACKER
// ==========================================

const rentbotTracker =
    new Map();

const sleep = ms =>
    new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

// ==========================================
// CLEANUP SESSION
// ==========================================

export async function forceCleanupSession(
    number,
    teleId = "default"
) {

    console.log(
        `[CLEANUP] 🧹 Nettoyage de la session pour : ${number}`
    );

    const cleanNumber =
        number.replace(
            /[^0-9]/g,
            ""
        );

    // Arrêt Socket + Queue
    if (
        rentbotTracker.has(
            cleanNumber
        )
    ) {

        const tracker =
            rentbotTracker.get(
                cleanNumber
            );

        if (
            tracker.connection
        ) {

            try {
                destroySendQueue(tracker.connection);
            } catch {}

            try {
                tracker.connection.ev.removeAllListeners();
            } catch {}

            try {
                tracker.connection.ws?.close();
            } catch {}

            try {
                tracker.connection.end();
            } catch {}
        }

        rentbotTracker.delete(
            cleanNumber
        );
    }

    // Suppression des données d'authentification dans MongoDB
    try {
        const collection = await getMongoCollection();
        await collection.deleteMany({ id: { $regex: cleanNumber } });
    } catch (e) {
        console.error(`[CLEANUP] Erreur suppression MongoDB pour ${cleanNumber}:`, e);
    }

    // Nettoyage fichiers locaux de pairing / config
    if (
        teleId &&
        teleId !== "default"
    ) {
        const pairingFile =
            path.join(
                PAIRING_DIR,
                `pairing_${teleId}.json`
            );

        if (fs.existsSync(pairingFile)) {
            fs.unlinkSync(pairingFile);
        }
    }

    const configDir =
        path.join(
            STORAGE_DIR,
            "userall",
            cleanNumber
        );

    if (fs.existsSync(configDir)) {
        fs.rmSync(configDir, { recursive: true, force: true });
    }
}

// ==========================================
// MESSAGE CONNEXION / UPDATE
// ==========================================

async function sendConnectionOrUpdateMessage(
    kaya,
    ownerCleanId,
    statusFile
) {

    const botName =
        getBotName(
            ownerCleanId
        );

    let messageText =
        "";

    if (
        fs.existsSync(
            statusFile
        )
    ) {

        try {

            const updateData =
                JSON.parse(
                    fs.readFileSync(
                        statusFile,
                        "utf-8"
                    )
                );

            fs.unlinkSync(
                statusFile
            );

            messageText =
                updateMessage(
                    updateData,
                    botName
                );

        } catch (err) {

            console.error(
                "❌ Erreur lecture update_status.json:",
                err.message
            );

            if (
                fs.existsSync(
                    statusFile
                )
            ) {

                fs.unlinkSync(
                    statusFile
                );
            }
        }
    }

    if (!messageText) {

        messageText =
            connectionMessage(
                botName
            );
    }

    await sendWithBotImage(
        kaya,
        ownerCleanId +
            "@s.whatsapp.net",
        ownerCleanId,
        {
            caption:
                messageText,

            contextInfo:
                getContextInfo(
                    ownerCleanId
                )
        }
    );
}

// ==========================================
// START PAIRING
// ==========================================

export default async function startpairing(
    nexusDevNumber,
    teleId = "default",
    userName = "Client WhatsApp",
    attempt = 0
) {

    const number =
        nexusDevNumber.replace(
            /[^0-9]/g,
            ""
        );

    if (
        !number ||
        number.length < 9
    ) {

        console.error(
            `[PAIRING] ❌ Numéro invalide : ${nexusDevNumber}`
        );

        throw new Error(
            "Numéro invalide (minimum 9 chiffres requis)"
        );
    }

    const instanceId =
        Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();

    const logPrefix =
        `[${number} | ID:${instanceId}]`;

    // Fermer ancienne instance si existe
    if (rentbotTracker.has(number)) {
        const oldTracker = rentbotTracker.get(number);
        if (oldTracker.connection) {
            try { destroySendQueue(oldTracker.connection); } catch {}
            try { oldTracker.connection.end(); } catch {}
        }
        rentbotTracker.delete(number);
    }

    let isReady = false;
    const tracker = {
        connection: null,
        isConnected: false,
        status: "starting"
    };

    rentbotTracker.set(number, tracker);

    // ==========================================
    // AUTH STATE VIA MONGODB
    // ==========================================

    const collection = await getMongoCollection();
    // On passe un identifiant unique basé sur le numéro pour isoler chaque session
    const { state, saveCreds } = await useMongoDBAuthState(collection, number);

    await sleep(2000);

    // ==========================================
    // SOCKET
    // ==========================================

    const kaya =
        makeWASocket({

            logger:
                pino({
                    level: "silent"
                }),

            printQRInTerminal:
                false,

            auth:
                state,

            browser:
                Browsers.ubuntu(
                    "Chrome"
                ),

            connectTimeoutMs:
                60000,

            defaultQueryTimeoutMs:
                60000,

            keepAliveIntervalMs:
                30000,

            markOnlineOnConnect:
                false,

            emitOwnEvents:
                false
        });

    // Send Message Patch
    if (!kaya._patched) {
        const originalSend = kaya.sendMessage.bind(kaya);
        kaya.sendMessage = async (jid, content, options = {}) => {
            return await sendLimited(kaya, originalSend, jid, content, options);
        };
        kaya._patched = true;
    }

    tracker.connection = kaya;

    // Pairing Code logic
    if (!state.creds.registered) {
        setTimeout(async () => {
            try {
                if (rentbotTracker.get(number)?.connection !== kaya) return;

                const pairingFile = path.join(PAIRING_DIR, `pairing_${teleId}.json`);
                if (fs.existsSync(pairingFile)) fs.unlinkSync(pairingFile);

                let code = await kaya.requestPairingCode(number);
                code = code?.match(/.{1,4}/g)?.join("-") || code;

                console.log(`${logPrefix} 📟 Code de pairage généré : ${code}`);

                fs.writeFileSync(
                    pairingFile,
                    JSON.stringify(
                        { number: nexusDevNumber, code, userName, timestamp: new Date().toISOString() },
                        null,
                        2
                    )
                );
            } catch (err) {
                console.error(`${logPrefix} ❌ Erreur génération code:`, err.message);
            }
        }, 8000);
    }

    kaya.decodeJid = jid => {
        if (!jid) return jid;
        if (/:/g.test(jid)) {
            const decode = jidDecode(jid) || {};
            return (decode.user && decode.server) ? `${decode.user}@${decode.server}` : jid;
        }
        return jid;
    };

    // Events (messages.upsert, messages.update, group-participants.update) identiques à ton code...
    kaya.ev.on("messages.upsert", async chatUpdate => {
        if (!isReady) return;
        try {
            const rawMsg = chatUpdate.messages[0];
            if (!rawMsg?.message || rawMsg.key?.id?.startsWith("BAE5")) return;
            const mek = smsg(kaya, rawMsg);
            const uniqueCommands = new Set(commands.values());
            for (const cmd of uniqueCommands) {
                if (typeof cmd.detect === "function") {
                    await cmd.detect(kaya, mek, mek.chat);
                }
            }
            await handler(kaya, mek, chatUpdate);
        } catch (err) {
            console.error(`${logPrefix} [MESSAGES ERROR]:`, err?.message || err);
        }
    });

    kaya.ev.on("messages.update", async updates => {
        if (!isReady) return;
        try { await handleAntiDelete(kaya, updates); } catch (err) {}
    });

    kaya.ev.on("group-participants.update", async update => {
        if (!isReady) return;
        try {
            const uniqueCommands = new Set(commands.values());
            for (const cmd of uniqueCommands) {
                if (typeof cmd.participantUpdate === "function") {
                    await cmd.participantUpdate(kaya, update);
                }
            }
        } catch (err) {}
    });

    // Connection Update
    kaya.ev.on("connection.update", async update => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            if (rentbotTracker.get(number)?.connection !== kaya) return;
            console.log(`${logPrefix} 🟢 Connexion réussie via MongoDB`);
            isReady = true;
            tracker.status = "connected";

            try {
                if (getSetting(number, "alwaysOnline", false)) {
                    startAlwaysOnline(kaya);
                }
            } catch (err) {}

            if (teleId && teleId !== "default") {
                const pairingFile = path.join(PAIRING_DIR, `pairing_${teleId}.json`);
                if (fs.existsSync(pairingFile)) fs.unlinkSync(pairingFile);
            }

            if (!tracker.isConnected) {
                tracker.isConnected = true;
                await sleep(4000);
                const statusFile = path.join(process.cwd(), "utils", "update_status.json");
                
                if (fs.existsSync(statusFile)) {
                    try { await sendConnectionOrUpdateMessage(kaya, number, statusFile); } catch (e) {}
                } else if (!getSetting(number, "botWelcomedOnce", false)) {
                    try {
                        await sendConnectionOrUpdateMessage(kaya, number, statusFile);
                        await setSetting(number, "botWelcomedOnce", true);
                    } catch (e) {}
                }
            }
        }

        if (connection === "close") {
            isReady = false;
            tracker.isConnected = false;
            if (rentbotTracker.get(number)?.connection !== kaya) return;

            const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(`${logPrefix} 🔴 Connexion fermée. Code: ${statusCode}`);

            if (statusCode === DisconnectReason.loggedOut || statusCode === 403 || statusCode === 401) {
                console.log(`${logPrefix} ⚠️ Session expirée ou rejetée (Code ${statusCode}). Nettoyage complet...`);
                try { destroySendQueue(kaya); } catch {}
                await forceCleanupSession(number, teleId);
                return;
            }

            try { destroySendQueue(kaya); } catch {}

            if (attempt < 10) {
                const backoffDelay = Math.min(15000 * Math.pow(2, attempt), 5 * 60 * 1000);
                await sleep(backoffDelay);
                if (rentbotTracker.get(number)?.connection !== kaya) return;
                startpairing(nexusDevNumber, teleId, userName, attempt + 1).catch(() => {});
            } else {
                await sleep(5 * 60 * 1000);
                if (rentbotTracker.get(number)?.connection !== kaya) return;
                startpairing(nexusDevNumber, teleId, userName, 0).catch(() => {});
            }
        }
    });

    kaya.ev.on("creds.update", () => {
        if (rentbotTracker.get(number)?.connection === kaya) {
            saveCreds().catch(() => {});
        }
    });

    return kaya;
}

// Normalisation message smsg inchangée...
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
        const quoted = m.msg?.contextInfo?.quotedMessage || null;
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
