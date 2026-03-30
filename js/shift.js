export function setKeyboard(keyboard = '1') {
    if (typeof settings.keyboards[keyboard] !== 'undefined') {
        settings.activeKeyboard = keyboard;

        document.querySelector('#keyboard').classList.remove('shift');
        document.querySelectorAll('#keyboard > div').forEach(e => e.remove());

        const buttons = settings.keyboards[keyboard];

        for (const row of buttons) {
            const div = document.createElement('div');
            const buttonWidth = Math.floor(100 / row.length);

            for (const b of row) {
                const button = document.createElement('button');

                if (typeof b === 'string') {
                    button.textContent = b;
                    button.setAttribute('data-text', b);
                    button.setAttribute('data-key', b);

                    if (b.match(/[a-z]/)) {
                        button.setAttribute('data-shift-text', b.toUpperCase());
                        button.setAttribute('data-shift-key', b.toUpperCase());
                    }
                } else if (typeof b.text === 'string' && typeof b.key === 'string') {
                    button.textContent = b.text;
                    button.setAttribute('data-text', b.text);
                    button.setAttribute('data-key', b.key);

                    if (typeof b.shiftText === 'string' && typeof b.shiftKey === 'string') {
                        button.setAttribute('data-shift-text', b.shiftText);
                        button.setAttribute('data-shift-key', b.shiftKey);
                    }
                }

                button.style.width = typeof b.width === 'string' ? b.width : `${buttonWidth}%`;
                div.appendChild(button);
            }

            document.querySelector('#keyboard').appendChild(div);
        }
    }
}

export function applyShift() {
    document.querySelector('#keyboard').classList.add('shift');

    document.querySelectorAll('#keyboard button[data-shift-text]').forEach(button => {
        button.textContent = button.getAttribute('data-shift-text');
    });
}

export function removeShift() {
    document.querySelector('#keyboard').classList.remove('shift');

    document.querySelectorAll('#keyboard button[data-shift-text][data-text]').forEach(button => {
        button.textContent = button.getAttribute('data-text');
    });
}

export function toggleShift() {
    if (document.querySelector('#keyboard').classList.contains('shift')) {
        removeShift();
    } else {
        applyShift();
    }
}
