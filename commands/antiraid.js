// ==================== commands/antiraid.js ====================
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId } from '../lib/common.js';

const DEFAULT_LIMIT = { joins: 8, sec: 60 };
const joinLog = new Map();   // groupId -> [timestamps, one per new member]
const lastTrigger = new Map();

export default {
    name: 'antiraid',
    aliases: ['raid'],
    description: 'Closes the group when too many people join at once',
    category: 'Group',
    group: true,
    admin: true,
    botAdmin: true,

    async execute(kaya, mek, from, args, prefix) {
        try {
            const ownerId = getOwnerId(kaya);
            const groupId = from.split('@')[0];
            const action = args[0]?.toLowerCase();

            if (action === 'on') {
                const joins = parseInt(args[1], 10) || DEFAULT_LIMIT.joins;
                const sec = parseInt(args[2], 10) || DEFAULT_LIMIT.sec;
                setSetting(ownerId, 'antiraid', true, groupId);
                setSetting(ownerId, 'antiraidLimit', { joins, sec }, groupId);
                return await kaya.sendMessage(from, { text: successBox(`Anti raid enabled\n${joins} new members within ${sec}s closes the group`) }, { quoted: mek });
            }

            if (action === 'off') {
                setSetting(ownerId, 'antiraid', false, groupId);
                return await kaya.sendMessage(from, { text: boxMessage('ANTI RAID', 'Protection disabled.', '❌') }, { quoted: mek });
            }

            if (action === 'unlock') {
                await kaya.groupSettingUpdate(from, 'not_announcement').catch(() => {});
                await kaya.groupMemberAddMode(from, 'all_member_add').catch(() => {});
                return await kaya.sendMessage(from, { text: successBox('Group reopened.') }, { quoted: mek });
            }

            if (action === 'status') {
                const enabled = getSetting(ownerId, 'antiraid', false, groupId);
                const l = getSetting(ownerId, 'antiraidLimit', DEFAULT_LIMIT, groupId);
                return await kaya.sendMessage(from, {
                    text: boxMessage('ANTI RAID', enabled ? `• *Status:* ✅ Enabled\n• *Trigger:* ${l.joins} members / ${l.sec}s` : '• *Status:* ❌ Disabled', '📊')
                }, { quoted: mek });
            }

            const menu =
                `• \`${prefix}antiraid on 8 60\` *(joins / seconds)*\n` +
                `• \`${prefix}antiraid off\`\n` +
                `• \`${prefix}antiraid unlock\` *(reopen the group)*\n` +
                `• \`${prefix}antiraid status\``;
            await kaya.sendMessage(from, { text: boxMessage('ANTI RAID', menu, '🛡️') }, { quoted: mek });
        } catch (err) {
            console.error('❌ antiraid error:', err);
            await kaya.sendMessage(from, { text: errorBox('Antiraid error.') }, { quoted: mek }).catch(() => {});
        }
    },

    // Called by pair.js for every group participant update
    async participantUpdate(kaya, update) {
        try {
            if (update.action !== 'add') return;

            const groupJid = update.id;
            const ownerId = getOwnerId(kaya);
            const groupId = groupJid.split('@')[0];
            if (!getSetting(ownerId, 'antiraid', false, groupId)) return;

            const { joins, sec } = getSetting(ownerId, 'antiraidLimit', DEFAULT_LIMIT, groupId);
            const now = Date.now();

            const log = (joinLog.get(groupId) || []).filter(t => now - t < sec * 1000);
            for (let i = 0; i < (update.participants?.length || 1); i++) log.push(now);
            joinLog.set(groupId, log);

            if (log.length < joins) return;
            if (now - (lastTrigger.get(groupId) || 0) < 10 * 60 * 1000) return;
            lastTrigger.set(groupId, now);

            await kaya.groupSettingUpdate(groupJid, 'announcement').catch(() => {});
            await kaya.groupMemberAddMode(groupJid, 'admin_add').catch(() => {});

            const meta = await kaya.groupMetadata(groupJid).catch(() => null);
            const admins = (meta?.participants || []).filter(p => p.admin).map(p => p.id);

            await kaya.sendMessage(groupJid, {
                text:
                    `🚨 *RAID DETECTED*\n${log.length} people joined in less than ${sec}s.\n` +
                    `The group is closed (admins only) and adding members is limited to admins.\n` +
                    `Admins: use *.antiraid unlock* to reopen.\n\n` +
                    admins.map(a => `@${a.split('@')[0]}`).join(' '),
                mentions: admins
            });
        } catch (err) {
            console.error('❌ antiraid participantUpdate error:', err?.message || err);
        }
    }
};
