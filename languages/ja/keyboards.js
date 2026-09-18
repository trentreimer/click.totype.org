const group = (first, rest) => ({ text: first, key: first, group: rest });

const hiraganaGroups = [
    ['あ', ['い', 'う', 'え', 'お']],
    ['か', ['き', 'く', 'け', 'こ']],
    ['さ', ['し', 'す', 'せ', 'そ']],
    ['た', ['ち', 'つ', 'て', 'と']],
    ['な', ['に', 'ぬ', 'ね', 'の']],
    ['は', ['ひ', 'ふ', 'へ', 'ほ']],
    ['ま', ['み', 'む', 'め', 'も']],
    ['や', ['ゆ', 'よ']],
    ['ら', ['り', 'る', 'れ', 'ろ']],
    ['わ', ['を']],
];

const toKatakana = text => text.replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));

const katakanaGroups = hiraganaGroups.map(([first, rest]) => [toKatakana(first), rest.map(toKatakana)]);

function kanaKeyboard(groups, row3Kana, smallGroup, toggle) {
    return [
        groups.slice(0, 5).map(([first, rest]) => group(first, rest)),
        groups.slice(5).map(([first, rest]) => group(first, rest)),
        [row3Kana, '、', '。', 'ー', { text: '小゛゜', group: smallGroup }],
        [
            { text: '123', key: 'Keyboard 3', width: '15%' },
            { text: '←', key: 'Backspace', width: '15%' },
            { text: 'Space', key: ' ', width: '40%' },
            { ...toggle, width: '15%' },
            { text: '↲', key: 'Enter', width: '15%' },
        ],
    ];
}

const keyboards = {
    '1': kanaKeyboard(hiraganaGroups, 'ん', ['っ', 'ゃ', 'ゅ', 'ょ', '゛', '゜'], { text: 'カタカナ', key: 'Keyboard 2' }),
    '2': kanaKeyboard(katakanaGroups, 'ン', ['ッ', 'ャ', 'ュ', 'ョ', '゛', '゜'], { text: 'ひらがな', key: 'Keyboard 1' }),
    '3': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '「', '」', '〜', '・', '？', '！'],
        [
            { text: '←', key: 'Backspace', width: '12.5%' },
            { text: 'Space', key: ' ', width: '50%' },
            { text: 'あ', key: 'Keyboard 1', width: '25%' },
            { text: '↲', key: 'Enter', width: '12.5%' },
        ],
    ],
};

export default keyboards;
