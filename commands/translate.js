// ==================== commands/translate.js ====================
import axios from 'axios';
import { boxMessage, errorBox, usageBox } from '../setting/theme.js';

export default {
    name: 'translate',
    aliases: ['tr', 'traduire'],
    description: 'Translate a text or a replied message',
    category: 'Tools',

    async execute(kaya, mek, from, args, prefix) {
        try {
            let lang = 'en';
            let rest = args;
            if (/^[a-z]{2}(-[a-z]{2})?$/i.test(args[0] || '')) {
                lang = args[0].toLowerCase();
                rest = args.slice(1);
            }

            const text = (rest.join(' ').trim() || mek.quoted?.text || '').trim();
            if (!text) {
                return await kaya.sendMessage(from, { text: usageBox(prefix, 'translate', '<lang> <text> (or reply to a message)') }, { quoted: mek });
            }

            const res = await axios.get('https://translate.googleapis.com/translate_a/single', {
                params: { client: 'gtx', sl: 'auto', tl: lang, dt: 't', q: text.slice(0, 3000) },
                timeout: 15000
            });

            const out = (res.data?.[0] || []).map(part => part[0]).join('');
            if (!out) throw new Error('empty translation');

            await kaya.sendMessage(from, {
                text: boxMessage(`TRANSLATE ${(res.data?.[2] || '?').toUpperCase()} → ${lang.toUpperCase()}`, out, '🌐')
            }, { quoted: mek });
        } catch (err) {
            console.error('❌ translate error:', err?.message || err);
            await kaya.sendMessage(from, { text: errorBox('Translation failed. Check the language code (fr, en, es...).') }, { quoted: mek }).catch(() => {});
        }
    }
};
