import './config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { forceCleanupSession } from './pair.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pairingFolder = path.join(__dirname, './richstore/pairing');

const app = express();
app.use(express.json());

// 🌐 Autoriser les requêtes venant de ton site Vercel
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Fonction utilitaire pour compter les sessions actives
const getActiveSessions = () => {
    if (!fs.existsSync(pairingFolder)) return [];
    return fs.readdirSync(pairingFolder, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(folderName => {
            const credsPath = path.join(pairingFolder, folderName, 'creds.json');
            return fs.existsSync(credsPath);
        });
};

// ================= API ENDPOINTS =================

// 1. Route pour lister les sessions actives
app.get('/api/listpair', (req, res) => {
    try {
        const activeSessions = getActiveSessions();
        res.json({ total: activeSessions.length, sessions: activeSessions });
    } catch (e) {
        res.status(500).json({ total: 0, error: e.message });
    }
});

// 2. Route pour générer le code de pairage WhatsApp
app.post('/api/connect', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ success: false, message: 'Le numéro de téléphone est requis.' });
        }

        const number = phone.replace(/\D/g, '');
        if (number.length < 9) {
            return res.status(400).json({ success: false, message: 'Numéro invalide (minimum 9 chiffres).' });
        }

        const activeSessions = getActiveSessions();
        if (activeSessions.length >= 60) {
            return res.status(403).json({ success: false, message: 'Capacité maximale du serveur atteinte (60/60).' });
        }

        const jid = number + "@s.whatsapp.net";
        const identifier = number;

        const requestPath = path.join(pairingFolder, `request_${identifier}.json`);
        const pairingFile = path.join(pairingFolder, `pairing_${identifier}.json`);

        if (fs.existsSync(pairingFile)) {
            fs.unlinkSync(pairingFile);
        }

        fs.writeFileSync(requestPath, JSON.stringify({ jid, name: `WebUser_${number}` }));

        let attempts = 0;
        let cuObj = null;

        while (attempts < 25) {
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
            return res.status(500).json({ success: false, message: "Délai dépassé : Le code de pairage n'a pas pu être généré." });
        }

    } catch (err) {
        console.error('[API CONNECT ERROR]:', err);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur Web API (bot.js) en écoute sur le port ${PORT}`);
});
