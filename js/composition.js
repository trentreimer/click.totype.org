import { settings } from './settings.js';
import { suggestEngine } from './language-settings.js';

const maxCandidates = 10;

export function compositionEnabled() {
    return suggestEngine.compositionActive;
}

export async function loadComposition() {
    suggestEngine.compositionReset();

    try {
        await suggestEngine.loadComposition();
    } catch (err) {
        console.error(err);
    }
}

export function compositionBuffer() {
    return suggestEngine.compositionBuffer();
}

export function compositionAppend(key) {
    return suggestEngine.compositionAppend(key);
}

export function compositionBackspace() {
    return suggestEngine.compositionBackspace();
}

export function compositionReset() {
    suggestEngine.compositionReset();
}

export function compositionVoiceLast(mark) {
    return suggestEngine.compositionVoiceLast(mark);
}

export function compositionPrimary() {
    const candidates = suggestEngine.compositionSuggestions(undefined, maxCandidates);

    return candidates.length ? candidates[0].text : suggestEngine.compositionBuffer();
}

export function compositionRender() {
    const strip = document.getElementById('suggestions');
    if (!strip) return;

    strip.querySelectorAll('button').forEach(e => e.remove());
    strip.querySelectorAll('.composition-buffer, .composition-hint').forEach(e => e.remove());

    const buffer = suggestEngine.compositionBuffer();

    if (!buffer) return;

    const chip = document.createElement('span');
    chip.className = 'composition-buffer';
    chip.textContent = buffer;
    strip.appendChild(chip);

    for (const candidate of suggestEngine.compositionSuggestions(undefined, maxCandidates)) {
        const button = document.createElement('button');
        button.setAttribute('data-key', candidate.text);
        button.textContent = candidate.text;
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
