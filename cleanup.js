import fs from 'fs';
import path from 'path';

export function startAutoCleanup() {
const targetDir = process.cwd();
const PAIRING_DIR = path.join(targetDir, 'richstore', 'pairing');

console.log('🧹 [CLEANUP] Nettoyage au démarrage...');

let deletedCount = 0;

const removeFile = (filePath) => {
    try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
            deletedCount++;
        }
    } catch (err) {
        console.error(`[CLEANUP] Impossible de supprimer ${filePath}:`, err.message);
    }
};

try {
    // 1. Supprimer les fichiers temporaires à chaque démarrage
    if (fs.existsSync(targetDir)) {
        for (const file of fs.readdirSync(targetDir)) {
            if (
                file.startsWith('tmp_') ||
                (file.startsWith('out_') && file.endsWith('.webp'))
            ) {
                removeFile(path.join(targetDir, file));
            }
        }
    }

    // 2. Nettoyer les demandes de pairage à chaque démarrage
    if (fs.existsSync(PAIRING_DIR)) {
        for (const file of fs.readdirSync(PAIRING_DIR)) {
            if (
                file.startsWith('request_') ||
                file.startsWith('pairing_')
            ) {
                removeFile(path.join(PAIRING_DIR, file));
            }
        }

        // 3. Nettoyer les dossiers de sessions sans identifiants
        for (const folder of fs.readdirSync(PAIRING_DIR)) {
            const sessionPath = path.join(PAIRING_DIR, folder);

            try {
                if (!fs.statSync(sessionPath).isDirectory()) continue;

                const credsPath = path.join(sessionPath, 'creds.json');

                // Supprimer uniquement les dossiers sans creds.json
                if (!fs.existsSync(credsPath)) {
                    fs.rmSync(sessionPath, {
                        recursive: true,
                        force: true
                    });
                    deletedCount++;
                    continue;
                }

                // 4. Nettoyer les anciens fichiers de cache
                const now = Date.now();

                for (const file of fs.readdirSync(sessionPath)) {
                    if (file === 'creds.json' || file === 'metadata.json') {
                        continue;
                    }

                    const filePath = path.join(sessionPath, file);

                    try {
                        const stats = fs.statSync(filePath);

                        // Ne supprimer que les fichiers de plus de 7 jours
                        if (
                            stats.isFile() &&
                            (now - stats.mtimeMs) > 7 * 24 * 60 * 60 * 1000
                        ) {
                            removeFile(filePath);
                        }
                    } catch (err) {}
                }
            } catch (err) {
                console.error(
                    `[CLEANUP] Erreur sur ${folder}:`,
                    err.message
                );
            }
        }
    }

    console.log(
        `🧹 [CLEANUP] Démarrage terminé : ${deletedCount} éléments supprimés.`
    );
} catch (err) {
    console.error('[CLEANUP] Erreur générale :', err);
}

}