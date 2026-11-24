// lib/buttons.js
// Sends tappable buttons (WhatsApp "native flow" quick reply).
// When a button is tapped, WhatsApp sends its `id` back as a message: case.js already reads it
// (interactiveResponseMessage -> paramsJson.id) and runs it like a typed command.
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

/**
 * @param {object} kaya    the socket
 * @param {string} jid     chat to send to
 * @param {object} options { text, footer?, buttons: [{ id, text }] }
 *                         `id` must be the full command to run, e.g. ".typing off"
 * @param {object} quoted  message to reply to (optional)
 */
export async function sendButtons(kaya, jid, { text, footer = '', buttons = [] }, quoted) {
    try {
        const nativeButtons = buttons.map(b => ({
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: b.text, id: b.id })
        }));

        const content = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({ text }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: nativeButtons
                        })
                    })
                }
            }
        };

        const msg = generateWAMessageFromContent(jid, content, {
            quoted,
            userJid: kaya.user?.id
        });

        const additionalNodes = [
            {
                tag: 'biz',
                attrs: {},
                content: [{
                    tag: 'interactive',
                    attrs: { type: 'native_flow', v: '1' },
                    content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }]
                }]
            }
        ];

        // Private chats also need the bot node
        if (!jid.endsWith('@g.us')) {
            additionalNodes.push({ tag: 'bot', attrs: { biz_bot: '1' } });
        }

        await kaya.relayMessage(jid, msg.message, { messageId: msg.key.id, additionalNodes });
        return msg;

    } catch (err) {
        console.error('[BUTTONS] Could not send buttons, sending plain text:', err?.message || err);

        // Fallback: plain text with the commands to type
        const lines = buttons.map(b => `• ${b.text}: ${b.id}`).join('\n');
        return await kaya.sendMessage(jid, { text: `${text}\n\n${lines}` }, { quoted });
    }
}
