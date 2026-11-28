// lib/blacklist.js - global blacklist shared by every session (data/blacklist.json)
import fs from 'fs';
import path from 'path';

const BASE = fs.existsSync('/home/container/Kaya-MD') ? '/home/container/Kaya-MD' : process.cwd();
const FILE = path.join(BASE, 'data', 'blacklist.json');

const digits = (id) => String(id || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '');

let list = {};
try {
    if (fs.existsSync(FILE)) list = JSON.parse(fs.readFileSync(FILE, 'utf8')) || {};
} catch {}

function save() {
    try {
        fs.mkdirSync(path.dirname(FILE), { recursive: true });
        fs.writeFileSync(FILE, JSON.stringify(list));
    } catch (e) {
        console.error('[BLACKLIST] save error:', e.message);
    }
}

export const isBlacklisted = (id) => {
    const n = digits(id);
    return Boolean(n) && Object.prototype.hasOwnProperty.call(list, n);
};
export const addBlacklist = (id, reason = '') => { const n = digits(id); if (n) { list[n] = { reason, at: Date.now() }; save(); } return n; };
export const removeBlacklist = (id) => { const n = digits(id); const had = n in list; delete list[n]; if (had) save(); return had; };
export const listBlacklist = () => Object.entries(list).map(([n, v]) => ({ number: n, ...v }));
