import yts from 'yt-search';
import axios from 'axios';
import { BOT_SLOGAN } from '../setting/botAssets.js';
import { boxMessage, errorBox, usageBox } from '../setting/theme.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
    name: 'play',
    description: 'Download song from YouTube',
    category: 'Download',

    async execute(kaya, mek, from, args, prefix) {
        try {
            if (!args.length) {
                return await kaya.sendMessage(
                    from,
                    { text: usageBox(prefix, 'play', '<song name>') },
                    { quoted: mek }
                );
            }

            const query = args.join(' ').trim();
            // On met directement une réaction de recherche
            await kaya.sendMessage(from, { react: { text: "🔎", key: mek.key } });

            let video;
            if (query.includes('youtube.com') || query.includes('youtu.be')) {
                video = { url: query, title: 'YouTube Video' };
            } else {
                const search = await yts(query);
                if (!search.videos.length) {
                    return await kaya.sendMessage(
                        from,
                        { text: errorBox('ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ.') },
                        { quoted: mek }
                    );
                }
                video = search.videos[0];
            }

            // Appel API direct en parallèle ou sans attendre des delays superflus
            const apiUrl = `https://yt-dl.officialhectormanuel.workers.dev/?url=${encodeURIComponent(video.url)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });
            const data = response.data;

            if (!data?.status || !data.audio) {
                return await kaya.sendMessage(
                    from,
                    { text: errorBox('ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴀᴜᴅɪᴏ.') },
                    { quoted: mek }
                );
            }

            // Envoi direct de l'audio avec une seule mini description (on évite d'envoyer l'image + 4 réactions qui ralentissent tout)
            await kaya.sendMessage(from, {
                audio: { url: data.audio },
                mimetype: "audio/mpeg",
                fileName: `${data.title.replace(/[^a-zA-Z0-9-_\.]/g, "_")}.mp3`,
                caption: `🎵 *${video.title}*\n🔗 *ᴛ.ᴍᴇ/ᴋᴀʏᴀ243*`
            }, { quoted: mek });

            await kaya.sendMessage(from, { react: { text: "✅", key: mek.key } });

        } catch (error) {
            console.error("❌ PLAY ERROR:", error);
            await kaya.sendMessage(
                from,
                { text: errorBox('ᴇʀʀᴏʀ ᴘʀᴏᴄᴇssɪɴɢ ʀᴇǫᴜᴇsᴛ.\nᴛʜᴇ ᴀᴘɪ ᴍɪɢʜᴛ ʙᴇ ᴏᴠᴇʀʟᴏᴀᴅᴇᴅ.') },
                { quoted: mek }
            );
            await kaya.sendMessage(from, { react: { text: "❌", key: mek.key } });
        }
    }
};
