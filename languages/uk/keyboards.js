const keyboards = {
    '1': [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'],
        ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є'],
        ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ґ', '.'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: '123#@', key: 'Keyboard 2', width: '12.5%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', ';', '/', '_', '-', '+', '$', '%', '₴', '°'],
        ['(', ')', '[', ']', '<', '>', ',', '.', '?', '!', '«', '»'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: 'АБВ', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
