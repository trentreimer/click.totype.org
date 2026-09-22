// Best-effort Turkish layout: base Latin rows plus Turkish-specific letters.
const keyboards = {
    '1': [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', {text: '←', key: 'Backspace'}],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç', 'ü', 'ğ', '.'],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: '123#@', key: 'Keyboard 2', width: '25%'},
            {text: '↲', key:  'Enter', width: '10%'}
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '<', '>', '~', '\`', '^', ',', '?', '!'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: 'ABC.,?', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
