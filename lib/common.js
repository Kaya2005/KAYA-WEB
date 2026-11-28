// lib/common.js - small helpers shared by the new commands
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getOwnerId = (kaya) =>
    kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

// digits of a jid (works with @s.whatsapp.net and @lid)
export const numOf = (jid) =>
    String(jid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '');

// remove the device part: 123:4@s.whatsapp.net -> 123@s.whatsapp.net
export const normJid = (jid) => String(jid || '').replace(/:\d+@/, '@');

export async function isGroupAdmin(kaya, groupJid, sender) {
    const meta = await kaya.groupMetadata(groupJid).catch(() => null);
    const p = meta?.participants.find(
        x => x.id === sender || x.phoneNumber === sender || x.lid === sender
    );
    return Boolean(p?.admin);
}

export function formatDuration(ms) {
    const m = Math.floor(ms / 60000);
    if (m < 1) return 'less than a minute';
    if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} h ${m % 60} min`;
    const d = Math.floor(h / 24);
    return `${d} d ${h % 24} h`;
}
