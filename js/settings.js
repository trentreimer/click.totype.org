export const settings = {};

export const storagePrefix = 'click.totype.org';

export function storageKey(name) {
    return `${storagePrefix}:${name}`;
}

const behaviorStorageKeys = {
    autoSpace: storageKey('behavior.autoSpace'),
    autoUppercase: storageKey('behavior.autoUppercase'),
};

export function behaviorOverride(name) {
    const stored = localStorage.getItem(behaviorStorageKeys[name]);

    if (stored === 'on') return true;
    if (stored === 'off') return false;

    return null;
}

export function setBehaviorOverride(name, value) {
    localStorage.setItem(behaviorStorageKeys[name], value ? 'on' : 'off');
}

export function effectiveBehavior(name) {
    const override = behaviorOverride(name);

    if (override !== null) return override;

    if (settings.punctuation && typeof settings.punctuation[name] === 'boolean') {
        return settings.punctuation[name];
    }

    return true;
}