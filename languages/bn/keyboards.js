// Bengali. The app's letter rows follow InScript ordering, so the Shift layer
// follows the InScript shift level: aspirated consonants (ক→খ, গ→ঘ, …), ঙ/ঞ, and
// the independent vowels. InScript keeps ূ and ৃ UNSHIFTED on their own keys, so
// they are declared here as direct keys on Keyboard 3 rather than as Shift levels
// of ু / র (verified against Windows kbdinben / kbdinbe2).
const group = (base, shifted) => ({ text: base, key: base, shiftText: shifted, shiftKey: shifted });

const keyboards = {
    '1': [
        [group('া', 'আ'), group('ি', 'ই'), group('ে', 'এ'), group('ী', 'ঈ'), 'ু', 'র', group('ক', 'খ'), group('ত', 'থ'), group('ব', 'ভ'), group('ম', 'ণ'), 'ন'],
        [group('ো', 'ও'), group('ৌ', 'ঔ'), group('ৈ', 'ঐ'), group('্', 'অ'), group('ং', 'ঁ'), group('দ', 'ধ'), group('স', 'শ'), group('প', 'ফ'), 'য', 'ল', group('গ', 'ঘ')],
        [group('হ', 'ঙ'), group('জ', 'ঝ'), group('চ', 'ছ'), group('ট', 'ঠ'), group('ড', 'ঢ'), group('শ', 'ষ'), 'খ', 'ছ', '।', ',', '.'],
        [
            { text: '←', key: 'Backspace', width: '12.5%' },
            { text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '12.5%' },
            { text: 'Space', key: ' ', width: '37.5%' },
            { text: 'অ123', key: 'Keyboard 2', width: '12.5%' },
            { text: 'ঘঝঞ', key: 'Keyboard 3', width: '12.5%' },
            { text: '↲', key: 'Enter', width: '12.5%' },
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', '/', '_', '-', '+', '$', '%', '&', '*'],
        ['(', ')', '[', ']', '<', '>', '~', '`', '^', '?', '!'],
        [
            { text: '←', key: 'Backspace', width: '12.5%' },
            { text: 'Space', key: ' ', width: '42.5%' },
            { text: 'কখগ', key: 'Keyboard 1', width: '15%' },
            { text: 'ঘঝঞ', key: 'Keyboard 3', width: '15%' },
            { text: '↲', key: 'Enter', width: '15%' },
        ],
    ],
    '3': [
        ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'],
        ['ঘ', 'ঙ', 'ঝ', 'ঞ', 'ঠ', 'ণ', 'থ', 'ধ', 'ফ', 'ভ', 'ষ', 'ৎ'],
        ['ঁ', 'ঃ', '়', 'ঽ', '॥', 'ূ', 'ৃ', 'য়', '৳', '০', '১', '২'],
        ['৩', '৪', '৫', '৬', '৭', '৮', '৯'],
        [
            { text: '←', key: 'Backspace', width: '12.5%' },
            { text: 'Space', key: ' ', width: '42.5%' },
            { text: 'কখগ', key: 'Keyboard 1', width: '15%' },
            { text: 'অ123', key: 'Keyboard 2', width: '15%' },
            { text: '↲', key: 'Enter', width: '15%' },
        ],
    ],
};

export default keyboards;
