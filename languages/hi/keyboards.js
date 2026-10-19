// InScript (IS 16350) ordering. The Shift layer is the InScript Shift level:
// aspirated consonants (क→ख, ग→घ, …), the nasal/retroflex set, and the
// independent vowels — verified against the Windows Devanagari-INSCRIPT table.
const group = (base, shifted) => ({ text: base, key: base, shiftText: shifted, shiftKey: shifted });

const keyboards = {
    '1': [
        [group('ौ', 'औ'), group('ै', 'ऐ'), group('ा', 'आ'), group('ी', 'ई'), group('ू', 'ऊ'), group('ब', 'भ'), group('ह', 'ङ'), group('ग', 'घ'), group('द', 'ध'), group('ज', 'झ'), group('ड', 'ढ')],
        [group('ो', 'ओ'), group('े', 'ए'), group('्', 'अ'), group('ि', 'इ'), group('ु', 'उ'), group('प', 'फ'), 'र', group('क', 'ख'), group('त', 'थ'), group('च', 'छ'), group('ट', 'ठ')],
        [group('ॉ', 'ऑ'), group('ं', 'ँ'), group('म', 'ण'), 'न', 'व', 'ल', group('स', 'श'), 'य', '।', group(',', 'ष'), '.'],
        [
            { text: '←', key: 'Backspace', width: '12.5%' },
            { text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '12.5%' },
            { text: 'Space', key: ' ', width: '50%' },
            { text: 'अ123', key: 'Keyboard 2', width: '12.5%' },
            { text: '↲', key: 'Enter', width: '12.5%' },
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
        ['(', ')', '[', ']', '़', 'ऽ', '॥', '-', '+'],
        ['ृ', 'ऋ', 'ॅ', 'ॆ', 'ॊ', 'ः', 'ञ', 'ऌ', 'ॐ'],
        ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
        [
            { text: '←', key: 'Backspace', width: '12.5%' },
            { text: 'Space', key: ' ', width: '50%' },
            { text: 'कखग', key: 'Keyboard 1', width: '25%' },
            { text: '↲', key: 'Enter', width: '12.5%' },
        ],
    ],
};

export default keyboards;
