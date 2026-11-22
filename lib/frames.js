// lib/frames.js
// Extracts a few frames (JPEG buffers) from a video with ffmpeg (child process).
import fs from 'fs';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// Uses ffmpeg-static if installed (npm i ffmpeg-static), otherwise system ffmpeg
let ffmpegBin = 'ffmpeg';
try {
    const mod = await import('ffmpeg-static');
    ffmpegBin = mod.default || 'ffmpeg';
} catch {}

let warned = false;

/**
 * @param {Buffer} videoBuffer
 * @param {number} seconds video duration (0 if unknown)
 * @returns {Promise<Buffer[]>} up to 3 frames (start, middle, end); [] if ffmpeg is unavailable
 */
export async function extractFrames(videoBuffer, seconds = 0) {
    const id = crypto.randomBytes(6).toString('hex');
    const input = path.join(os.tmpdir(), `vid_${id}.bin`);
    const frames = [];

    const duration = Number(seconds) > 0 ? Number(seconds) : 3;
    const times = [...new Set([0.3, duration * 0.5, Math.max(duration - 0.5, 0.3)].map(t => t.toFixed(2)))];

    try {
        fs.writeFileSync(input, videoBuffer);

        for (let i = 0; i < times.length; i++) {
            const output = path.join(os.tmpdir(), `vid_${id}_${i}.jpg`);
            try {
                await execFileAsync(ffmpegBin, [
                    '-y', '-ss', times[i], '-i', input,
                    '-frames:v', '1',
                    '-vf', 'scale=320:-2',
                    '-q:v', '3',
                    output
                ], { timeout: 30000 });

                if (fs.existsSync(output)) frames.push(fs.readFileSync(output));
            } catch (e) {
                if (e.code === 'ENOENT' && !warned) {
                    warned = true;
                    console.error('[ANTIPORN] ffmpeg not found, videos are checked with their thumbnail only (npm i ffmpeg-static)');
                    break;
                }
            } finally {
                fs.promises.unlink(output).catch(() => {});
            }
        }
    } finally {
        fs.promises.unlink(input).catch(() => {});
    }

    return frames;
}
