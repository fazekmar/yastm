import createContextMenus from './modules/createcontextmenus';
import createListeners from './modules/createlisteners';
import updateActions from './modules/updateactions';
import preferences from './options/preferences';

// Migrate settings to the new structure
browser.storage.local.get().then((prefs) => {
    // Init default setting in the first run
    if (Object.keys(prefs).length === 0) {
        preferences.player = 'mpv';
        browser.storage.local.set(preferences);
        init();
        return;
    }

    if (prefs.playerProperties) {
        init();
        return;
    }

    const playerProperties = {
        mpv: {
            settings: {
                profile: '',
                xClass: '',
                pseudo: false,
                pause: false,
                commandline: '',
            },
        },
    };
    Object.keys(prefs).forEach((key) => {
        let value = prefs[key];
        if (key === 'logging') {
            browser.storage.local.remove(key);
            return;
        }
        if (key === 'autoplayHosts' && value.constructor !== Array) {
            const newAutoplayHostList = [];
            value.split('`').forEach((host) => {
                if (host !== '') {
                    try {
                        RegExp(host);
                    } catch (e) {
                        return;
                    }
                    newAutoplayHostList.push(RegExp(host));
                }
            });
            browser.storage.local.set({ autoplayHosts: newAutoplayHostList });
            value = newAutoplayHostList;
        }
        if (key === 'mpvProfile') {
            playerProperties.mpv.settings.profile = value;
            browser.storage.local.remove('mpvProfile');
        }
        if (key === 'mpvXClass') {
            playerProperties.mpv.settings.xClass = value;
            browser.storage.local.remove('mpvXClass');
        }
        if (key === 'pseudo') {
            playerProperties.mpv.settings.pseudo = value;
            browser.storage.local.remove('pseudo');
        }
        if (key === 'pause') {
            playerProperties.mpv.settings.pause = value;
            browser.storage.local.remove('pause');
        }
        browser.storage.local.set({ player: 'mpv', playerProperties });
        init();
    });
});

const init = () => {
    createContextMenus();
    createListeners();

    browser.storage.local.get().then((prefs) => {
        updateActions(prefs);
    });
};