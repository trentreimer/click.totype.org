import { settings } from './settings.js';
import { languages } from './languages.js';
import { voiceKanaChar } from './kana.js';

const maxCandidates = 10;

function kataToHira(text) {
    return text.replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function normalizeReading(text) {
    return kataToHira(text.normalize('NFC').toLowerCase().replaceAll(' ', ''));
}

let buffer = '';
let candidates = [];
let entries = [];
let exact = new Map();

export function compositionEnabled() {
    const meta = languages[settings.language];
    return !!(meta && meta.composing);
}

export async function loadComposition() {
    buffer = '';
    candidates = [];
    entries = [];
    exact = new Map();

    if (!compositionEnabled()) return;

    const compositionFile = `../languages/${settings.language}/composition.txt`;
    let fileContents;

    try {
        const response = await fetch(compositionFile);

        if (response.ok) {
            fileContents = await response.text();
        } else {
            throw new Error(`Unable to fetch ${compositionFile}`);
        }
    } catch (err) {
        console.error(err);
        return;
    }

    if (!fileContents) return;

    for (const line of fileContents.split("\n")) {
        const parts = line.trim().split(/\s+/);

        if (parts.length < 2) continue;

        const reading = normalizeReading(parts[0]);
        const readingCandidates = parts.slice(1);

        if (!exact.has(reading)) exact.set(reading, []);
        exact.get(reading).push(...readingCandidates);
        entries.push({ reading, candidates: readingCandidates });
    }
}

function normalizedBuffer() {
    return normalizeReading(buffer);
}

const digitKeys = {
    a: '2', b: '2', c: '2', d: '3', e: '3', f: '3', g: '4', h: '4', i: '4',
    j: '5', k: '5', l: '5', m: '6', n: '6', o: '6', p: '7', q: '7', r: '7', s: '7',
    t: '8', u: '8', v: '8', w: '9', x: '9', y: '9', z: '9',
};

function readingToDigits(reading) {
    let digits = '';

    for (const char of reading) {
        const digit = digitKeys[char];

        if (!digit) return null;

        digits += digit;
    }

    return digits;
}

function updateCandidates() {
    candidates = [];

    if (!buffer || entries.length === 0) return;

    const seen = new Set();

    const push = function(text) {
        if (seen.has(text)) return;
        seen.add(text);
        candidates.push(text);
    };

    if (/^\d+$/.test(buffer)) {
        for (const entry of entries) {
            const digits = readingToDigits(entry.reading);

            if (digits !== null && digits.startsWith(buffer)) {
                for (const text of entry.candidates) {
                    push(text);

                    if (candidates.length >= maxCandidates) return;
                }
            }
        }

        return;
    }

    const reading = normalizedBuffer();

    for (const text of exact.get(reading) || []) {
        push(text);
        if (candidates.length >= maxCandidates) return;
    }

    for (const entry of entries) {
        if (entry.reading.startsWith(reading)) {
            for (const text of entry.candidates) {
                push(text);
                if (candidates.length >= maxCandidates) return;
            }
        }

        if (candidates.length >= maxCandidates) break;
    }
}

export function compositionBuffer() {
    return buffer;
}

export function compositionAppend(key) {
    buffer += key;
    updateCandidates();
}

export function compositionBackspace() {
    if (!buffer) return false;

    buffer = buffer.slice(0, -1);
    updateCandidates();
    return true;
}

export function compositionVoiceLast(mark) {
    if (!buffer) return false;

    const chars = [...buffer];
    const replacement = voiceKanaChar(chars[chars.length - 1], mark);

    if (!replacement) return false;

    chars[chars.length - 1] = replacement;
    buffer = chars.join('');
    updateCandidates();
    return true;
}

export function compositionReset() {
    buffer = '';
    candidates = [];
}

export function compositionPrimary() {
    return candidates.length ? candidates[0] : buffer;
}

export function compositionRender() {
    const strip = document.getElementById('suggestions');
    if (!strip) return;

    strip.querySelectorAll('button').forEach(e => e.remove());
    strip.querySelectorAll('.composition-buffer, .composition-hint').forEach(e => e.remove());

    if (!buffer) return;

    const chip = document.createElement('span');
    chip.className = 'composition-buffer';
    chip.textContent = buffer;
    strip.appendChild(chip);

    for (const candidate of candidates) {
        const button = document.createElement('button');
        button.setAttribute('data-key', candidate);
        button.textContent = candidate;
        strip.appendChild(button);
    }
}

export function compositionIdle() {
    const strip = document.getElementById('suggestions');
    if (!strip) return;

    strip.querySelectorAll('button').forEach(e => e.remove());
    strip.querySelectorAll('.composition-buffer, .composition-hint').forEach(e => e.remove());

    if (!compositionEnabled()) return;

    const hint = document.createElement('span');
    hint.className = 'composition-hint';
    hint.textContent = settings.translations['composition hint'] || '';

    if (hint.textContent) strip.appendChild(hint);
}
