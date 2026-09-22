import { textBefore } from './editor-text.js';
import { composeJamo, backspaceHangul } from './language-settings.js';

const hangulRun = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]+$/u;

export function composeTrailingJamo(quill) {
    const selection = quill.getSelection();

    if (!selection || selection.index === 0) return;

    const match = textBefore(quill, selection.index).match(hangulRun);

    if (!match) return;

    const run = match[0];
    const composed = composeJamo(run);

    if (composed === run) return;

    const start = selection.index - run.length;

    quill.deleteText(start, run.length);
    quill.insertText(start, composed);
    quill.setSelection(start + composed.length, 0);
}

export function backspaceJamo(quill) {
    const selection = quill.getSelection();

    if (!selection || selection.length || selection.index === 0) return false;

    const match = textBefore(quill, selection.index).match(hangulRun);

    if (!match) return false;

    const run = match[0];
    const stepped = backspaceHangul(run);

    if (stepped === null) return false;

    const start = selection.index - run.length;

    quill.deleteText(start, run.length);

    if (stepped) quill.insertText(start, stepped);

    quill.setSelection(start + stepped.length, 0);

    return true;
}
