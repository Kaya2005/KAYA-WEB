// antigroupstatus.js
import { getSetting, setSetting } from "../setting.js";
import { boxMessage, errorBox, successBox } from "../setting/theme.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getOwnerId = (kaya) =>
  kaya.user?.id ? kaya.user.id.split(':')[0].replace(/[^0-9]/g, '') : '';

// Detects a group status post (groupStatusMessage / groupStatusMessageV2).
// "groupStatusMentionMessage" is NOT matched here: it is handled by antistatus.
function isGroupStatusPost(mek) {
  const seen = new Set();

  const scan = (obj, depth = 0) => {
    if (!obj || typeof obj !== "object" || depth > 4 || seen.has(obj)) return false;
    seen.add(obj);

    for (const k of Object.keys(obj)) {
      if (/groupstatusmessage/i.test(k)) return true;
      if (scan(obj[k], depth + 1)) return true;
    }
    return false;
  };

  return scan(mek.message);
}

export default {
  name: "antigroupstatus",
  description: "Deletes statuses posted to the group",
  category: "Group",
  group: true,
  admin: true,
  botAdmin: true,

  async execute(kaya, mek, from, args, prefix) {
    try {
      const ownerId = getOwnerId(kaya);
      const groupId = from.split('@')[0];

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
          `• \`${prefix}antigroupstatus on\` *(delete group statuses)*\n` +
          `• \`${prefix}antigroupstatus kick\` *(delete + remove sender)*\n` +
          `• \`${prefix}antigroupstatus off\` *(disable)*\n` +
          `• \`${prefix}antigroupstatus status\` *(current state)*`;
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI GROUP STATUS", menu, '🛡️')
        }, { quoted: mek });
      }

      if (action === "status") {
        const enabled = getSetting(ownerId, "antigroupstatus", false, groupId);
        const mode = getSetting(ownerId, "antigroupstatusMode", "delete", groupId);
        const content = enabled
          ? `• *Status:* ✅ Enabled\n• *Mode:* ${mode === "kick" ? "Delete + Remove" : "Delete"}`
          : `• *Status:* ❌ Disabled`;
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI GROUP STATUS", content, '📊')
        }, { quoted: mek });
      }

      if (action === "off") {
        setSetting(ownerId, "antigroupstatus", false, groupId);
        return await kaya.sendMessage(from, {
          text: boxMessage("ANTI GROUP STATUS", "Protection disabled.", '❌')
        }, { quoted: mek });
      }

      setSetting(ownerId, "antigroupstatus", true, groupId);
      setSetting(ownerId, "antigroupstatusMode", action, groupId);

      await kaya.sendMessage(from, {
        text: successBox(
          `Anti group status enabled\n*${action === "kick" ? "Delete + Remove" : "Delete"}*`
        )
      }, { quoted: mek });

    } catch (err) {
      console.error("❌ Antigroupstatus error:", err);
      await kaya.sendMessage(from, { text: errorBox("Antigroupstatus error.") }, { quoted: mek }).catch(() => {});
    }
  },

  async detect(kaya, mek, from, body) {
    try {
      if (!from.endsWith("@g.us") || mek.key?.fromMe) return;

      const ownerId = getOwnerId(kaya);
      const groupId = from.split('@')[0];

      if (!getSetting(ownerId, "antigroupstatus", false, groupId)) return;
      if (!isGroupStatusPost(mek)) return;

      const sender = mek.sender || mek.key.participant;

      // Skip group admins
      const metadata = await kaya.groupMetadata(from).catch(() => null);
      const participant = metadata?.participants.find(p => p.id === sender);
      if (participant?.admin) return;

      await delay(500);
      await kaya.sendMessage(from, { delete: mek.key }).catch(() => {});

      const mode = getSetting(ownerId, "antigroupstatusMode", "delete", groupId);
      if (mode === "kick") {
        await delay(1000);
        await kaya.groupParticipantsUpdate(from, [sender], "remove").catch(() => {});
      }
    } catch (err) {
      console.error("❌ AntiGroupStatus detect error:", err);
    }
  }
};
