// lib/activity.js - message counters per group (used by .top and .inactive)
import fs from 'fs';
import path from 'path';
import { normJid } from './common.js';

const BASE = fs.existsSync('/home/container/Kaya-MD') ? '/home/container/Kaya-MD' : process.cwd();
const data = new Map();      // ownerId -> { groups: { groupId: { week, since, counts, last } } }
const dirty = new Set();

const fileOf = (ownerId) => path.join(BASE, 'userall', ownerId, 'activity.json');
export const weekId = () => Math.floor((Date.now() + 3 * 86400000) / 604800000); // weeks start on Monday

function load(ownerId) {
    if (data.has(ownerId)) return data.get(ownerId);
    let d = { groups: {} };
    try {
        if (fs.existsSync(fileOf(ownerId))) d = JSON.parse(fs.readFileSync(fileOf(ownerId), 'utf8'));
    } catch {}
    data.set(ownerId, d);
    return d;
}

function group(ownerId, groupId) {
    const d = load(ownerId);
    const g = d.groups[groupId] || (d.groups[groupId] = { week: weekId(), since: Date.now(), counts: {}, last: {} });
    if (g.week !== weekId()) { g.week = weekId(); g.counts = {}; }
    return g;
}

export function record(ownerId, groupId, senderJid) {
    const g = group(ownerId, groupId);
    const key = normJid(senderJid);
    g.counts[key] = (g.counts[key] || 0) + 1;
    g.last[key] = Date.now();
    dirty.add(ownerId);
}

export const getGroupActivity = (ownerId, groupId) => group(ownerId, groupId);

export function resetGroup(ownerId, groupId) {
    delete load(ownerId).groups[groupId];
    dirty.add(ownerId);
}

export function flush() {
    for (const ownerId of dirty) {
        try {
            fs.mkdirSync(path.dirname(fileOf(ownerId)), { recursive: true });
            fs.writeFileSync(fileOf(ownerId), JSON.stringify(data.get(ownerId)));
        } catch (e) {
            console.error('[ACTIVITY] save error:', e.message);
        }
    }
    dirty.clear();
}

if (!globalThis.__kayaActivityFlush) {
    globalThis.__kayaActivityFlush = true;
    setInterval(flush, 5 * 60 * 1000).unref();
    process.on('exit', flush);
    for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { flush(); process.exit(0); });
}
