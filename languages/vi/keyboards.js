// Best-effort Vietnamese layout: base Latin rows plus Vietnamese-specific letters.
const keyboards = {
    '1': [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {text: '←', key: 'Backspace'}],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'đ', 'ơ'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ư', 'ă', 'â', 'ê', '.'],
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
