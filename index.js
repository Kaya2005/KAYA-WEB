import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import chalk from 'chalk';

import {
    restoreSessions,
    watchPairingRequests
} from './pair.js';

import {
    startAutoCleanup
} from './cleanup.js';

import {
    setSetting
} from './setting.js';

// ==========================================
// 📦 REPERTOIRE LOCAL DE STOCKAGE UNIFIÉ
// ==========================================

const BASE_DIR = fs.existsSync("/home/container/Kaya-MD")
    ? "/home/container/Kaya-MD"
    : process.cwd();

const RICHSTORE_DIR = path.join(BASE_DIR, 'data', 'richstore');
const PAIRING_DIR = path.join(RICHSTORE_DIR, 'pairing');

// ==========================================
// 📁 CRÉATION DES DOSSIERS
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
// 🔗 ROUTE API PAIRAGE (Optimisée asynchrone)
// ==========================================

app.post(
    '/api/connect',
    async (req, res) => {

        try {

            const {
                phone,
                botName,
                botPrefix,
                botImage
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

            try {
                if (botName && botName.trim() !== '') {
                    await setSetting(cleanNumber, 'botName', botName.trim());
                }
                if (botPrefix && botPrefix.trim() !== '') {
                    await setSetting(cleanNumber, 'prefix', botPrefix.trim());
                }
                if (botImage && botImage.trim() !== '') {
                    await setSetting(cleanNumber, 'userBotImage', botImage.trim());
                }
            } catch (err) {
                console.error('Erreur sauvegarde réglages optionnels:', err);
            }

            const requestPath =
                path.join(
                    PAIRING_DIR,
                    `request_${cleanNumber}.json`
                );

            const pairingFile =
                path.join(
                    PAIRING_DIR,
                    `pairing_${cleanNumber}.json`
                );

            if (fs.existsSync(pairingFile)) {
                await fsPromises.unlink(pairingFile).catch(() => {});
            }

            // ==========================================
            // DEMANDE DE PAIRAGE
            // ==========================================

            await fsPromises.writeFile(
                requestPath,
                JSON.stringify({
                    jid:
                        cleanNumber +
                        '@s.whatsapp.net',

                    name:
                        (botName && botName.trim() !== '') ? botName.trim() : 'Web User'
                })
            );

            // ==========================================
            // ATTENTE DU CODE (Asynchrone non bloquant)
            // ==========================================

            let attempts = 0;
            let codeData = null;

            while (
                attempts < 25
            ) {

                if (
                    fs.existsSync(
                        pairingFile
                    )
                ) {

                    try {
                        const fileContent = await fsPromises.readFile(pairingFile, 'utf-8');
                        codeData = JSON.parse(fileContent);
                        break;
                    } catch (e) {
                        // Fichier potentiellement en cours d'écriture, on réessaie au tour suivant
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
    async (req, res) => {

        try {
            if (!fs.existsSync(PAIRING_DIR)) {
                return res.json({ total: 0 });
            }

            const files =
                await fsPromises.readdir(
                    PAIRING_DIR
                );

            const filteredFiles = files.filter(
                file => file.startsWith('pairing_')
            );

            res.json({
                total:
                    filteredFiles.length
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
// 👥 NOMBRE DE SESSIONS CONNECTÉES
// ==========================================

app.get(
    '/api/online-count',
    async (req, res) => {

        try {
            if (!fs.existsSync(PAIRING_DIR)) {
                return res.json({ success: true, totalConnected: 0 });
            }

            const entries = await fsPromises.readdir(PAIRING_DIR, { withFileTypes: true });

            let sessionCount = 0;
            for (const entry of entries) {
                if (entry.isDirectory()) {
                    const credsPath = path.join(PAIRING_DIR, entry.name, 'creds.json');
                    if (fs.existsSync(credsPath)) {
                        sessionCount++;
                    }
                }
            }

            res.json({
                success: true,
                totalConnected: sessionCount
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
// 📋 LISTE DES NUMÉROS CONNECTÉS
// ==========================================

app.get('/api/connected-list', async (req, res) => {
    try {
        if (!fs.existsSync(PAIRING_DIR)) {
            return res.json({ success: true, numbers: [] });
        }

        const entries = await fsPromises.readdir(PAIRING_DIR, { withFileTypes: true });
        const numbers = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const credsPath = path.join(PAIRING_DIR, entry.name, 'creds.json');
                if (fs.existsSync(credsPath)) {
                    numbers.push(entry.name);
                }
            }
        }

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
                    `📂 Sessions : ${PAIRING_DIR}`
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
                2000
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
