import savePreferencesSendStatus from './modules/savestatus';

const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        restorePreferences();
        document.getElementById('save').addEventListener('click', savePreferences);
    });
};

const savePreferences = () => {
    try {
        const mpvProfile = document.getElementById('mpvProfile').value;
        const mpvXClass = document.getElementById('mpvXClass').value;
        const logging = document.getElementById('logging').checked;
        const pseudo = document.getElementById('pseudo').checked;
        const pause = document.getElementById('pause').checked;
        const autoplayHosts = document.getElementById('autoplayHosts').value;
        browser.storage.local.set({
            mpvProfile, mpvXClass, logging, pseudo, pause, autoplayHosts,
        }).then(() => {
            savePreferencesSendStatus(true);
        });
    } catch (e) {
        savePreferencesSendStatus(false, e);
    }
};

const restorePreferences = () => {
    browser.storage.local.get({
        mpvProfile: '',
        mpvXClass: '',
        logging: false,
        pseudo: false,
        pause: false,
        autoplayHosts: '',
    }).then(({
        mpvProfile, mpvXClass, logging, pseudo, pause, autoplayHosts,
    }) => {
        document.getElementById('mpvProfile').value = mpvProfile;
        document.getElementById('mpvXClass').value = mpvXClass;
        document.getElementById('logging').checked = logging;
        document.getElementById('pseudo').checked = pseudo;
        document.getElementById('pause').checked = pause;
        document.getElementById('autoplayHosts').value = autoplayHosts;
    });
};

init();
