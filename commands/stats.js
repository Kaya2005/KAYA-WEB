// ==================== commands/stats.js ====================
import os from 'os';
import { boxMessage, errorBox } from '../setting/theme.js';
import { getOwnerId, formatDuration } from '../lib/common.js';
import { isMaster, MASTERS, NO_MASTER_TEXT } from '../lib/master.js';
import { listBlacklist } from '../lib/blacklist.js';

const mb = (n) => `${(n / 1024 / 1024).toFixed(0)} MB`;

export default {
    name: 'stats',
    description: 'Global statistics of the bot (master only)',
    category: 'Owner',
    ownerOnly: true,

    async execute(kaya, mek, from) {
        if (!MASTERS.length) return await kaya.sendMessage(from, { text: errorBox(NO_MASTER_TEXT) }, { quoted: mek });
        if (!isMaster(getOwnerId(kaya)) || !mek.key?.fromMe) {
            return await kaya.sendMessage(from, { text: errorBox('Master only.') }, { quoted: mek });
        }

        let total = 0;
        let connected = 0;
        for (const [, t] of globalThis.kayaSessions || []) { total++; if (t.isConnected) connected++; }

        const mem = process.memoryUsage();
        const stats = globalThis.kayaStats || { commands: 0, byName: {}, since: Date.now() };
        const top = Object.entries(stats.byName).sort((a, b) => b[1] - a[1]).slice(0, 5)
            .map(([n, c]) => `${n} (${c})`).join(', ') || '-';

        const content =
            `• *Sessions:* ${connected} connected / ${total}\n` +
            `• *Uptime:* ${formatDuration(process.uptime() * 1000)}\n` +
            `• *Memory:* ${mb(mem.rss)}\n` +
            `• *CPU load:* ${os.loadavg()[0].toFixed(2)}\n` +
            `• *Commands run:* ${stats.commands}\n` +
            `• *Top commands:* ${top}\n` +
            `• *Blacklist:* ${listBlacklist().length} number(s)\n` +
            `• *Node:* ${process.version}`;

        await kaya.sendMessage(from, { text: boxMessage('KAYA STATS', content, '📊') }, { quoted: mek });
    }
};
