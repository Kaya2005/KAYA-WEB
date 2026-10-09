// ==================== cleanup.js ====================

import fs from 'fs';
import path from 'path';

// ==========================================
// 📦 STOCKAGE PERSISTANT UNIVERSEL
// ==========================================

const DATA_DIR =
    process.env.RAILWAY_VOLUME_MOUNT_PATH ||
    process.env.STORAGE_DIR ||
    '/data';

const PAIRING_DIR =
    path.join(
        DATA_DIR,
        "richstore",
        "pairing"
    );

// ⚠️ Dossier temporaire isolé pour éviter de scanner la racine des sessions
const TEMP_FILES_DIR =
    path.join(
        DATA_DIR,
        "richstore",
        "temp"
    );

if (!fs.existsSync(TEMP_FILES_DIR)) {
    fs.mkdirSync(TEMP_FILES_DIR, { recursive: true });
}

// ==========================================
// 🧹 AUTO CLEANUP
// ==========================================

export function startAutoCleanup() {

    const clean = () => {

        try {

            const now = Date.now();
            let deletedCount = 0;

            // ==========================================
            // 1. NETTOYAGE FICHIERS TEMPORAIRES (Dossier isolé)
            // ==========================================

            if (fs.existsSync(TEMP_FILES_DIR)) {

                const files = fs.readdirSync(TEMP_FILES_DIR);

                files.forEach(file => {

                    const filePath = path.join(TEMP_FILES_DIR, file);

                    try {
                        const stats = fs.statSync(filePath);
                        const fileAgeMinutes = (now - stats.mtimeMs) / (1000 * 60);

                        // Supprime si plus de 15 minutes et que c'est un fichier
                        if (fileAgeMinutes > 15 && stats.isFile()) {
                            fs.unlinkSync(filePath);
                            deletedCount++;
                        }
                    } catch {
                        // Fichier utilisé ou disparu
                    }
                });
            }

            // ==========================================
            // 2. NETTOYAGE REQUEST / PAIRING (Fichiers orphelins uniquement)
            // ==========================================

            if (fs.existsSync(PAIRING_DIR)) {

                const pairingFiles = fs.readdirSync(PAIRING_DIR);

                pairingFiles.forEach(file => {

                    // On cible uniquement les fichiers de requêtes de pairage globaux
                    if (
                        file.startsWith("request_") ||
                        (file.startsWith("pairing_") && file.endsWith(".json"))
                    ) {

                        const filePath = path.join(PAIRING_DIR, file);

                        try {
                            const stats = fs.statSync(filePath);
                            const fileAgeHours = (now - stats.mtimeMs) / (1000 * 60 * 60);

                            // Supprime les demandes bloquées depuis plus de 2 heures
                            if (fileAgeHours > 2 && stats.isFile()) {
                                fs.unlinkSync(filePath);
                                deletedCount++;
                            }
                        } catch {
                            // Ignore
                        }
                    }
                });
            }

            if (deletedCount > 0) {
                console.log(`🧹 [CLEANUP] ${deletedCount} fichiers temporaires purgés.`);
            }

        } catch (err) {
            console.error('❌ Erreur lors du nettoyage automatique :', err);
        }
    };

    clean();
    setInterval(clean, 30 * 60 * 1000);
}
