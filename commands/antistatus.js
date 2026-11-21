// antistatus.js
import { getSetting, setSetting } from "../setting.js";
import { boxMessage, errorBox, successBox } from "../setting/theme.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getOwnerId = (kaya) =>
  kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

// Détecte un message "statut qui mentionne le groupe" (recherche récursive)
function isGroupStatusMention(mek) {
  const seen = new Set();

  const scan = (obj, depth = 0) => {
    if (!obj || typeof obj !== "object" || depth > 4 || seen.has(obj)) return false;
    seen.add(obj);

    for (const k of Object.keys(obj)) {
      if (/statusmention|groupstatus/i.test(k)) return true;
      if (scan(obj[k], depth + 1)) return true;
    }
    return false;
  };

  return scan(mek.message);
}

export default {
  name: "antistatus",
  description: "Supprime les statuts qui mentionnent le groupe",
  category: "Group",
  group: true,
  admin: true,
  botAdmin: true,

  async execute(kaya, mek, from, args, prefix) {
    try {
      const ownerId = getOwnerId(kaya);
      const groupId = from.split('@')[0];

      const actionMap = {
        on: "delete", oui: "delete", yes: "delete",
        delete: "delete", supprimer: "delete",
        kick: "kick", expulser: "kick",
        off: "off", non: "off", no: "off",
        status: "status", statut: "status"
      };

      const action = actionMap[args[0]?.toLowerCase()];

      if (!action) {
        const menu =
          `• \`${prefix}antistatus on / oui\` *(supprime le statut-mention)*\n` +
          `• \`${prefix}antistatus kick / expulser\` *(supprime + expulse)*\n` +
          `• \`${prefix}antistatus off / non\` *(désactive)*\n` +
          `• \`${prefix}antistatus status / statut\` *(état actuel)*`;
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI STATUT MENTION", menu, '🛡️')
        }, { quoted: mek });
      }

      if (action === "status") {
        const enabled = getSetting(ownerId, "antistatus", false, groupId);
        const mode = getSetting(ownerId, "antistatusMode", "delete", groupId);
        const content = enabled
          ? `• *Statut :* ✅ Activé\n• *Mode :* ${mode === "kick" ? "Supprimer + Expulser" : "Supprimer"}`
          : `• *Statut :* ❌ Désactivé`;
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI STATUT MENTION", content, '📊')
        }, { quoted: mek });
      }

      if (action === "off") {
        setSetting(ownerId, "antistatus", false, groupId);
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI STATUT MENTION", "Protection désactivée.", '❌')
        }, { quoted: mek });
      }

      setSetting(ownerId, "antistatus", true, groupId);
      setSetting(ownerId, "antistatusMode", action, groupId);

      await kaya.sendMessage(from, {
        text: successBox(
          `Anti statut-mention activé\n*${action === "kick" ? "Supprimer + Expulser" : "Supprimer"}*`
        )
      }, { quoted: mek });

    } catch (err) {
      console.error("❌ Erreur antistatus:", err);
      await kaya.sendMessage(from, { text: errorBox("Erreur antistatus.") }, { quoted: mek }).catch(() => {});
    }
  },

  async detect(kaya, mek, from, body) {
    try {
      if (!from.endsWith("@g.us") || mek.key?.fromMe) return;

      const ownerId = getOwnerId(kaya);
      const groupId = from.split('@')[0];

      if (!getSetting(ownerId, "antistatus", false, groupId)) return;
      if (!isGroupStatusMention(mek)) return;

      const sender = mek.sender || mek.key.participant;

      // Ne pas toucher aux admins
      const metadata = await kaya.groupMetadata(from).catch(() => null);
      const participant = metadata?.participants.find(p => p.id === sender);
      if (participant?.admin) return;

      await delay(500);
      await kaya.sendMessage(from, { delete: mek.key }).catch(() => {});

      const mode = getSetting(ownerId, "antistatusMode", "delete", groupId);
      if (mode === "kick") {
        await delay(1000);
        await kaya.groupParticipantsUpdate(from, [sender], "remove").catch(() => {});
      }
    } catch (err) {
      console.error("❌ AntiStatus detect error:", err);
    }
  }
};
