const keyboards = {
    '1': [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {text: '←', key: 'Backspace'}],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', '，', '。', '？', '！'],
        [
            {text: '空格', key: ' ', width: '50%'},
            {text: '123#@', key: 'Keyboard 2', width: '15%'},
            {text: '九宫格', key: 'Keyboard 3', width: '20%'},
            {text: '↲', key: 'Enter', width: '15%'},
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '「', '」', '《', '》', '、', '；', '：'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: '空格', key: ' ', width: '40%'},
            {text: '拼音', key: 'Keyboard 1', width: '17.5%'},
            {text: '九宫格', key: 'Keyboard 3', width: '20%'},
            {text: '↲', key: 'Enter', width: '10%'},
        ],
    ],
    '3': [
        [
            {text: '1 。', key: '。', group: ['？', '！', '、']},
            {text: '2 abc', key: '2', t9: true},
            {text: '3 def', key: '3', t9: true},
        ],
        [
            {text: '4 ghi', key: '4', t9: true},
            {text: '5 jkl', key: '5', t9: true},
            {text: '6 mno', key: '6', t9: true},
        ],
        [
            {text: '7 pqrs', key: '7', t9: true},
            {text: '8 tuv', key: '8', t9: true},
            {text: '9 wxyz', key: '9', t9: true},
        ],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: '空格', key: ' ', width: '42.5%'},
            {text: '拼音', key: 'Keyboard 1', width: '20%'},
            {text: '123#@', key: 'Keyboard 2', width: '15%'},
            {text: '↲', key: 'Enter', width: '10%'},
        ],
    ],
};

export default keyboards;
