const keyboards = {
    '1': [
        ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {text: '←', key: 'Backspace'}],
        ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', '\''],
        ['w', 'x', 'c', 'v', 'b', 'n', ',', '.', '?', '!', ':'],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '40%'},
            {text: 'éàç', key: 'Keyboard 2', width: '15%'},
            {text: '123#@', key: 'Keyboard 3', width: '20%'},
            {text: '↲', key:  'Enter', width: '10%'}
        ],
    ],
    '2': [
        ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'œ'],
        ['û', 'ù', 'ü', 'ÿ', 'æ', {text: '←', key: 'Backspace', width: '12.5%'}],
        [
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '45%'},
            {text: 'AZERTY', key: 'Keyboard 1', width: '20%'},
            {text: '123#@', key: 'Keyboard 3', width: '20%'}
        ],
    ],
    '3': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', '/', '_', '-', '+', '$', '%', '€', '°'],
        ['(', ')', '[', ']', '<', '>', ';', '"', '«', '»'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '45%'},
            {text: 'AZERTY', key: 'Keyboard 1', width: '15%'},
            {text: 'éàç', key: 'Keyboard 2', width: '15%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
