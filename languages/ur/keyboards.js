// Best-effort Urdu layout. TODO: native-speaker review.
const keyboards = {
    '1': [
        ['ط', 'ص', 'ھ', 'د', 'ٹ', 'پ', 'ت', 'ب', 'ج', 'ح', 'خ', 'د'],
        ['م', 'و', 'ر', 'ن', 'ل', 'ہ', 'ا', 'ک', 'ی', 'ق', 'ف'],
        ['ے', 'س', 'ش', 'غ', 'ع', 'ئ', 'ء', 'ز', 'ذ', '،', '؟'],
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
        ['(', ')', '[', ']', '<', '>', '~', '\`', '^', '؛', '۔'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: 'ابپ', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
