// ==================== setting.js ====================

import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

// ==========================================
// 📦 STOCKAGE PERSISTANT UNIVERSEL
// ==========================================

const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || process.env.STORAGE_DIR || path.join(process.cwd(), "data");

// 🚀 CACHE EN MÉMOIRE
const cache = new Map();

/**
 * Extrait un ID numérique propre
 * ex: "243xxxx:12@s.whatsapp.net" -> "243xxxx"
 */
function cleanId(id) {
    if (!id) return '';

    return String(id)
        .split('@')[0]
        .split(':')[0]
        .replace(/[^0-9]/g, '');
}

/**
 * Génère le chemin du fichier de configuration.
 *
 * Les réglages sont maintenant sauvegardés dans :
 *
 * /data/userall/NUMERO/settings.json
 *
 * et pour un groupe :
 *
 * /data/userall/NUMERO/GROUPE/settings.json
 */
function getSettingsPath(
    ownerId,
    groupId = null,
    createIfMissing = false
) {

    const cleanOwnerId =
        cleanId(ownerId);

    // 🛡️ Sécurité
    if (!cleanOwnerId) {
        return null;
    }

    let baseDir;

    if (groupId) {

        const cleanGroupId =
            cleanId(groupId);

        baseDir = path.join(
            DATA_DIR,
            "userall",
            cleanOwnerId,
            cleanGroupId
        );

    } else {

        baseDir = path.join(
            DATA_DIR,
            "userall",
            cleanOwnerId
        );
    }

    // Création du dossier si nécessaire avec gestion d'erreur sécurisée
    if (createIfMissing) {
        try {
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(
                    baseDir,
                    {
                        recursive: true
                    }
                );
            }
        } catch (err) {
            console.error(`[SETTING] Erreur création dossier ${baseDir}:`, err);
        }
    }

    return path.join(
        baseDir,
        "settings.json"
    );
}

/**
 * Récupère un réglage (force la lecture disque si besoin)
 */
export function getSetting(
    ownerId,
    key,
    defaultValue = false,
    groupId = null
) {

    const cleanOwnerId =
        cleanId(ownerId);

    if (!cleanOwnerId) {
        return defaultValue;
    }

    const cleanGroupId =
        groupId
            ? cleanId(groupId)
            : null;

    const cacheKey =
        cleanGroupId
            ? `${cleanOwnerId}:${cleanGroupId}`
            : cleanOwnerId;

    // ==========================================
    // LECTURE DIRECTE / CACHE MIS À JOUR
    // ==========================================

    try {

        const filePath =
            getSettingsPath(
                ownerId,
                groupId,
                false
            );

        if (
            filePath &&
            fs.existsSync(filePath)
        ) {

            const fileContent = fs.readFileSync(filePath, "utf8");
            const data =
                JSON.parse(
                    fileContent || "{}"
                );

            cache.set(
                cacheKey,
                data
            );

        } else if (!cache.has(cacheKey)) {

            cache.set(
                cacheKey,
                {}
            );
        }

    } catch (e) {

        console.error(
            `[SETTING] Erreur lecture ${cacheKey}:`,
            e
        );

        if (!cache.has(cacheKey)) {
            cache.set(cacheKey, {});
        }
    }

    const settings =
        cache.get(cacheKey);

    return settings &&
        Object.prototype.hasOwnProperty.call(
            settings,
            key
        )
        ? settings[key]
        : defaultValue;
}

/**
 * Enregistre un réglage
 */
export async function setSetting(
    ownerId,
    key,
    value,
    groupId = null
) {

    const cleanOwnerId =
        cleanId(ownerId);

    if (!cleanOwnerId) {
        return;
    }

    try {

        const cleanGroupId =
            groupId
                ? cleanId(groupId)
                : null;

        const cacheKey =
            cleanGroupId
                ? `${cleanOwnerId}:${cleanGroupId}`
                : cleanOwnerId;

        // ==========================================
        // CHARGEMENT DU CACHE
        // ==========================================

        getSetting(
            ownerId,
            key,
            false,
            groupId
        );

        const settings =
            cache.get(cacheKey) || {};

        // ==========================================
        // MODIFICATION
        // ==========================================

        settings[key] =
            value;

        cache.set(
            cacheKey,
            settings
        );

        // ==========================================
        // SAUVEGARDE PERSISTANTE
        // ==========================================

        const filePath =
            getSettingsPath(
                ownerId,
                groupId,
                true
            );

        if (filePath) {

            // Vérification de sécurité supplémentaire juste avant l'écriture
            const parentDir = path.dirname(filePath);
            if (!fs.existsSync(parentDir)) {
                fs.mkdirSync(parentDir, { recursive: true });
            }

            await writeFile(
                filePath,
                JSON.stringify(
                    settings,
                    null,
                    2
                ),
                "utf8"
            );
        }

    } catch (e) {

        console.error(
            `[SETTING] Erreur sauvegarde ${ownerId}:`,
            e
        );
    }
}
