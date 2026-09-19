import { textBefore } from './editor-text.js';

const voicedPairs = [
    ['かきくけこ', 'がぎぐげご'],
    ['さしすせそ', 'ざじずぜぞ'],
    ['たちつてと', 'だぢづでど'],
    ['はひふへほ', 'ばびぶべぼ'],
    ['カキクケコ', 'ガギグゲゴ'],
    ['サシスセソ', 'ザジズゼゾ'],
    ['タチツテト', 'ダヂヅデド'],
    ['ハヒフヘホ', 'バビブベボ'],
    ['ウ', 'ヴ'],
];

const semiVoicedPairs = [
    ['はひふへほ', 'ぱぴぷぺぽ'],
    ['ハヒフヘホ', 'パピプペポ'],
];

const dakutenForward = new Map();
const dakutenBackward = new Map();
const semiVoicedForward = new Map();
const semiVoicedBackward = new Map();

for (const [base, voiced] of voicedPairs) {
    for (let i = 0; i < base.length; i ++) {
        dakutenForward.set(base[i], voiced[i]);
        dakutenBackward.set(voiced[i], base[i]);
    }
}

for (const [base, voiced] of semiVoicedPairs) {
    for (let i = 0; i < base.length; i ++) {
        semiVoicedForward.set(base[i], voiced[i]);
        semiVoicedBackward.set(voiced[i], base[i]);
    }
}

export function voiceKanaChar(char, mark) {
    const backward = mark === '゜' ? semiVoicedBackward : dakutenBackward;
    const forward = mark === '゜' ? semiVoicedForward : dakutenForward;

    if (backward.has(char)) return backward.get(char);
    if (forward.has(char)) return forward.get(char);

    return null;
}

export function voiceLastKana(quill, mark) {
    const selection = quill.getSelection();

    if (!selection) return;

    const before = textBefore(quill, selection.index, 4);
    const chars = [...before];
    const last = chars.length ? chars[chars.length - 1] : '';
    const replacement = voiceKanaChar(last, mark);

    if (replacement) {
        quill.deleteText(selection.index - last.length, last.length);
        quill.insertText(selection.index - last.length, replacement);
        quill.setSelection(selection.index - last.length + replacement.length, 0);
    } else {
        quill.insertText(selection.index, mark);
    }
}
