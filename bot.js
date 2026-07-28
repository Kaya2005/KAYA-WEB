import './config.js'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { tunnel } from 'cloudflared'; // 📦 Remplacement de localtunnel par cloudflared
import mongoose from 'mongoose';
import { watchPairingRequests, restoreSessions, getActiveSessions } from './pair.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 🌐 Configuration CORS pour autoriser ton site sur Vercel
app.use(cors({
    origin: ['https://kaya-bot-drab.vercel.app', '*'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Bypass-Tunnel-Reminders']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pairingFolder = path.join(__dirname, './richstore/pairing');
if (!fs.existsSync(pairingFolder)) {
    fs.mkdirSync(pairingFolder, { recursive: true });
}

// Schéma Mongoose pour enregistrer l'URL dynamique du tunnel
const TunnelSchema = new mongoose.Schema({ url: String });
const TunnelModel = mongoose.model('Tunnel', TunnelSchema);

// ================= ROUTES API =================

// Route appelée par Vercel pour récupérer l'URL active du serveur
app.get('/api/get-url', async (req, res) => {
    try {
        const config = await TunnelModel.findOne({});
        res.json({ url: config ? config.url : '' });
    } catch (e) {
        res.json({ url: '' });
    }
});

// Route de pairage connectée à ton code pair.js
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

// Démarrage du serveur sur le Panel
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`▉ KAYA WEB SERVER is running on port ${PORT}`);
    watchPairingRequests();
    await restoreSessions();

    try {
        // 🚀 Lancement du tunnel Cloudflare HTTPS ultra-stable
        const cloudflareTunnel = await tunnel({ url: `http://localhost:${PORT}` });
        const tunnelUrl = await cloudflareTunnel.url;
        console.log(`🚀 URL Cloudflare HTTPS sécurisée : ${tunnelUrl}`);
        
        await TunnelModel.findOneAndUpdate(
            {}, 
            { url: tunnelUrl }, 
            { upsert: true, new: true }
        );
        console.log('💾 URL dynamique sauvegardée en base de données avec succès !');
    } catch (error) {
        console.error('Erreur lors de la création du tunnel Cloudflare :', error);
    }
});
