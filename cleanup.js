import fs from 'fs';
import path from 'path';

export function startAutoCleanup() {
    console.log("🧹 [CLEANUP] Initialisation du nettoyage approfondi au démarrage...");
    const targetDir = process.cwd(); 
    const PAIRING_DIR = path.join(targetDir, "richstore", "pairing");

    try {
        console.log("🧹 [CLEANUP] Analyse et purge de l'espace de stockage...");
        let deletedCount = 0;

        // 1. Nettoyage agressif des fichiers temporaires, caches et webp à la racine ou dans le projet
        const cleanRecursiveDir = (dir) => {
            if (!fs.existsSync(dir)) return;
            const entries = fs.readdirSync(dir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    // Ne jamais toucher aux dossiers de sessions principaux ou creds.json
                    if (entry.name === 'pairing' || entry.name === 'node_modules' || entry.name === '.git') {
                        cleanRecursiveDir(fullPath);
                        continue;
                    }
                    // Supprimer d'autres sous-dossiers de cache ou temporaires s'ils existent
                    try {
                        fs.rmSync(fullPath, { recursive: true, force: true });
                        deletedCount++;
                    } catch (e) {}
                } else {
                    // Supprimer tous les fichiers temporaires, logs, webp orphelins, zip, etc.
                    if (
                        entry.name.startsWith('tmp_') || 
                        entry.name.startsWith('out_') || 
                        entry.name.endsWith('.webp') || 
                        entry.name.endsWith('.mp4') || 
                        entry.name.endsWith('.zip') ||
                        entry.name.endsWith('.log')
                    ) {
                        try {
                            fs.unlinkSync(fullPath);
                            deletedCount++;
                        } catch (e) {}
                    }
                }
            }
        };

        cleanRecursiveDir(targetDir);

        // 2. Nettoyage immédiat des fichiers de requêtes de pairage bloqués
        if (fs.existsSync(PAIRING_DIR)) {
            const pairingFiles = fs.readdirSync(PAIRING_DIR);
            pairingFiles.forEach(file => {
                if (file.startsWith('request_') || file.startsWith('pairing_')) {
                    const filePath = path.join(PAIRING_DIR, file);
                    try {
                        fs.unlinkSync(filePath);
                        deletedCount++;
                    } catch (e) {}
                }
            });

            // 3. Nettoyage à l'intérieur des dossiers de sessions (suppression des caches internes obsolètes sans toucher à creds.json)
            const sessionFolders = fs.readdirSync(PAIRING_DIR, { withFileTypes: true });
            
            sessionFolders.forEach(folder => {
                if (!folder.isDirectory()) return;

                const sessionPath = path.join(PAIRING_DIR, folder.name);
                const credsPath = path.join(sessionPath, "creds.json");
                
                // Si la session n'a pas de creds.json, on supprime carrément le dossier orphelin
                if (!fs.existsSync(credsPath)) {
                    try {
                        fs.rmSync(sessionPath, { recursive: true, force: true });
                        deletedCount++;
                        return;
                    } catch (e) {}
                }

                // Nettoyer les fichiers de cache internes inutiles dans la session (laissant creds.json et metadata.json intacts)
                try {
                    const innerFiles = fs.readdirSync(sessionPath);
                    innerFiles.forEach(file => {
                        if (file === "creds.json" || file === "metadata.json") return;

                        const innerFilePath = path.join(sessionPath, file);
                        try {
                            fs.rmSync(innerFilePath, { recursive: true, force: true });
                            deletedCount++;
                        } catch (e) {}
                    });
                } catch (e) {}
            });
        }

        console.log(`🧹 [CLEANUP] Nettoyage terminé avec succès : ${deletedCount} éléments obsolètes ou fichiers lourds purgés.`);

    } catch (err) {
        console.error('❌ Erreur lors du nettoyage approfondi au démarrage :', err);
    }
}
