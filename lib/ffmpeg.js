// lib/ffmpeg.js - run ffmpeg in a child process (ffmpeg-static if installed, else system ffmpeg)
import fs from 'fs';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

let ffmpegBin = 'ffmpeg';
try {
    const mod = await import('ffmpeg-static');
    ffmpegBin = mod.default || 'ffmpeg';
} catch {}

export const tmpPath = (ext) => path.join(os.tmpdir(), `kaya_${crypto.randomBytes(6).toString('hex')}.${ext}`);

/** Converts `inputBuffer` with ffmpeg and returns the output buffer. `build(inFile, outFile)` returns the args. */
export async function convert(inputBuffer, outExt, build, timeout = 120000) {
    const input = tmpPath('bin');
    const output = tmpPath(outExt);
    try {
        fs.writeFileSync(input, inputBuffer);
        await execFileAsync(ffmpegBin, ['-y', ...build(input, output)], { timeout });
        return fs.readFileSync(output);
    } finally {
        fs.promises.unlink(input).catch(() => {});
        fs.promises.unlink(output).catch(() => {});
    }
}
