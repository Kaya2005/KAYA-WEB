// bot.js
import './config.js'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { watchPairingRequests, restoreSessions, getActiveSessions } from './pair.js'; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pairingFolder = path.join(__dirname, './richstore/pairing');
if (!fs.existsSync(pairingFolder)) {
    fs.mkdirSync(pairingFolder, { recursive: true });
}

// ================= ROUTES WEB =================
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

app.listen(PORT, async () => {
    console.log(`▉ KAYA WEB SERVER is running on port ${PORT}`);
    
    // Lancement des écouteurs et restauration des sessions en arrière-plan
    watchPairingRequests();
    await restoreSessions();
});
