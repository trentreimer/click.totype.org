import { textBefore } from './editor-text.js';
import { voiceKanaChar } from './language-settings.js';

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
