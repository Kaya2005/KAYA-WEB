// ==================== commands/sessions.js ====================
import fs from 'fs';
import path from 'path';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId } from '../lib/common.js';
import { isMaster, MASTERS, NO_MASTER_TEXT } from '../lib/master.js';

const BASE = fs.existsSync('/home/container/Kaya-MD') ? '/home/container/Kaya-MD' : process.cwd();
const PAIRING_DIR = path.join(BASE, 'data', 'richstore', 'pairing');

// Sessions that are not connected and whose credentials have not changed for `days` days
function findStale(days) {
    const limit = Date.now() - days * 86400000;
    const stale = [];
    if (!fs.existsSync(PAIRING_DIR)) return stale;

    for (const folder of fs.readdirSync(PAIRING_DIR)) {
        const creds = path.join(PAIRING_DIR, folder, 'creds.json');
        if (!/^\d+$/.test(folder) || !fs.existsSync(creds)) continue;
        if (isMaster(folder)) continue;
        if (globalThis.kayaSessions?.get(folder)?.isConnected) continue;

        const mtime = fs.statSync(creds).mtimeMs;
        if (mtime < limit) stale.push({ number: folder, days: Math.floor((Date.now() - mtime) / 86400000) });
    }
    return stale.sort((a, b) => b.days - a.days);
}

export default {
    name: 'sessions',
    description: 'List and clean dead sessions (master only)',
    category: 'Owner',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        if (!MASTERS.length) return await kaya.sendMessage(from, { text: errorBox(NO_MASTER_TEXT) }, { quoted: mek });
        if (!isMaster(getOwnerId(kaya)) || !mek.key?.fromMe) {
            return await kaya.sendMessage(from, { text: errorBox('Master only.') }, { quoted: mek });
        }

        const action = args[0]?.toLowerCase();
        const days = Math.max(1, parseInt(args[1], 10) || 30);

        if (action === 'inactive') {
            const stale = findStale(days);
            const content = stale.length
                ? stale.slice(0, 40).map(s => `• +${s.number} (${s.days} d)`).join('\n') + (stale.length > 40 ? `\n... +${stale.length - 40}` : '')
                : 'No dead session found.';
            return await kaya.sendMessage(from, {
                text: boxMessage(`DEAD SESSIONS (${days}+ days)`, content + `\n\nTo delete: \`${prefix}sessions clean ${days} confirm\``, '🧹')
            }, { quoted: mek });
        }

        if (action === 'clean') {
            if (args[2]?.toLowerCase() !== 'confirm') {
                return await kaya.sendMessage(from, { text: errorBox(`This deletes the sessions and their settings.\nCheck first with ${prefix}sessions inactive ${days}\nthen: ${prefix}sessions clean ${days} confirm`) }, { quoted: mek });
            }
            const cleanup = globalThis.kayaForceCleanup;
            if (typeof cleanup !== 'function') {
                return await kaya.sendMessage(from, { text: errorBox('Cleanup function not available (update pair.js).') }, { quoted: mek });
            }
            const stale = findStale(days);
            for (const s of stale) cleanup(s.number);
            return await kaya.sendMessage(from, { text: successBox(`${stale.length} dead session(s) deleted.`) }, { quoted: mek });
        }

        let connected = 0;
        let total = 0;
        for (const [, t] of globalThis.kayaSessions || []) { total++; if (t.isConnected) connected++; }
        const folders = fs.existsSync(PAIRING_DIR)
            ? fs.readdirSync(PAIRING_DIR).filter(f => /^\d+$/.test(f) && fs.existsSync(path.join(PAIRING_DIR, f, 'creds.json'))).length
            : 0;

        await kaya.sendMessage(from, {
            text: boxMessage('SESSIONS',
                `• *Saved sessions:* ${folders}\n• *Connected now:* ${connected}/${total}\n\n` +
                `• \`${prefix}sessions inactive 30\`\n• \`${prefix}sessions clean 30 confirm\``, '📋')
        }, { quoted: mek });
    }
};
