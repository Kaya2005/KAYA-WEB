// ==================== server.js (ou index.js) ====================

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { MongoClient } from 'mongodb';

import {
    restoreSessions,
    watchPairingRequests
} from './pair.js';

import {
    startAutoCleanup
} from './cleanup.js';

// ==========================================
// 📦 STOCKAGE PERSISTANT UNIVERSEL
// ==========================================

const DATA_DIR =
    process.env.RAILWAY_VOLUME_MOUNT_PATH ||
    process.env.STORAGE_DIR ||
    path.join(process.cwd(), 'data');

const RICHSTORE_DIR =
    path.join(DATA_DIR, 'richstore');

const PAIRING_DIR =
    path.join(RICHSTORE_DIR, 'pairing');

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
    }
    return sessionsCollection;
}

// ==========================================
// 📁 CRÉATION DES DOSSIERS DE PAIRAGE TEMPORAIRE
// ==========================================

if (!fs.existsSync(RICHSTORE_DIR)) {
    fs.mkdirSync(
        RICHSTORE_DIR,
        { recursive: true }
    );
}

if (!fs.existsSync(PAIRING_DIR)) {
    fs.mkdirSync(
        PAIRING_DIR,
        { recursive: true }
    );
}

// ==========================================
// EXPRESS
// ==========================================

const app = express();

const PORT =
    process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// ==========================================
// 🔗 ROUTE API PAIRAGE
// ==========================================

app.post(
    '/api/connect',
    async (req, res) => {

        try {

            const {
                phone
            } = req.body;

            if (!phone) {

                return res.status(400).json({
                    success: false,
                    message:
                        'Phone number is required'
                });
            }

            const cleanNumber =
                phone.replace(
                    /[^0-9]/g,
                    ''
                );

            if (
                cleanNumber.length < 9
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        'Invalid phone number'
                });
            }

            const webSessionId =
                'web_' + Date.now();

            const requestPath =
                path.join(
                    PAIRING_DIR,
                    `request_${webSessionId}.json`
                );

            const pairingFile =
                path.join(
                    PAIRING_DIR,
                    `pairing_${webSessionId}.json`
                );

            // ==========================================
            // DEMANDE DE PAIRAGE
            // ==========================================

            fs.writeFileSync(
                requestPath,
                JSON.stringify({
                    jid:
                        cleanNumber +
                        '@s.whatsapp.net',

                    name:
                        'Web User'
                })
            );

            // ==========================================
            // ATTENTE DU CODE
            // ==========================================

            let attempts = 0;

            let codeData = null;

            while (
                attempts < 20
            ) {

                if (
                    fs.existsSync(
                        pairingFile
                    )
                ) {

                    try {

                        codeData =
                            JSON.parse(
                                fs.readFileSync(
                                    pairingFile,
                                    'utf-8'
                                )
                            );

                        break;

                    } catch (e) {

                        console.error(
                            'Erreur lecture fichier pairing:',
                            e.message
                        );
                    }
                }

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            1000
                        )
                );

                attempts++;
            }

            // ==========================================
            // CODE TROUVÉ
            // ==========================================

            if (
                codeData &&
                codeData.code
            ) {

                return res.json({
                    success: true,
                    code:
                        codeData.code
                });
            }

            // ==========================================
            // TIMEOUT
            // ==========================================

            return res.status(500).json({
                success: false,
                message:
                    'Timeout generating pairing code.'
            });

        } catch (error) {

            console.error(
                'Erreur /api/connect:',
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    'Internal server error'
            });
        }
    }
);

// ==========================================
// 📊 NOMBRE DE PAIRAGES EN ATTENTE
// ==========================================

app.get(
    '/api/listpair',
    (req, res) => {

        try {

            const files =
                fs
                    .readdirSync(
                        PAIRING_DIR
                    )
                    .filter(
                        file =>
                            file.startsWith(
                                'pairing_'
                            )
                    );

            res.json({
                total:
                    files.length
            });

        } catch (error) {

            console.error(
                'Erreur listpair:',
                error.message
            );

            res.json({
                total: 0
            });
        }
    }
);

// ==========================================
// 👥 NOMBRE DE SESSIONS CONNECTÉES (MongoDB)
// ==========================================

app.get(
    '/api/online-count',
    async (req, res) => {

        try {
            const collection = await getMongoCollection();
            const storedCreds = await collection.distinct("id");
            // Filtre pour ne garder que les identifiants valides (ex: numéros de téléphone)
            const validSessions = storedCreds.filter(id => id && !id.includes("-"));

            res.json({
                success: true,
                totalConnected: validSessions.length
            });

        } catch (error) {
            console.error('Erreur online-count:', error.message);
            res.status(500).json({
                success: false,
                totalConnected: 0
            });
        }
    }
);

// ==========================================
// 📋 LISTE DES NUMÉROS CONNECTÉS (MongoDB)
// ==========================================

app.get('/api/connected-list', async (req, res) => {
    try {
        const collection = await getMongoCollection();
        const storedCreds = await collection.distinct("id");
        const numbers = storedCreds.filter(id => id && !id.includes("-"));

        res.json({ success: true, numbers });
    } catch (error) {
        console.error('Erreur /api/connected-list:', error.message);
        res.status(500).json({ success: false, numbers: [] });
    }
});

// ==========================================
// 🚀 LANCEMENT DU BOT
// ==========================================

async function launchBot() {

    global.botName =
        'KAYA-MD';

    // ==========================================
    // CLEANUP
    // ==========================================

    startAutoCleanup();

    // ==========================================
    // SERVEUR
    // ==========================================

    app.listen(
        PORT,
        () => {

            console.log(
                chalk.green(
                    `🌐 Server running on port ${PORT}`
                )
            );

            console.log(
                chalk.green(
                    `💾 Stockage persistant : ${DATA_DIR}`
                )
            );

            console.log(
                chalk.green(
                    `📂 Pairing : ${PAIRING_DIR}`
                )
            );
        }
    );

    // ==========================================
    // RESTAURATION DES SESSIONS
    // ==========================================

    console.log(
        chalk.blue(
            '⏳ Restauration des sessions en cours...'
        )
    );

    await restoreSessions();

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                5000
            )
    );

    // ==========================================
    // WATCHER
    // ==========================================

    console.log(
        chalk.blue(
            '🚀 Surveillance des demandes de pairage activée.'
        )
    );

    watchPairingRequests();
}

// ==========================================
// START
// ==========================================

launchBot().catch(
    error => {

        console.error(
            chalk.red(
                '❌ Erreur au démarrage du bot:'
            ),
            error
        );

        process.exit(1);
    }
);
