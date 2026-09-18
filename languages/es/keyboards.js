const keyboards = {
    '1': [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {text: '←', key: 'Backspace'}],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', ':'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '!'],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '40%'},
            {text: 'áéíóú', key: 'Keyboard 2', width: '15%'},
            {text: '123#@', key: 'Keyboard 3', width: '20%'},
            {text: '↲', key:  'Enter', width: '10%'}
        ],
    ],
    '2': [
        ['á', 'é', 'í', 'ó', 'ú', 'ü', '¿', '¡', {text: '←', key: 'Backspace'}],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '40%'},
            {text: 'ABC', key: 'Keyboard 1', width: '15%'},
            {text: '123#@', key: 'Keyboard 3', width: '15%'},
            {text: '↲', key:  'Enter', width: '15%'}
        ],
    ],
    '3': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ';', '/', '_', '-', '+', '$', '%', '€', '°'],
        ['(', ')', '[', ']', '<', '>', '\'', '"', '«', '»'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '45%'},
            {text: 'ABC', key: 'Keyboard 1', width: '15%'},
            {text: 'áéíóú', key: 'Keyboard 2', width: '15%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
