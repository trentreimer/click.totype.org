// Best-effort 2-beolsik (두벌식) layout. TODO: native-speaker review.
// Hangul has no case, so the app's automatic shift layer (keyboard.js) derives
// nothing here: only 7 of the 26 jamo differ at the KS X 5002 Shift level (the
// tense consonants and ㅒ/ㅖ), and those are declared explicitly. Every other
// jamo is identical at both levels, so those keys carry no shift value.
const group = (base, shifted) => ({ text: base, key: base, shiftText: shifted, shiftKey: shifted });

const keyboards = {
    '1': [
        [group('ㅂ', 'ㅃ'), group('ㅈ', 'ㅉ'), group('ㄷ', 'ㄸ'), group('ㄱ', 'ㄲ'), group('ㅅ', 'ㅆ'), 'ㅛ', 'ㅕ', 'ㅑ', group('ㅐ', 'ㅒ'), group('ㅔ', 'ㅖ')],
        ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
        ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', ',', '.', '?', '!'],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '12.5%'},
            {text: 'Space', key: ' ', width: '62.5%'},
            {text: '123#@', key: 'Keyboard 2', width: '12.5%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '<', '>', '~', '`', '^', '·'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: '한글', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
