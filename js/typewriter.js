import { settings } from './settings.js';
import { languages } from './languages.js';
import { initLanguage } from './language-settings.js';
import { setKeyboard, applyShift, toggleShift } from './keyboard.js';

await initLanguage();

const quill = new Quill('#editor', {
    //theme: 'snow',
    modules: {
        toolbar: '#quill-toolbar',
    }
});

quill.focus();

const maxSuggestions = 5;

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
        setKeyboard(1);
        applyShift();
    });
});

document.querySelectorAll('.delete-text').forEach(e => {
    e.addEventListener('click', function(event) {
        quill.setText('');
        quill.focus();
    });
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

document.querySelectorAll('#keyboard, #suggestions').forEach(entryElm => {
    entryElm.addEventListener('click', function(event) {
        event.preventDefault();
        const button = event.target.closest('button');

        if (button) {
            const selection = getSelection();

            if (selection === null) return;

            let shift = document.querySelector('#keyboard').classList.contains('shift');
            const key = shift && button.getAttribute('data-shift-key') !== null ? button.getAttribute('data-shift-key') : button.getAttribute('data-key');
            //console.log(key);

            quill.setSelection(selection);
            if (selection.length) quill.deleteText(selection.index, selection.length);

            if (entryElm.id === 'keyboard' && key === 'Shift') {
                autoSpace = false;
                toggleShift();
            } else if (entryElm.id === 'keyboard' && key === 'Enter') {
                autoSpace = false;
                if (selection.length) quill.deleteText(selection.index, selection.length);
                quill.insertText(selection.index, "\n");
                //applyShift();
                shift = false;
            } else if (entryElm.id === 'keyboard' && key === 'Backspace') {
                autoSpace = false;

                if (selection.length) { // This was already taken care of
                } else if (selection.index > 0) {
                    quill.deleteText(selection.index - 1, 1);
                    quill.setSelection(selection.index - 1, 0);

                    if (selection.index < 2 && settings.activeKeyboard == '1') {
                        applyShift();
                        shift = false;
                    }
                } else {
                    return;
                }
            } else if (entryElm.id === 'keyboard' && key === 'Keyboard 1') {
                autoSpace = false;
                setKeyboard('1');
                return;
            } else if (entryElm.id === 'keyboard' && key === 'Keyboard 2') {
                autoSpace = false;
                setKeyboard('2');
                return;
            } else {
                if (selection.length) quill.deleteText(selection.index, selection.length);

                quill.insertText(selection.index, key);

                // Auto-spacing
                if (['.', ',', '?', '!', ':'].includes(key)) {
                    let spaceRemoved = false;
                    const prevChars = quill.getText(selection.index - 2, 2).split('');

                    if (autoSpace && prevChars.length && prevChars[prevChars.length - 1] == ' ') {
                        quill.deleteText(selection.index - 1, 1);
                        spaceRemoved = true;
                    }

                    if (prevChars.length && prevChars[0].match(/[a-zA-Z]/)) {
                        const point = spaceRemoved ? selection.index : selection.index + 1;
                        quill.insertText(point, ' ');
                        autoSpace = true;

                        if (['.', '?', '!'].includes(key)) {
                            applyShift();
                            shift = false;
                        }
                    } else {
                        autoSpace = false;
                    }
                } else if (entryElm.id === 'suggestions') {
                    quill.insertText(selection.index + key.length, ' ');
                    autoSpace = true;
                } else {
                    autoSpace = false;
                }
            }

            document.querySelectorAll('#suggestions button').forEach(e => e.remove());

            if (entryElm.id === 'keyboard' && key.length === 1 && key.match(/[a-zA-Z]/)) {
                // Autocomplete suggestions
                let wordStartPos = 0;

                const selection = getSelection();
                const str = quill.getText(0, selection.index);

                if (selection.index > 1) {
                    for (let i = selection.index - 1; i > 0; i --) {
                        if (wordStartPos === 0 && /[^a-zA-Z]/.test(str.charAt(i))) {
                            wordStartPos = i + 1;
                            break;
                        }
                    }
                }

                if (wordStartPos < selection.index) {
                    const currentWord = str.substring(wordStartPos, selection.index);
                    const firstLetter = currentWord.charAt(0).toUpperCase();

                    if (settings.autocompleteLibrary[firstLetter] && Array.isArray(settings.autocompleteLibrary[firstLetter])) {
                        const suggestions = [];

                        for (const suggestion of settings.autocompleteLibrary[firstLetter]) {
                            if (suggestion.length > currentWord.length && suggestion.substring(0, currentWord.length).toLowerCase() == currentWord.toLowerCase()) {
                                suggestions.push(currentWord + suggestion.substring(currentWord.length));
                            }

                            if (suggestions.length == maxSuggestions) break;
                        }

                        suggestions.sort();

                        for (const suggestion of suggestions) {
                            const button = document.createElement('button');

                            button.setAttribute('data-key', suggestion.substring(currentWord.length));
                            button.textContent = suggestion;

                            document.getElementById('suggestions').appendChild(button);
                        }
                    }
                }
            }

            quill.scrollSelectionIntoView();

            if (shift && !(entryElm.id === 'keyboard' && key === 'Shift')) {
                toggleShift();
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
        const buttonTops = [];

        document.querySelectorAll('#toolbars button.ql-strike').forEach(e => e.classList.remove('hidden'));

        document.querySelectorAll('#toolbars button').forEach(function(e) {
            if (getComputedStyle(e).getPropertyValue('display') != 'none') {
                buttonTops.push(e.getBoundingClientRect().top);
            }
        });

        let wrapping = false;

        for (let i = 1; i < buttonTops.length; i ++) {
            if (buttonTops[i] > buttonTops[i - 1]) {
                wrapping = true;
                break;
            }
        }

        return wrapping;
    }

    while (toolbarFontSize > remPx && toolButtonsWrap()) {
        toolbarFontSize --;
        document.querySelector('#toolbars').style.fontSize = `${toolbarFontSize}px`;
    }

    // Ensure the keyboard doesn't take up too much of the available screen height
    while (fontSize > remPx && wh - getToolsHeight() < (fontSize * 1.25 * 5 + 20)) {
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
