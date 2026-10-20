import { languages } from './languages.js';
import { settings, storageKey, storagePrefix } from './settings.js';
import { setKeyboard, applyShift } from './keyboard.js';
import { loadComposition, compositionIdle } from './composition.js';
import { SuggestEngine, voiceKanaChar, composeJamo, backspaceHangul } from 'https://cdn.jsdelivr.net/gh/trentreimer/suggest-engine@v0.12.0/dist/suggest-engine.esm.js';

export { voiceKanaChar, composeJamo, backspaceHangul };

const userWordsEnabledKey = storageKey('user-words-enabled');

// Values written before storage keys were namespaced are dropped so a stale
// key from another page on this origin can never influence the app.
for (const key of ['language', 'ctt:user-words', 'ctt:user-words-enabled', 'ctt:personal-words', 'personal-words']) {
    localStorage.removeItem(key);
}

function clearStoredUserWords() {
    localStorage.removeItem(storageKey('user-words'));
    localStorage.removeItem(storageKey('personal-words'));
    localStorage.removeItem('personal-words');
}

function userWordsEnabled() {
    return localStorage.getItem(userWordsEnabledKey) !== 'off';
}

export function isUserWordsEnabled() {
    return suggestEngine.userWordsEnabled;
}

export function setUserWordsEnabled(enabled) {
    localStorage.setItem(userWordsEnabledKey, enabled ? 'on' : 'off');

    if (enabled) {
        suggestEngine.enableUserWords();
    } else {
        suggestEngine.disableUserWords();
        clearStoredUserWords();
    }
}

export const suggestEngine = new SuggestEngine({
    maxSuggestions: 5,
    ...(userWordsEnabled() ? { userWords: { storagePrefix } } : {}),
});

if (!suggestEngine.userWordsEnabled) clearStoredUserWords();

export function applyLanguageToDocument() {
    const meta = languages[settings.language];
    const dir = meta.dir || 'ltr';

    document.documentElement.lang = settings.language;
    document.documentElement.dir = dir;

    const editorRoot = document.querySelector('#editor .ql-editor');
    if (editorRoot) {
        editorRoot.lang = settings.language;
        editorRoot.dir = dir;
    }
}

export async function setLanguage(lang) {
    const code = lang.toLowerCase();
    const base = code.indexOf('-') > 0 ? code.substring(0, code.indexOf('-')) : code;

    if (languages[base]) {
        settings.language = base;
    } else {
        settings.language = Object.keys(languages)[0];
    }

    console.log(`language = ${settings.language}`);

    document.querySelector('link#selected-language-stylesheet')?.setAttribute('href', `languages/${settings.language}/${settings.language}.css`);

    const [keyboards, translations, punctuation] = await Promise.all([
        import(`../languages/${settings.language}/keyboards.js`),
        import(`../languages/${settings.language}/translations.js`),
        import(`../languages/${settings.language}/punctuation.js`),
    ]);

    settings.keyboards = keyboards.default;
    settings.translations = translations.translations;
    settings.punctuation = punctuation.punctuation;

    document.querySelectorAll('.translate[data-translate]').forEach(e => {
        const key = e.getAttribute('data-translate');
        if (settings.translations[key]) e.textContent = settings.translations[key];
    });

    document.querySelectorAll('.translate-aria[data-translate-aria]').forEach(e => {
        const key = e.getAttribute('data-translate-aria');
        if (settings.translations[key]) {
            e.setAttribute('aria-label', settings.translations[key]);
            e.setAttribute('data-tooltip', settings.translations[key]);
        }
    });

    applyLanguageToDocument();

    setKeyboard('1');
    if (!languages[settings.language].caseless) applyShift();

    // Engine language first: the composition load below keys off it. The word
    // list and context model only shape suggestion quality — the engine
    // degrades to frequency-only suggestions until they land, so they load in
    // the background without delaying the editor. Kept sequential inside the
    // task: building the context index before the word list exists would
    // cache a null index for the session.
    suggestEngine.setLanguage(settings.language);

    loadSuggestionData();

    await loadComposition();
    compositionIdle();
}

export async function initLanguage() {
    const stored = localStorage.getItem(storageKey('language'));

    if (stored && languages[stored.toLowerCase()]) {
        await setLanguage(stored);
        return true;
    }

    for (const lang of navigator.languages) {
        const code = lang.toLowerCase();
        const base = lang.indexOf('-') > 0 ? code.substring(0, code.indexOf('-')) : code;

        if (languages[base]) {
            await setLanguage(base);
            return true;
        }
    }

    await setLanguage(Object.keys(languages)[0]);
    return true;
}

export function loadSuggestionData() {
    return suggestEngine.loadWordList()
        .then(() => suggestEngine.loadSuggestionContext())
        .catch(err => console.error(err));
}
