// Best-effort Hebrew layout. TODO: native-speaker review.
const keyboards = {
    '1': [
        ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', {text: '←', key: 'Backspace'}],
        ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
        ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', ','],
        [
            {text: 'Space', key: ' ', width: '62.5%'},
            {text: '123#@', key: 'Keyboard 2', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '<', '>', '~', '\`', '^', '?', '!', '.'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: 'אבג', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
