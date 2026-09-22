const keyboards = {
    '1': [
        [';', 'ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
        ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
        ['ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ', ',', '.', '!', '?'],
        [
            {text: '←', key: 'Backspace', width: '15%'},
            {text: 'Shift ↑', key: 'Shift', shiftText: 'Shift ↓', shiftKey: 'Shift', width: '15%'},
            {text: 'Space', key: ' ', width: '45%'},
            {text: '123#@', key: 'Keyboard 2', width: '15%'},
            {text: '↲', key:  'Enter', width: '10%'}
        ],
    ],
    '2': [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['@', '#', ':', ';', '/', '_', '-', '+', '€', '%', '*'],
        ['(', ')', '[', ']', '<', '>', '«', '»', '·', '—'],
        [
            {text: '←', key: 'Backspace', width: '12.5%'},
            {text: 'Space', key: ' ', width: '50%'},
            {text: 'ΑΒΓ', key: 'Keyboard 1', width: '25%'},
            {text: '↲', key:  'Enter', width: '12.5%'}
        ],
    ],
};

export default keyboards;
