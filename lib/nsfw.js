// lib/nsfw.js
// Client for the NSFW worker process (started on demand, stopped when idle).
import path from 'path';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER_PATH = path.join(__dirname, 'nsfwWorker.js');

const TIMEOUT_MS = 60000;        // first call also loads the model
const IDLE_MS = 10 * 60 * 1000;  // free the memory after 10 minutes without use
const MAX_PENDING = 12;          // protection against floods

let child = null;
let seq = 0;
let idleTimer = null;
const pending = new Map();

function startWorker() {
    child = fork(WORKER_PATH, [], {
        serialization: 'advanced',
        stdio: ['ignore', 'inherit', 'inherit', 'ipc']
    });

    child.on('message', (msg) => {
        const p = pending.get(msg.id);
        if (!p) return;
        pending.delete(msg.id);
        clearTimeout(p.timer);
        if (msg.ok) p.resolve(msg.scores);
        else p.reject(new Error(msg.error));
    });

    child.on('exit', (code, signal) => {
        if (code !== 0 && signal !== 'SIGTERM') {
            console.error(`[NSFW] Worker stopped (code: ${code}, signal: ${signal})`);
        }
        for (const [, p] of pending) {
            clearTimeout(p.timer);
            p.reject(new Error('NSFW worker stopped'));
        }
        pending.clear();
        child = null;
    });

    child.on('error', (err) => console.error('[NSFW] Worker error:', err.message));
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (child && pending.size === 0) child.kill('SIGTERM');
    }, IDLE_MS);
}

/**
 * Classify an image buffer (webp / png / jpg).
 * @returns {Promise<{Porn:number, Hentai:number, Sexy:number, Neutral:number, Drawing:number}>}
 */
export function classifyImage(buffer) {
    if (pending.size >= MAX_PENDING) {
        return Promise.reject(new Error('NSFW queue full'));
    }

    if (!child) startWorker();
    resetIdleTimer();

    return new Promise((resolve, reject) => {
        const id = ++seq;
        const timer = setTimeout(() => {
            pending.delete(id);
            reject(new Error('NSFW classification timed out'));
        }, TIMEOUT_MS);

        pending.set(id, { resolve, reject, timer });
        child.send({ id, buffer });
    });
}
