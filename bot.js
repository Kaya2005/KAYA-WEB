import './config.js'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import localtunnel from 'localtunnel';
import { watchPairingRequests, restoreSessions, getActiveSessions } from './pair.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS sécurisée avec ton domaine Vercel
app.use(cors({
    origin: 'https://kaya-bot-drab.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pairingFolder = path.join(__dirname, './richstore/pairing');
if (!fs.existsSync(pairingFolder)) {
    fs.mkdirSync(pairingFolder, { recursive: true });
}

// ================= ROUTES API =================

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

        const requestPath = path.join(pairingFolder, `request_${webSessionId}.json`);
        fs.writeFileSync(requestPath, JSON.stringify({ jid, name: "WebUser" }));

        let attempts = 0;
        let cuObj = null;
        const pairingFile = path.join(pairingFolder, `pairing_${webSessionId}.json`);

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

// Écoute sur '0.0.0.0' et lancement automatique du tunnel HTTPS
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`▉ KAYA WEB SERVER is running on port ${PORT}`);
    watchPairingRequests();
    await restoreSessions();

    try {
        const tunnel = await localtunnel({ port: PORT });
        console.log(`🚀 URL HTTPS sécurisée (à copier dans Vercel) : ${tunnel.url}`);
        
        tunnel.on('close', () => {
            console.log('⚠️ Le tunnel Localtunnel a été fermé.');
        });
    } catch (error) {
        console.error('Erreur lors de la création du tunnel HTTPS :', error);
    }
});
