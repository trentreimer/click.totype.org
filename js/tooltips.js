const viewportMargin = 8;

const measurer = document.createElement('div');
measurer.setAttribute('aria-hidden', 'true');
measurer.style.cssText = 'position:absolute;top:0;inset-inline-start:0;visibility:hidden;pointer-events:none;white-space:nowrap;line-height:1.2;';

function setShift(button, shift) {
    if (shift) {
        button.style.setProperty('--tooltip-shift', `${shift}px`);
    } else {
        button.style.removeProperty('--tooltip-shift');
    }
}

function applyShift(button) {
    const style = getComputedStyle(button);

    measurer.style.fontFamily = style.fontFamily;
    measurer.style.fontWeight = style.fontWeight;
    measurer.style.fontStyle = style.fontStyle;
    measurer.style.letterSpacing = style.letterSpacing;
    measurer.style.textTransform = 'capitalize';
    measurer.style.fontSize = `${parseFloat(style.fontSize) * 0.75}px`;
    measurer.style.padding = '0.25em 0.6em';
    measurer.textContent = button.getAttribute('data-tooltip');
    document.body.append(measurer);

    const tooltipWidth = measurer.offsetWidth;
    measurer.remove();

    const buttonRect = button.getBoundingClientRect();
    const centeredStart = buttonRect.left + buttonRect.width / 2 - tooltipWidth / 2;
    const shift = Math.min(
        0,
        Math.max(
            viewportMargin - centeredStart,
            Math.min(0, document.documentElement.clientWidth - viewportMargin - (centeredStart + tooltipWidth)),
        ),
    );

    setShift(button, shift);
}

function clearShift(event) {
    const button = event.target.closest('#toolbar button[data-tooltip]');
    if (button) setShift(button, 0);
}

export function initTooltips() {
    if (CSS.supports('anchor-name: --tooltip')) return;

    const toolbars = document.querySelector('#toolbars');
    if (!toolbars) return;

    toolbars.addEventListener('pointerover', event => {
        const button = event.target.closest('#toolbar button[data-tooltip]');
        if (button) applyShift(button);
    }, true);

    toolbars.addEventListener('focusin', event => {
        const button = event.target.closest('#toolbar button[data-tooltip]');
        if (button) applyShift(button);
    }, true);

    toolbars.addEventListener('pointerout', clearShift, true);
    toolbars.addEventListener('focusout', clearShift, true);
}
