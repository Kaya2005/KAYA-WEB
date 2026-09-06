import axios from 'axios';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';
import { sendWithBotImage } from '../setting/botAssets.js';
import { getContextInfo } from '../setting/contextInfo.js';
import { getBotName } from '../setting/botAssets.js';

export default {
  name: 'caricature',
  alias: ['carton'],
  description: 'Generate AI image in caricature style',
  category: 'AI',
  usage: '.caricature <prompt>',

  async execute(kaya, mek, from, args, prefix) {
    try {
      // Vérification du prompt
      if (!args.length) {
        return await kaya.sendMessage(from, { text: `❌ Please provide a prompt.\n\nExample: ${prefix}caricature a funny man laughing` }, { quoted: mek });
      }

      // Réaction d'attente
      if (mek.react) mek.react('⏳');

      const prompt = args.join(' ');
      const style = 'caricature';
      const botName = getBotName(mek.sender) || 'KAYA-MD';
      
      // Configuration de l'API (URL directe)
      const baseUrl = 'https://text2img.hideme.eu.org';
      const apiUrl = `${baseUrl}/image?prompt=${encodeURIComponent(prompt)}&model=flux&style=${style}`;

      // Appel à l'API
      const response = await axios({
        method: 'get',
        url: apiUrl,
        responseType: 'arraybuffer',
        timeout: 30000
      });

      // Vérification de la réponse
      if (response.status !== 200 || !response.data || response.data.byteLength < 100) {
         throw new Error("Invalid response from API or image corrupted.");
      }

      // Traitement de l'image et création du fichier temporaire
      const imageBuffer = Buffer.from(response.data);
      const tempFile = path.join(tmpdir(), `KAYA_${Date.now()}.png`);
      await writeFile(tempFile, imageBuffer);

      // Préparation de la légende
      const caption = `
🎨 *Prompt:* ${prompt}
✨ *Style:* Caricature
🧠 *Powered by ${botName} AI*
`.trim();

      // Envoi de l'image avec votre fonction personnalisée
      await sendWithBotImage(kaya, from, mek.sender, {
        image: { url: tempFile },
        caption: caption,
        contextInfo: getContextInfo()
      }, mek);

      // Nettoyage : Suppression du fichier temporaire
      await unlink(tempFile).catch(() => {});

      // Réaction de succès
      if (mek.react) mek.react('✅');

    } catch (error) {
      console.error('❌ caricature.js error:', error);
      
      let errorMessage = error.message;
      if (error.code === 'ECONNABORTED') errorMessage = "API request timed out.";
      if (error.response && error.response.status === 404) errorMessage = "Caricature style not available on this endpoint.";

      await kaya.sendMessage(from, { text: `❌ Failed to generate caricature.\nError: ${errorMessage}` }, { quoted: mek });
      
      // Réaction d'échec
      if (mek.react) mek.react('❌');
    }
  }
};
