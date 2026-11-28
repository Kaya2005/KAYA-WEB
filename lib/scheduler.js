// lib/scheduler.js - scheduled messages shared by .schedule and .remind
import { getSetting, setSetting } from '../setting.js';
import { delay } from './common.js';

export const DEFAULT_TZ = 'Africa/Kinshasa';
export const getTz = (ownerId) => getSetting(ownerId, 'tz', DEFAULT_TZ) || DEFAULT_TZ;

export function isValidTz(tz) {
    try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch { return false; }
}

// Next time HH:MM happens in the time zone `tz` (epoch ms)
export function nextOccurrence(h, m, tz) {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(new Date());
    const o = {};
    parts.forEach(p => { o[p.type] = p.value; });
    const nowSec = Math.floor(Date.now() / 1000) * 1000;
    const offset = Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute, +o.second) - nowSec;
    let target = Date.UTC(+o.year, +o.month - 1, +o.day, h, m, 0) - offset;
    if (target <= Date.now() + 1000) target += 24 * 3600 * 1000;
    return target;
}

// "30m" "2h" "1d" "45s" or "18:30" -> epoch ms (or null)
export function parseWhen(str, tz) {
    const rel = /^(\d+)(s|m|h|d)$/i.exec(str || '');
    if (rel) {
        const mult = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[rel[2].toLowerCase()];
        return Date.now() + Number(rel[1]) * mult;
    }
    const abs = /^(\d{1,2}):(\d{2})$/.exec(str || '');
    if (abs && +abs[1] < 24 && +abs[2] < 60) return nextOccurrence(+abs[1], +abs[2], tz);
    return null;
}

export const formatAt = (ts, tz) =>
    new Date(ts).toLocaleString('en-GB', { timeZone: tz, dateStyle: 'short', timeStyle: 'short' });

export function addScheduled(ownerId, item) {
    const list = getSetting(ownerId, 'schedules', []);
    const next = (Array.isArray(list) ? list : []).concat([{ id: Date.now().toString(36), ...item }]);
    setSetting(ownerId, 'schedules', next);
}

export const listScheduled = (ownerId, filter) => {
    const list = getSetting(ownerId, 'schedules', []);
    return (Array.isArray(list) ? list : []).filter(filter || (() => true)).sort((a, b) => a.at - b.at);
};

export function removeScheduled(ownerId, id) {
    const list = getSetting(ownerId, 'schedules', []);
    setSetting(ownerId, 'schedules', (Array.isArray(list) ? list : []).filter(i => i.id !== id));
}

async function tick() {
    const sessions = globalThis.kayaSessions;
    if (!sessions) return;
    const now = Date.now();

    for (const [number, tracker] of sessions.entries()) {
        if (!tracker?.isConnected || !tracker.connection) continue;

        const list = getSetting(number, 'schedules', []);
        if (!Array.isArray(list) || !list.length) continue;

        const due = list.filter(i => i.at <= now);
        if (!due.length) continue;

        setSetting(number, 'schedules', list.filter(i => i.at > now));

        for (const item of due) {
            try {
                await tracker.connection.sendMessage(item.jid, {
                    text: item.kind === 'remind' ? `⏰ *Reminder*\n${item.text}` : item.text
                });
            } catch (e) {
                console.error('[SCHEDULER] send error:', e?.message || e);
            }
            await delay(1500);
        }
    }
}

if (!globalThis.__kayaSchedulerStarted) {
    globalThis.__kayaSchedulerStarted = true;
    setInterval(() => tick().catch(() => {}), 20000).unref();
}
