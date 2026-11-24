// lib/nsfwWorker.js
// Runs in a SEPARATE process (native TensorFlow / sharp can never crash the bot).
// Receives sticker images, returns { Porn, Hentai, Sexy, Neutral, Drawing } scores (0..1).
import sharp from 'sharp';
import util from 'util';

// Node 23+ removed the old util.isXxx helpers that @tensorflow/tfjs-node still calls
// ("util_1.isNullOrUndefined is not a function"). Put them back before TensorFlow loads.
const legacyUtil = {
    isNullOrUndefined: (v) => v === null || v === undefined,
    isNull: (v) => v === null,
    isUndefined: (v) => v === undefined,
    isArray: Array.isArray,
    isBoolean: (v) => typeof v === 'boolean',
    isNumber: (v) => typeof v === 'number',
    isString: (v) => typeof v === 'string',
    isSymbol: (v) => typeof v === 'symbol',
    isFunction: (v) => typeof v === 'function',
    isObject: (v) => v !== null && typeof v === 'object',
    isPrimitive: (v) => v === null || (typeof v !== 'object' && typeof v !== 'function'),
    isRegExp: (v) => v instanceof RegExp,
    isDate: (v) => v instanceof Date,
    isError: (v) => v instanceof Error,
    isBuffer: Buffer.isBuffer
};
for (const [name, fn] of Object.entries(legacyUtil)) {
    if (typeof util[name] !== 'function') {
        try { util[name] = fn; } catch {}
    }
}

// ESM/CommonJS interop: works whichever way the packages export their API
const tfMod = await import('@tensorflow/tfjs-node');
const tf = tfMod.default?.tensor3d ? tfMod.default : tfMod;

const nsfwMod = await import('nsfwjs');
const nsfwjs = nsfwMod.default?.load ? nsfwMod.default : nsfwMod;

let model = null;

async function getModel() {
    if (!model) {
        model = await nsfwjs.load();
        console.log('[NSFW] Model loaded');
    }
    return model;
}

// One frame -> 224x224 RGB tensor (transparent background becomes white)
async function frameToTensor(buffer, page) {
    const { data, info } = await sharp(buffer, { page })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(224, 224, { fit: 'fill' })
        .raw()
        .toBuffer({ resolveWithObject: true });

    return tf.tensor3d(new Int32Array(data), [info.height, info.width, info.channels], 'int32');
}

async function classify(buffer) {
    const nsfw = await getModel();

    // Animated stickers: check first, middle and last frame
    let pages = 1;
    try {
        pages = (await sharp(buffer).metadata()).pages || 1;
    } catch {}

    const frames = [...new Set([0, Math.floor(pages / 2), pages - 1])].filter(p => p >= 0);

    const best = { Porn: 0, Hentai: 0, Sexy: 0, Neutral: 0, Drawing: 0 };

    for (const page of frames) {
        let tensor;
        try {
            tensor = await frameToTensor(buffer, page);
            const predictions = await nsfw.classify(tensor);
            for (const { className, probability } of predictions) {
                if (className in best) best[className] = Math.max(best[className], probability);
            }
        } finally {
            tensor?.dispose();
        }
    }

    return best;
}

process.on('message', async ({ id, buffer }) => {
    try {
        const scores = await classify(Buffer.from(buffer));
        process.send({ id, ok: true, scores });
    } catch (error) {
        process.send({ id, ok: false, error: error?.message || String(error) });
    }
});
