// lib/alerts.js - messages sent to the master number(s)
import { getSetting } from '../setting.js';
import { MASTERS, isMaster } from './master.js';

let bootSent = false;

export function notifyMasters(text) {
    const sessions = globalThis.kayaSessions;
    if (!sessions) return;
    for (const master of MASTERS) {
        if (!getSetting(master, 'alerts', true)) continue;
        const tracker = sessions.get(master);
        if (tracker?.isConnected && tracker.connection) {
            tracker.connection.sendMessage(master + '@s.whatsapp.net', { text }).catch(() => {});
        }
    }
}

// pair.js calls these two functions
globalThis.kayaAlerts = {
    sessionOpen(number) {
        if (bootSent || !isMaster(number)) return;
        bootSent = true;
        // wait so that most sessions had time to reconnect
        setTimeout(() => {
            let connected = 0;
            let total = 0;
            for (const [, t] of globalThis.kayaSessions || []) { total++; if (t.isConnected) connected++; }
            notifyMasters(`✅ *KAYA BOT started*\n• Sessions connected: ${connected}/${total}`);
        }, 90000).unref();
    },
    sessionClosed(number) {
        notifyMasters(`🔴 *Session closed*\n• Number: +${number}\n• Reason: logged out by the user`);
    }
};
