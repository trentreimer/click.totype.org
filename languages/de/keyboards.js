const keyboards = {
    '1': [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
        ['y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '!'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '12.5%'},
            {text: 'Space', key: ' ', width: '30%'},
            {text: 'ßéè', key: 'Keyboard 2', width: '15%'},
            {text: '123#@', key: 'Keyboard 3', width: '17.5%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
    '2': [
        [{text: 'ß', key: 'ß', shiftText: 'ẞ', shiftKey: 'ẞ'}, 'é', 'è', 'à', 'á', 'í', 'ó', 'ú', {text: '←', key: 'Backspace'}],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '40%'},
            {text: 'QWERTZ', key: 'Keyboard 1', width: '15%'},
            {text: '123#@', key: 'Keyboard 3', width: '15%'},
            {text: '↲', key:  'Enter', width: '15%'}
        ],
    ],
    '3': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', ';', '/', '_', '-', '+', '$', '%', '€'],
        ['(', ')', '[', ']', '<', '>', '\'', '"', '«', '»', '°'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '45%'},
            {text: 'QWERTZ', key: 'Keyboard 1', width: '15%'},
            {text: 'ßéè', key: 'Keyboard 2', width: '15%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
