import { settings, effectiveBehavior, setBehaviorOverride } from './settings.js';
import { languages } from './languages.js';
import { initLanguage, setLanguage, applyLanguageToDocument, suggestEngine, isUserWordsEnabled, setUserWordsEnabled } from './language-settings.js';
import { setKeyboard, applyShift, toggleShift } from './keyboard.js';
import { compositionEnabled, compositionBuffer, compositionAppend, compositionBackspace, compositionPrimary, compositionReset, compositionRender, compositionIdle, compositionVoiceLast } from './composition.js';
import { voiceLastKana } from './kana.js';
import { textBefore } from './editor-text.js';
import { initTooltips } from './tooltips.js';

initTooltips();

let quill;

try {
    await initLanguage();

    quill = new Quill('#editor', {
        //theme: 'snow',
        modules: {
            toolbar: '#quill-toolbar',
        }
    });

    applyLanguageToDocument();

    // Layout before revealing so the first painted frame is already sized.
    sizeDisplay();
    document.getElementById('loading')?.classList.add('hidden');

    quill.focus();
} catch (err) {
    console.error(err);
    document.getElementById('loading')?.classList.add('failed');
}

const graphemeSegmenter = 'Segmenter' in Intl ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;

function previousGraphemeLength(text) {
    if (!text) return 1;

    if (graphemeSegmenter) {
        const segments = [...graphemeSegmenter.segment(text)];
        return segments[segments.length - 1].segment.length;
    }

    const match = text.match(/\P{M}\p{M}*$/su);
    return match ? match[0].length : 1;
}

function wordBeforeCursor(index) {
    const text = textBefore(quill, index);

    return suggestEngine.wordAt(text, text.length);
}

function copyAllText() {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(quill.root);

    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand('copy');
    } catch (error) {
        console.error('Failed to copy content', error);
    }
}



document.querySelectorAll('.copy-text').forEach(e => {
    e.addEventListener('click', copyAllText);
});

document.querySelectorAll('.cut-text').forEach(e => {
    e.addEventListener('click', function(event) {
        copyAllText();
        quill.setText('');
        quill.focus();
        setKeyboard('1');
        if (effectiveBehavior('autoUppercase') && !languages[settings.language].caseless) applyShift();
        compositionReset();
        compositionIdle();
    });
});

document.querySelectorAll('.delete-text').forEach(e => {
    e.addEventListener('click', function(event) {
        quill.setText('');
        quill.focus();
    });
});

function updateBehaviorToggles() {
    document.querySelectorAll('#settings input[data-behavior]').forEach(input => {
        input.checked = effectiveBehavior(input.getAttribute('data-behavior'));
    });

    const caseless = !!(languages[settings.language] && languages[settings.language].caseless);
    document.querySelector('.behavior-option input[data-behavior="autoUppercase"]')?.closest('.behavior-option').classList.toggle('hidden', caseless);

    const composing = !!(languages[settings.language] && languages[settings.language].composing);
    document.querySelector('.behavior-option:has(#user-words-toggle)')?.classList.toggle('hidden', composing);
}

document.querySelectorAll('#settings input[data-behavior]').forEach(input => {
    input.addEventListener('change', function() {
        setBehaviorOverride(input.getAttribute('data-behavior'), input.checked);
        updateBehaviorToggles();
    });
});

const userWordsToggle = document.querySelector('#user-words-toggle');

userWordsToggle.checked = isUserWordsEnabled();

userWordsToggle.addEventListener('change', function() {
    setUserWordsEnabled(userWordsToggle.checked);
});

updateBehaviorToggles();

document.querySelector('.settings-open').addEventListener('click', function() {
    document.querySelector('#settings').showModal();
});

document.querySelector('.settings-close').addEventListener('click', function() {
    document.querySelector('#settings').close();
});

const languageSelect = document.querySelector('#language-select');

for (const [code, meta] of Object.entries(languages)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = meta.name;
    languageSelect.appendChild(option);
}

languageSelect.value = settings.language;

languageSelect.addEventListener('change', async function() {
    await setLanguage(languageSelect.value);
    localStorage.setItem('language', settings.language);
    languageSelect.value = settings.language;
    updateBehaviorToggles();
    sizeDisplay();
});

function getSelection() {
    let selection = quill.getSelection();

    if (selection === null) {
        console.log('quill.getSelection() initially returned null');
        quill.focus();
        selection = quill.getSelection();

        if (selection === null) {
            console.log('quill.getSelection() returned null even after applying focus');
            return null;
        }
    }

    return selection;
}

// Track when spaces have been added automatically
let autoSpace = false;

function closeKeyStrip() {
    document.querySelector('#key-strip')?.remove();
}

function openKeyStrip(button) {
    closeKeyStrip();

    const strip = document.createElement('div');
    strip.id = 'key-strip';
    const replaceChar = button.getAttribute('data-key');

    for (const char of JSON.parse(button.getAttribute('data-group'))) {
        const option = document.createElement('button');

        option.textContent = char;
        option.setAttribute('data-text', char);
        option.setAttribute('data-key', char);

        if (replaceChar !== null) {
            option.setAttribute('data-replace', replaceChar);
        }

        strip.appendChild(option);
    }

    const cancel = document.createElement('button');

    cancel.textContent = '✕';
    cancel.setAttribute('data-strip-cancel', '');
    cancel.setAttribute('aria-label', 'close');
    strip.appendChild(cancel);

    document.querySelector('#keyboard').appendChild(strip);
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('#key-strip') && !event.target.closest('button[data-group]')) {
        closeKeyStrip();
    }
});

document.querySelectorAll('#keyboard, #suggestions').forEach(entryElm => {
    entryElm.addEventListener('click', function(event) {
        event.preventDefault();
        const button = event.target.closest('button');

        if (button) {
            if (button.hasAttribute('data-strip-cancel')) {
                closeKeyStrip();
                return;
            }

            if (button.hasAttribute('data-group') && button.getAttribute('data-key') === null) {
                openKeyStrip(button);
                return;
            }

            const selection = getSelection();

            if (selection === null) return;

            let shift = document.querySelector('#keyboard').classList.contains('shift');
            const key = shift && button.getAttribute('data-shift-key') !== null ? button.getAttribute('data-shift-key') : button.getAttribute('data-key');
            //console.log(key);

            const composing = compositionEnabled();
            const replaceChar = button.getAttribute('data-replace');

            if (replaceChar !== null) {
                if (composing && replaceChar === compositionBuffer().slice(-1)) {
                    compositionBackspace();
                } else if (selection.length === 0 && selection.index > 0 && quill.getText(selection.index - 1, 1) === replaceChar) {
                    quill.deleteText(selection.index - 1, 1);
                    quill.setSelection(selection.index - 1, 0);
                    selection.index -= 1;
                }
            }

            quill.setSelection(selection);
            if (selection.length) quill.deleteText(selection.index, selection.length);

            if (entryElm.id === 'keyboard' && key === 'Shift') {
                autoSpace = false;
                toggleShift();
            } else if (entryElm.id === 'keyboard' && key === 'Enter') {
                autoSpace = false;
                if (composing && compositionBuffer()) {
                    quill.insertText(selection.index, compositionBuffer());
                    compositionReset();
                } else {
                    if (!composing) suggestEngine.recordWord(wordBeforeCursor(selection.index));
                    quill.insertText(selection.index, "\n");
                }
                //applyShift();
                shift = false;
            } else if (entryElm.id === 'keyboard' && key === 'Backspace') {
                autoSpace = false;

                if (selection.length) { // This was already taken care of
                } else if (composing && compositionBackspace()) {
                    // Removed the last character of the composition buffer
                } else if (selection.index > 0) {
                    const deleteLength = previousGraphemeLength(textBefore(quill, selection.index));
                    quill.deleteText(selection.index - deleteLength, deleteLength);
                    quill.setSelection(selection.index - deleteLength, 0);

                    if (selection.index < 2 && settings.activeKeyboard == '1' && effectiveBehavior('autoUppercase') && !languages[settings.language].caseless) {
                        applyShift();
                        shift = false;
                    }
                } else {
                    return;
                }
            } else if (entryElm.id === 'keyboard' && (key === '゛' || key === '゜')) {
                autoSpace = false;

                if (!(composing && compositionVoiceLast(key))) {
                    voiceLastKana(quill, key);
                }
            } else if (entryElm.id === 'keyboard' && key.startsWith('Keyboard ')) {
                autoSpace = false;
                if (composing && compositionBuffer()) {
                    quill.insertText(selection.index, compositionBuffer());
                    compositionReset();
                }
                setKeyboard(key.substring('Keyboard '.length));
            } else {
                if (selection.length) quill.deleteText(selection.index, selection.length);

                if (!composing && !/\p{L}$/u.test(key)) {
                    suggestEngine.recordWord(wordBeforeCursor(selection.index));
                }

                if (composing && entryElm.id === 'suggestions') {
                    quill.insertText(selection.index, key);
                    suggestEngine.recordWord(key);
                    compositionReset();
                    autoSpace = false;
                } else if (composing && entryElm.id === 'keyboard' && key === ' ' && compositionBuffer()) {
                    const primary = compositionPrimary();

                    quill.insertText(selection.index, primary);
                    suggestEngine.recordWord(primary);
                    compositionReset();
                    autoSpace = false;
                } else if (composing && entryElm.id === 'keyboard' && button.hasAttribute('data-t9') && /^[2-9]$/.test(key)) {
                    compositionAppend(key);
                    autoSpace = false;
                } else if (composing && entryElm.id === 'keyboard' && (/^[a-z]$/.test(key) || /^[\p{Script=Hiragana}\p{Script=Katakana}\u30FC]$/u.test(key))) {
                    compositionAppend(key);
                    autoSpace = false;
                } else {
                    const punctuation = settings.punctuation;
                    const spaceAfterList = punctuation && Array.isArray(punctuation.spaceAfter) ? punctuation.spaceAfter : ['.', ',', '?', '!', ':'];
                    const spaceBeforeList = punctuation && Array.isArray(punctuation.spaceBefore) ? punctuation.spaceBefore : [];
                    const sentenceTerminators = punctuation && Array.isArray(punctuation.sentenceTerminators) ? punctuation.sentenceTerminators : ['.', '?', '!'];
                    const spaceBeforeChar = punctuation && typeof punctuation.spaceBeforeChar === 'string' ? punctuation.spaceBeforeChar : '\u202F';
                    const autoSpaceEnabled = effectiveBehavior('autoSpace');
                    const autoUppercaseEnabled = effectiveBehavior('autoUppercase');

                    let insertIndex = selection.index;

                    if (autoSpaceEnabled && spaceBeforeList.includes(key) && insertIndex > 0) {
                        const prevChar = quill.getText(insertIndex - 1, 1);

                        if (prevChar.match(/\p{L}/u)) {
                            quill.insertText(insertIndex, spaceBeforeChar);
                            insertIndex += 1;
                        }
                    }

                    quill.insertText(insertIndex, key);

                    // Auto-spacing
                    if (autoSpaceEnabled && spaceAfterList.includes(key)) {
                        let spaceRemoved = false;
                        const prevChars = quill.getText(insertIndex - 2, 2).split('');

                        if (autoSpace && prevChars.length && (prevChars[prevChars.length - 1] == ' ' || prevChars[prevChars.length - 1] == spaceBeforeChar)) {
                            quill.deleteText(insertIndex - 1, 1);
                            spaceRemoved = true;
                        }

                        if (prevChars.length && prevChars[0].match(/\p{L}/u)) {
                            const point = spaceRemoved ? insertIndex : insertIndex + 1;
                            quill.insertText(point, ' ');
                            autoSpace = true;

                            if (autoUppercaseEnabled && sentenceTerminators.includes(key)) {
                                applyShift();
                                shift = false;
                            }
                        } else {
                            autoSpace = false;
                        }
                    } else if (entryElm.id === 'suggestions') {
                        quill.insertText(selection.index + key.length, ' ');
                        autoSpace = true;
                        suggestEngine.recordWord(wordBeforeCursor(selection.index + key.length));
                    } else {
                        autoSpace = false;
                    }
                }
            }

            document.querySelectorAll('#suggestions button').forEach(e => e.remove());

            if (composing) {
                compositionRender();
            } else if (entryElm.id === 'keyboard' && key.length === 1 && key.match(/\p{L}/u)) {
                // Context-aware autocomplete suggestions
                const selection = getSelection();
                const text = textBefore(quill, selection.index);

                for (const suggestion of suggestEngine.suggestAt(text, text.length)) {
                    const button = document.createElement('button');

                    button.setAttribute('data-key', suggestion.insertSuffix);
                    button.textContent = suggestion.text;

                    document.getElementById('suggestions').appendChild(button);
                }
            }

            quill.scrollSelectionIntoView();

            if (shift && !(entryElm.id === 'keyboard' && key === 'Shift')) {
                toggleShift();
            }

            if (button.hasAttribute('data-group')) {
                openKeyStrip(button);
            } else {
                closeKeyStrip();
            }
        }
    });
});

function getEditorHeight() {
    return document.querySelector('#editor').getBoundingClientRect().height;
}

function getToolsHeight() {
    return document.querySelector('#tools').getBoundingClientRect().height;
}

function sizeDisplay() {
    const wh = windowHeight();
    const ww = windowWidth();

    // Get the pixel size of a 1rem font
    document.body.style.fontSize = '1rem';
    const remPx = parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));

    // Set an initial body font size
    document.body.style.fontSize = wh < 600 ? '1.5rem' : '2rem';
    let fontSize = parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));

    // Ensure the toolbar isn't too wide for the available screen width
    let toolbarFontSize = fontSize;
    document.querySelector('#toolbars').style.fontSize = `${toolbarFontSize}px`;

    const toolButtonsWrap = function() {
        document.querySelectorAll('#toolbars button.ql-strike').forEach(e => e.classList.remove('hidden'));

        const containers = document.querySelectorAll('#quill-toolbar, #custom-toolbar');
        const tolerance = parseFloat(getComputedStyle(document.querySelector('#toolbars')).fontSize) / 2;

        for (const container of containers) {
            const tops = [];

            container.querySelectorAll('button').forEach(function(e) {
                if (getComputedStyle(e).getPropertyValue('display') != 'none') {
                    tops.push(e.getBoundingClientRect().top);
                }
            });

            if (tops.length > 1 && tops.some(t => t - tops[0] > tolerance)) {
                return true;
            }
        }

        return false;
    }

    while (toolbarFontSize > remPx && toolButtonsWrap()) {
        toolbarFontSize --;
        document.querySelector('#toolbars').style.fontSize = `${toolbarFontSize}px`;
    }

    // Ensure the keyboard doesn't take up too much of the available screen height
    while (fontSize > remPx && wh - getToolsHeight() < (fontSize * 1.25 * 4 + 20)) {
        fontSize --;
        document.body.style.fontSize = `${fontSize}px`;
    }

    // Ensure the keyboard isn't too wide for the available screen width
    const keysWrap = function() {
        let buttonHeight;
        const buttons = Array.from(document.querySelectorAll('#keyboard button'));

        for (const b of buttons) {
            const r = b.getBoundingClientRect();

            if (r.left < 10) {
                return true;
            } else {
                const bh = r.height;

                if (typeof buttonHeight === 'undefined') {
                    buttonHeight = bh;
                } else if (bh > buttonHeight) {
                    return true;
                }
            }
        }
    }

    while (fontSize > remPx && keysWrap()) {
        fontSize --;
        document.body.style.fontSize = `${fontSize}px`;
    }

    const editorHeight = `${wh - getToolsHeight()}px`;
    document.querySelector('#editor-area').style.height = editorHeight;
}

setTimeout(sizeDisplay, 0);
window.addEventListener('resize', sizeDisplay);

// Make it easy to focus the editor
document.querySelector('#editor-area').addEventListener('click', function(event) {
    if (document.activeElement !== quill.root) {
        quill.focus();
    }
});
