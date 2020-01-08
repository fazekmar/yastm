const preferences = {
    mpvProfile: '',
    mpvXClass: '',
    pseudo: false,
    pause: false,
    autoplayHosts: '',
};

const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        restorePreferences();
        addEventListeners();
    });
};

const savePreference = (key, type) => (event) => {
    if (type === 'checkbox') {
        preferences[key] = event.target.checked;
    } else {
        preferences[key] = event.target.value;
    }

    browser.storage.local.set(preferences);
};

const addEventListeners = () => {
    Object.keys(preferences).forEach((key) => {
        const element = document.getElementById(key);
        element.addEventListener('change', savePreference(key, element.type));
    });
};

const restorePreferences = () => {
    browser.storage.local.get().then((prefs) => {
        Object.keys(prefs).forEach((key) => {
            const value = prefs[key];
            // TODO: Remove this in a future release
            // Remove unnecessary object from storage
            if (key === 'logging') {
                browser.storage.local.remove(key);
                return;
            }
            const element = document.getElementById(key);
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
            preferences[key] = value;
        });
    });
};

init();
