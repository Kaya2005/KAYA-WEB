// antistatus.js
import { getSetting, setSetting } from "../setting.js";
import { boxMessage, errorBox, successBox } from "../setting/theme.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getOwnerId = (kaya) =>
  kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

// Detects a "status that mentions the group" message (recursive scan)
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
  description: "Deletes statuses that mention the group",
  category: "Group",
  group: true,
  admin: true,
  botAdmin: true,

  async execute(kaya, mek, from, args, prefix) {
    try {
      const ownerId = getOwnerId(kaya);
      const groupId = from.split('@')[0];

      // English commands (French aliases kept for compatibility)
      const actionMap = {
        on: "delete", yes: "delete", delete: "delete",
        oui: "delete", supprimer: "delete",
        kick: "kick", expulser: "kick",
        off: "off", no: "off", non: "off",
        status: "status", statut: "status"
      };

      const action = actionMap[args[0]?.toLowerCase()];

      if (!action) {
        const menu =
          `• \`${prefix}antistatus on\` *(delete status mentions)*\n` +
          `• \`${prefix}antistatus kick\` *(delete + remove sender)*\n` +
          `• \`${prefix}antistatus off\` *(disable)*\n` +
          `• \`${prefix}antistatus status\` *(current state)*`;
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI STATUS MENTION", menu, '🛡️')
        }, { quoted: mek });
      }

      if (action === "status") {
        const enabled = getSetting(ownerId, "antistatus", false, groupId);
        const mode = getSetting(ownerId, "antistatusMode", "delete", groupId);
        const content = enabled
          ? `• *Status:* ✅ Enabled\n• *Mode:* ${mode === "kick" ? "Delete + Remove" : "Delete"}`
          : `• *Status:* ❌ Disabled`;
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI STATUS MENTION", content, '📊')
        }, { quoted: mek });
      }

      if (action === "off") {
        setSetting(ownerId, "antistatus", false, groupId);
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI STATUS MENTION", "Protection disabled.", '❌')
        }, { quoted: mek });
      }

      setSetting(ownerId, "antistatus", true, groupId);
      setSetting(ownerId, "antistatusMode", action, groupId);

      await kaya.sendMessage(from, {
        text: successBox(
          `Anti status mention enabled\n*${action === "kick" ? "Delete + Remove" : "Delete"}*`
        )
      }, { quoted: mek });

    } catch (err) {
      console.error("❌ Antistatus error:", err);
      await kaya.sendMessage(from, { text: errorBox("Antistatus error.") }, { quoted: mek }).catch(() => {});
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

      // Skip group admins
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
