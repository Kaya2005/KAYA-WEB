// ==================== commands/ram.js ====================
import { boxMessage } from '../setting/theme.js';

const mb = (n) => `${(n / 1024 / 1024).toFixed(0)} MB`;

export default {
    name: 'ram',
    aliases: ['memory'],
    description: '📊 Show memory usage of the bot',
    category: 'Admin',
    ownerOnly: true,

    async execute(kaya, mek, from) {
        const m = process.memoryUsage();

        let total = 0;
        let connected = 0;
        for (const [, tracker] of globalThis.kayaSessions || []) {
            total++;
            if (tracker.isConnected) connected++;
        }

        const content =
            `• *Total (RSS):* ${mb(m.rss)}\n` +
            `• *JS heap:* ${mb(m.heapUsed)} used / ${mb(m.heapTotal)}\n` +
            `• *Buffers / native:* ${mb(m.external)}\n` +
            `• *Sessions:* ${connected} connected / ${total}\n` +
            `• *Per session (approx):* ${total ? mb(m.rss / total) : '-'}`;

        await kaya.sendMessage(from, {
            text: boxMessage('MEMORY', content, '📊')
        }, { quoted: mek });
    }
};
