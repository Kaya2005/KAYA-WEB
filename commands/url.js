import { downloadContentFromMessage } from "@whiskeysockets/baileys";

export default {
    name: "url",
    aliases: ["tourl", "catbox", "imgurl"],
    description: "Convertit une image répondue en lien URL public",
    category: "Tools",

    async execute(kaya, mek, from, args, prefix) {
        try {
            // Utilisation de mek.quoted pour une détection fiable
            const quoted = mek.quoted ? mek.quoted : mek;
            const mime = (quoted.msg || quoted).mimetype || '';

            if (!/image/.test(mime)) {
                return kaya.sendMessage(
                    from,
                    {
                        text: `⚠️ *Usage :* Réponds à une image avec ${prefix}url`
                    },
                    { quoted: mek }
                );
            }

            await kaya.sendPresenceUpdate("composing", from);

            // Téléchargement sécurisé de l'image
            let stream;
            try {
                stream = await downloadContentFromMessage(quoted, "image");
            } catch (dlError) {
                console.error('❌ Erreur téléchargement image :', dlError);
                return kaya.sendMessage(from, { text: "❌ Impossible de télécharger cette image." }, { quoted: mek });
            }

            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            if (!buffer || buffer.length === 0) {
                return kaya.sendMessage(
                    from,
                    {
                        text: "❌ L'image est vide ou corrompue."
                    },
                    { quoted: mek }
                );
            }

            // Utilisation de fetch natif avec FormData et Blob (évite les ECONNRESET de form-data)
            const formData = new FormData();
            formData.append("reqtype", "fileupload");
            const blob = new Blob([buffer], { type: mime || "image/jpeg" });
            formData.append("fileToUpload", blob, "image.jpg");

            const response = await fetch("https://catbox.moe/user/api.php", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erreur serveur Catbox (Statut ${response.status})`);
            }

            const url = (await response.text()).trim();

            if (!url.startsWith("http")) {
                throw new Error(url || "Réponse invalide de Catbox");
            }

            await kaya.sendMessage(
                from,
                {
                    text: `✅ *Image uploadée avec succès !*\n\n🔗 ${url}`
                },
                { quoted: mek }
            );

        } catch (err) {
            console.error('❌ Erreur critique dans la commande url :', err);

            await kaya.sendMessage(
                from,
                {
                    text: `❌ Une erreur est survenue : ${err.message}`
                },
                { quoted: mek }
            );
        }
    }
};
