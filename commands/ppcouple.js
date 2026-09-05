import fetch from "node-fetch";

export default {
  name: "ppcp",
  aliases: ["ppcouple"],
  category: "anime",
  description: "Generar imágenes para amistades o parejas.",

  async execute(kaya, mek, from, args, prefix) {
    try {
      // Réaction de chargement
      await kaya.sendMessage(from, {
        react: {
          text: "🕒",
          key: mek.key
        }
      });

      // Récupération des données
      const response = await fetch(
        "https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json"
      );

      if (!response.ok) {
        throw new Error(
          `Impossible de récupérer les données (${response.status})`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Aucune image disponible dans la base de données.");
      }

      const cita =
        data[Math.floor(Math.random() * data.length)];

      if (!cita.cowo || !cita.cewe) {
        throw new Error("Données d'image invalides.");
      }

      // =========================
      // IMAGE MASCULINE
      // =========================

      const maleResponse = await fetch(cita.cowo);

      if (!maleResponse.ok) {
        throw new Error(
          `Impossible de récupérer l'image masculine (${maleResponse.status})`
        );
      }

      const cowi = Buffer.from(
        await maleResponse.arrayBuffer()
      );

      await kaya.sendMessage(
        from,
        {
          image: cowi,
          caption: "*Masculino* ♂"
        },
        {
          quoted: mek
        }
      );

      // =========================
      // IMAGE FÉMININE
      // =========================

      const femaleResponse = await fetch(cita.cewe);

      if (!femaleResponse.ok) {
        throw new Error(
          `Impossible de récupérer l'image féminine (${femaleResponse.status})`
        );
      }

      const ciwi = Buffer.from(
        await femaleResponse.arrayBuffer()
      );

      await kaya.sendMessage(
        from,
        {
          image: ciwi,
          caption: "*Femenina* ♀"
        },
        {
          quoted: mek
        }
      );

      // Réaction de succès
      await kaya.sendMessage(from, {
        react: {
          text: "✔️",
          key: mek.key
        }
      });

    } catch (e) {

      console.error("❌ PPCP error:", e);

      await kaya.sendMessage(from, {
        react: {
          text: "✖️",
          key: mek.key
        }
      }).catch(() => {});

      const body =
        mek.text ||
        mek.message?.conversation ||
        mek.message?.extendedTextMessage?.text ||
        "";

      const command =
        body.startsWith(prefix)
          ? body
              .slice(prefix.length)
              .trim()
              .split(/\s+/)[0]
          : "ppcp";

      await kaya.sendMessage(
        from,
        {
          text:
            `> Ocurrió un error inesperado al ejecutar el comando *${prefix || ""}${command}*.\n` +
            `> [Error: *${e.message}*]`
        },
        {
          quoted: mek
        }
      ).catch(() => {});
    }
  }
};