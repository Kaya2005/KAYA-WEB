import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { restoreSessions, watchPairingRequests } from './pair.js';
import { startAutoCleanup } from './cleanup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RICHSTORE_DIR = path.join(__dirname, 'richstore');
const PAIRING_DIR = path.join(RICHSTORE_DIR, 'pairing');

// Créer les dossiers nécessaires
if (!fs.existsSync(RICHSTORE_DIR)) {
    fs.mkdirSync(RICHSTORE_DIR, { recursive: true });
}

if (!fs.existsSync(PAIRING_DIR)) {
    fs.mkdirSync(PAIRING_DIR, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route API pour le pairage
app.post('/api/connect', async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        const cleanNumber = phone.replace(/[^0-9]/g, '');

        if (cleanNumber.length < 9) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number'
            });
        }

        const webSessionId = 'web_' + Date.now();

        const requestPath = path.join(
            PAIRING_DIR,
            `request_${webSessionId}.json`
        );

        const pairingFile = path.join(
            PAIRING_DIR,
            `pairing_${webSessionId}.json`
        );

        fs.writeFileSync(
            requestPath,
            JSON.stringify({
                jid: cleanNumber + '@s.whatsapp.net',
                name: 'Web User'
            })
        );

        let attempts = 0;
        let codeData = null;

        while (attempts < 20) {
            if (fs.existsSync(pairingFile)) {
                try {
                    codeData = JSON.parse(
                        fs.readFileSync(pairingFile, 'utf-8')
                    );
                    break;
                } catch (e) {
                    console.error(
                        'Erreur lecture fichier pairing:',
                        e.message
                    );
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
        }

        if (codeData && codeData.code) {
            return res.json({
                success: true,
                code: codeData.code
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Timeout generating pairing code.'
        });

    } catch (error) {
        console.error('Erreur /api/connect:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Route pour compter les sessions actives
app.get('/api/listpair', (req, res) => {
    try {
        const files = fs
            .readdirSync(PAIRING_DIR)
            .filter(file => file.startsWith('pairing_'));

        res.json({
            total: files.length
        });

    } catch (error) {
        console.error('Erreur listpair:', error.message);

        res.json({
            total: 0
        });
    }
});

async function launchBot() {
    global.botName = 'KAYA-MD';

    startAutoCleanup();

    app.listen(PORT, () => {
        console.log(
            chalk.green(
                `🌐 Railway backend running on port ${PORT}`
            )
        );
    });

    console.log(
        chalk.blue('⏳ Restauration des sessions en cours...')
    );

    await restoreSessions();

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(
        chalk.blue(
            '🚀 Surveillance des demandes de pairage activée.'
        )
    );

    watchPairingRequests();
}

launchBot().catch(error => {
    console.error(
        chalk.red('❌ Erreur au démarrage du bot:'),
        error
    );

    process.exit(1);
});