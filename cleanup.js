// ==================== cleanup.js ====================

import fs from 'fs';
import path from 'path';

// ==========================================
// 📦 STOCKAGE PERSISTANT RAILWAY
// ==========================================

const DATA_DIR =
    process.env.RAILWAY_VOLUME_MOUNT_PATH ||
    "/data";

const PAIRING_DIR =
    path.join(
        DATA_DIR,
        "richstore",
        "pairing"
    );

// ==========================================
// 🧹 AUTO CLEANUP
// ==========================================

export function startAutoCleanup() {

    // ==========================================
    // 📁 DOSSIER TEMPORAIRE
    // ==========================================
    // On garde les fichiers temporaires dans
    // /data afin qu'ils soient centralisés.
    // ==========================================

    const TEMP_DIR =
        DATA_DIR;

    const clean = () => {

        try {

            const now =
                Date.now();

            let deletedCount =
                0;

            // ==========================================
            // 1. NETTOYAGE FICHIERS TEMPORAIRES
            // ==========================================

            if (
                fs.existsSync(
                    TEMP_DIR
                )
            ) {

                const files =
                    fs.readdirSync(
                        TEMP_DIR
                    );

                files.forEach(
                    file => {

                        // Fichiers temporaires
                        if (
                            file.startsWith(
                                "tmp_"
                            ) ||
                            (
                                file.startsWith(
                                    "out_"
                                ) &&
                                file.endsWith(
                                    ".webp"
                                )
                            )
                        ) {

                            const filePath =
                                path.join(
                                    TEMP_DIR,
                                    file
                                );

                            try {

                                const stats =
                                    fs.statSync(
                                        filePath
                                    );

                                const fileAgeMinutes =
                                    (
                                        now -
                                        stats.mtimeMs
                                    ) /
                                    (
                                        1000 *
                                        60
                                    );

                                // Plus de 15 minutes
                                if (
                                    fileAgeMinutes >
                                    15
                                ) {

                                    fs.unlinkSync(
                                        filePath
                                    );

                                    deletedCount++;
                                }

                            } catch {
                                // Fichier utilisé ou disparu
                            }
                        }
                    }
                );
            }

            // ==========================================
            // 2. NETTOYAGE REQUEST / PAIRING
            // ==========================================

            if (
                fs.existsSync(
                    PAIRING_DIR
                )
            ) {

                const pairingFiles =
                    fs.readdirSync(
                        PAIRING_DIR
                    );

                pairingFiles.forEach(
                    file => {

                        if (
                            file.startsWith(
                                "request_"
                            ) ||
                            file.startsWith(
                                "pairing_"
                            )
                        ) {

                            const filePath =
                                path.join(
                                    PAIRING_DIR,
                                    file
                                );

                            try {

                                const stats =
                                    fs.statSync(
                                        filePath
                                    );

                                const fileAgeHours =
                                    (
                                        now -
                                        stats.mtimeMs
                                    ) /
                                    (
                                        1000 *
                                        60 *
                                        60
                                    );

                                // Supprime les demandes
                                // bloquées depuis plus de 2 heures
                                if (
                                    fileAgeHours >
                                    2
                                ) {

                                    fs.unlinkSync(
                                        filePath
                                    );

                                    deletedCount++;
                                }

                            } catch {
                                // Ignore
                            }
                        }
                    }
                );

                // ==========================================
                // 3. SESSIONS WHATSAPP
                // ==========================================
                //
                // ⚠️ IMPORTANT :
                //
                // NE PAS supprimer les fichiers
                // présents dans les dossiers de session.
                //
                // Baileys utilise plusieurs fichiers :
                //
                // creds.json
                // app-state-sync-key-*
                // pre-key-*
                // sender-key-*
                // session-*
                // etc.
                //
                // Les supprimer peut casser la session.
                // ==========================================

                const entries =
                    fs.readdirSync(
                        PAIRING_DIR,
                        {
                            withFileTypes: true
                        }
                    );

                entries.forEach(
                    entry => {

                        if (
                            !entry.isDirectory()
                        ) {
                            return;
                        }

                        // On ne touche absolument pas
                        // au contenu des sessions.
                    }
                );
            }

            // ==========================================
            // LOG
            // ==========================================

            if (
                deletedCount > 0
            ) {

                console.log(
                    `🧹 [CLEANUP] ${deletedCount} fichiers temporaires ou fichiers de pairing purgés.`
                );
            }

        } catch (err) {

            console.error(
                '❌ Erreur lors du nettoyage automatique :',
                err
            );
        }
    };

    // ==========================================
    // NETTOYAGE AU DÉMARRAGE
    // ==========================================

    clean();

    // ==========================================
    // NETTOYAGE TOUTES LES 30 MINUTES
    // ==========================================

    setInterval(
        clean,
        30 * 60 * 1000
    );
}