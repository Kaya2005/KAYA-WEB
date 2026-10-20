import fs from 'fs';
import path from 'path';
import { getContextInfo } from '../setting/contextInfo.js';
import checkAdminOrOwner from '../setting/checkAdminOrOwner.js';
import { getSetting, setSetting } from '../setting.js';

const byeCache = new Set();

const delayMs = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

async function ensureByeInitialized(ownerId) {
    try {
        const initialized = getSetting(
            ownerId,
            'byeInitialized',
            false
        );

        if (initialized) {
            return;
        }

        await setSetting(
            ownerId,
            'byeInitialized',
            true
        );

        await setSetting(
            ownerId,
            'byeAll',
            'on'
        );

        console.log(
            `[BYE] Première initialisation pour ${ownerId} : byeAll = ON`
        );

    } catch (e) {
        console.error(
            '[BYE] Initialization error:',
            e
        );
    }
}

export default {

    name: 'bye',

    alias: [
        'goodbye',
        'aurevoir',
        'leaver'
    ],

    description: 'Manage goodbye messages',

    category: 'Group',

    ownerOnly: true,

    async execute(
        kaya,
        mek,
        from,
        args,
        prefix
    ) {

        try {

            const status =
                await checkAdminOrOwner(
                    kaya,
                    from,
                    mek.sender
                );

            if (!status.isBotOwner) {

                return kaya.sendMessage(
                    from,
                    {
                        text: '❌ Owner Only',
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

            const ownerId =
                kaya.user.id
                    .split(':')[0];

            const groupId =
                from.split('@')[0];

            await ensureByeInitialized(
                ownerId
            );

            const action =
                args
                    .map(a =>
                        a.toLowerCase()
                    )
                    .join(' ');

            if (!action) {

                return kaya.sendMessage(
                    from,
                    {
                        text:
`⚙️ *GOODBYE SETTINGS*

${prefix}bye on
${prefix}bye off
${prefix}bye all
${prefix}bye all off
${prefix}bye status`,
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

            if (action === 'on') {

                await setSetting(
                    ownerId,
                    'byeEnabled',
                    true,
                    groupId
                );

                return kaya.sendMessage(
                    from,
                    {
                        text:
                            '✅ Bye message enabled for this group.',
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

            if (action === 'off') {

                await setSetting(
                    ownerId,
                    'byeEnabled',
                    false,
                    groupId
                );

                await setSetting(
                    ownerId,
                    'byeAll',
                    'off'
                );

                return kaya.sendMessage(
                    from,
                    {
                        text:
                            '❌ Bye message disabled completely (Local & Global off).',
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

            if (action === 'all') {

                await setSetting(
                    ownerId,
                    'byeAll',
                    'on'
                );

                return kaya.sendMessage(
                    from,
                    {
                        text:
                            '✅ Bye message enabled globally for all your groups.',
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

            if (action === 'all off') {

                await setSetting(
                    ownerId,
                    'byeAll',
                    'off'
                );

                return kaya.sendMessage(
                    from,
                    {
                        text:
                            '❌ Bye message disabled globally for all your groups.',
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

            if (action === 'status') {

                const isLocalEnabled =
                    getSetting(
                        ownerId,
                        'byeEnabled',
                        false,
                        groupId
                    );

                const isAll =
                    getSetting(
                        ownerId,
                        'byeAll',
                        'off'
                    );

                const initialized =
                    getSetting(
                        ownerId,
                        'byeInitialized',
                        false
                    );

                return kaya.sendMessage(
                    from,
                    {
                        text:
`📊 *GOODBYE STATUS*

Local: ${isLocalEnabled ? 'ON' : 'OFF'}
Global (All): ${String(isAll).toUpperCase()}
Initialized: ${initialized ? 'YES' : 'NO'}`,
                        contextInfo:
                            getContextInfo(
                                mek.sender
                            )
                    },
                    {
                        quoted: mek
                    }
                );
            }

        } catch (e) {

            console.error(
                'Bye command error:',
                e
            );
        }
    },

    async participantUpdate(
        kaya,
        update
    ) {

        try {

            // Intercepte les départs du groupe
            if (
                update.action !== 'remove' &&
                update.action !== 'leave'
            ) {
                return;
            }

            const from =
                update.id;

            const groupId =
                from.split('@')[0];

            const ownerId =
                kaya.user.id
                    .split(':')[0];

            await ensureByeInitialized(
                ownerId
            );

            const isAll =
                getSetting(
                    ownerId,
                    'byeAll',
                    'off'
                );

            let isEnabled = false;

            if (isAll === 'on') {

                isEnabled = true;

            } else {

                isEnabled =
                    getSetting(
                        ownerId,
                        'byeEnabled',
                        false,
                        groupId
                    );
            }

            if (!isEnabled) {
                return;
            }

            const metadata =
                await kaya
                    .groupMetadata(from)
                    .catch(() => ({}));

            const groupName =
                metadata.subject ||
                'this group';

            const memberCount =
                metadata.participants
                    ? metadata
                        .participants
                        .length
                    : 0;

            const logoPath =
                path.join(
                    process.cwd(),
                    'setting',
                    'logo.png'
                );

            const logoBuffer =
                fs.existsSync(logoPath)
                    ? fs.readFileSync(
                        logoPath
                    )
                    : null;

            for (
                const user
                of update.participants
            ) {

                const userId =
                    typeof user === 'string'
                        ? user
                        : user.id;

                if (!userId) {
                    continue;
                }

                if (
                    byeCache.has(
                        userId
                    )
                ) {
                    continue;
                }

                byeCache.add(
                    userId
                );

                setTimeout(
                    () => {
                        byeCache.delete(
                            userId
                        );
                    },
                    30000
                );

                const randomDelay =
                    Math.floor(
                        Math.random() *
                        1000
                    ) + 4000;

                await delayMs(
                    randomDelay
                );

                const userNumber =
                    userId.split('@')[0];

                const userTag =
                    `@${userNumber}`;

                const byeMessage =
`👋 Goodbye from ${groupName} !
▰▰▰▰▰▰▰▰▰▰
➠ ʀᴇᴍᴀɪɴɪɴɢ ᴍᴇᴍʙᴇʀs : ${memberCount}
╭▰▰▰▰▰▰▰◈
┆❏ ᴜsᴇʀ : ${userTag}
╰▰▰▰▰▰▰▰◈
вoт: https://kaya-bot-drab.vercel.app/
`.trim();

                const sendPayload = {
                    mentions: [
                        userId
                    ],

                    contextInfo:
                        getContextInfo(
                            ownerId +
                            '@s.whatsapp.net'
                        )
                };

                if (logoBuffer) {

                    sendPayload.image =
                        logoBuffer;

                    sendPayload.caption =
                        byeMessage;

                } else {

                    sendPayload.text =
                        byeMessage;
                }

                await kaya.sendMessage(
                    from,
                    sendPayload
                );
            }

        } catch (e) {

            console.error(
                'Bye participantUpdate error:',
                e
            );
        }
    }
};
