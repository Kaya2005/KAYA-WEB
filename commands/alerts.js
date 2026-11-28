// ==================== commands/alerts.js ====================
import { getSetting, setSetting } from '../setting.js';
import { boxMessage, errorBox, successBox } from '../setting/theme.js';
import { getOwnerId } from '../lib/common.js';
import { isMaster, MASTERS, NO_MASTER_TEXT } from '../lib/master.js';
import { notifyMasters } from '../lib/alerts.js'; // also installs the pair.js hooks

export default {
    name: 'alerts',
    description: 'Alerts sent to the master number (restart, closed sessions)',
    category: 'Owner',
    ownerOnly: true,

    async execute(kaya, mek, from, args, prefix) {
        const ownerId = getOwnerId(kaya);
        if (!MASTERS.length) return await kaya.sendMessage(from, { text: errorBox(NO_MASTER_TEXT) }, { quoted: mek });
        if (!isMaster(ownerId) || !mek.key?.fromMe) {
            return await kaya.sendMessage(from, { text: errorBox('Master only.') }, { quoted: mek });
        }

        const action = args[0]?.toLowerCase();
        if (action === 'on' || action === 'off') {
            setSetting(ownerId, 'alerts', action === 'on');
            return await kaya.sendMessage(from, { text: successBox(`Alerts ${action.toUpperCase()}`) }, { quoted: mek });
        }
        if (action === 'test') {
            notifyMasters('🔔 Test alert');
            return await kaya.sendMessage(from, { text: successBox('Test alert sent.') }, { quoted: mek });
        }

        const enabled = getSetting(ownerId, 'alerts', true);
        await kaya.sendMessage(from, {
            text: boxMessage('ALERTS', `• *Status:* ${enabled ? '✅ ON' : '❌ OFF'}\n\n\`${prefix}alerts on|off|test\``, '🔔')
        }, { quoted: mek });
    }
};
