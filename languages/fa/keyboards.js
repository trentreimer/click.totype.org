// Best-effort Persian layout. TODO: native-speaker review.
const keyboards = {
    '1': [
        ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
        ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
        ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'ژ', '،', '؟'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '52.5%'},
            {text: '123#@', key: 'Keyboard 2', width: '25%'},
            {text: '↲', key:  'Enter', width: '10%'}
        ],
    ],
    '2': [
        ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '<', '>', '~', '\`', '^', 'ء', 'ئ'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: 'ابپ', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
