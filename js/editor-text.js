export function textBefore(quill, index, maxLength = 256) {
    const start = Math.max(0, index - maxLength);

    return quill.getText(start, index - start);
}
