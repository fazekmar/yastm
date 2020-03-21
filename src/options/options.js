import updateActionsTitle from '../modules/updateactionstitle';
import preferences from './preferences';

const restorePreferences = ({
    player, autoPlay, autoplayHosts, misc, playerProperties,
}) => {
    preferences.player = player || 'mpv';
    preferences.autoPlay = autoPlay || false;
    preferences.autoplayHosts = autoplayHosts || [];
    if (misc) {
        Object.entries(misc).forEach(([id, value]) => {
            preferences.misc[id] = value;
        });
    }
    if (playerProperties) {
        Object.entries(playerProperties).forEach(([playerName, commonSettings]) => {
            Object.assign(preferences.playerProperties[playerName].settings, commonSettings.settings);
        });
    }
};

const savePreferencesToStorage = () => browser.storage.local.set(preferences);

const setSettingValue = (element, value) => {
    if (element.type === 'checkbox') {
        element.checked = value;
    } else {
        element.value = value;
    }
};

// Player selector
const renderPlayerSelector = () => {
    const selector = document.getElementById('player-selector');
    Object.keys(preferences.playerProperties).forEach((player) => {
        const option = document.createElement('option');
        option.text = preferences.playerProperties[player].name;
        selector.add(option);
    });
    selector.onchange = () => toggleSettings();

    if (preferences.player) {
        const actualPlayer = preferences.playerProperties[preferences.player].name;
        try {
            const { index } = Array.from(selector.options).find((el) => el.textContent === actualPlayer);
            if (index) {
                selector.selectedIndex = index;
            }
        } catch (e) {
            selector.selectedIndex = -1;
        }
        const div = document.getElementById(`${preferences.player}-settings`);
        div.style.display = '';
    } else {
        selector.selectedIndex = -1;
    }
};

const toggleSettings = () => {
    const selector = document.getElementById('player-selector');
    const index = selector.selectedIndex;

    Object.entries(preferences.playerProperties).forEach(([player, commonSettings]) => {
        const div = document.getElementById(`${player}-settings`);
        if (commonSettings.name === selector.options[index].innerText) {
            div.style.display = '';
            preferences.player = player;
            updateActionsTitle(commonSettings.name);
            savePreferencesToStorage();
        } else {
            div.style.display = 'none';
        }
    });
};

// Misc settings
const renderMiscSettings = () => {
    Object.entries(preferences.misc).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            setSettingValue(element, value);
            element.addEventListener('change', saveMiscSetting(id, element.type));
        }
    });
};

const saveMiscSetting = (key, type) => (event) => {
    let saveValue = type === 'checkbox' ? event.target.checked : event.target.value;
    switch (key) {
        case 'bookmarks':
            if (saveValue) {
                browser.permissions.request({ permissions: ['bookmarks'] }).then((enabled) => {
                    if (!enabled) {
                        saveValue = false;
                        event.target.checked = false;
                    }
                    preferences.misc[key] = saveValue;
                    savePreferencesToStorage();
                });
            } else {
                browser.permissions.remove({ permissions: ['bookmarks'] }).then(() => {
                    preferences.misc[key] = saveValue;
                    savePreferencesToStorage();
                });
            }
            break;
        default:
            preferences.misc[key] = saveValue;
            savePreferencesToStorage();
    }
};

// Player settings
const renderPlayerSettings = () => {
    Object.entries(preferences.playerProperties).forEach(([player, commonSettings]) => {
        Object.entries(commonSettings.settings).forEach(([id, value]) => {
            const element = document.getElementById(`${player}-${id}`);
            setSettingValue(element, value);
        });
    });
};

const addPlayerSettingEventListeners = () => {
    Object.entries(preferences.playerProperties).forEach((player) => {
        Object.keys(player[1].settings).forEach((key) => {
            const id = `${player[0]}-${key}`;
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', savePlayerSetting(player[0], key, element.type));
            }
        });
    });
};

const savePlayerSetting = (player, key, type) => (event) => {
    if (type === 'checkbox') {
        preferences.playerProperties[player].settings[key] = event.target.checked;
    } else {
        preferences.playerProperties[player].settings[key] = event.target.value;
    }

    savePreferencesToStorage();
};

// Autoplay options
const setAutoPlay = () => (event) => {
    if (event.target.checked) {
        browser.permissions.request({ permissions: ['tabs'] }).then((enabled) => {
            if (enabled) {
                preferences.autoPlay = true;
                savePreferencesToStorage();
                document.getElementById('autoplayHostList-div').style.display = '';
            } else {
                document.getElementById('autoPlay').checked = false;
            }
        });
    } else {
        browser.permissions.remove({ permissions: ['tabs'] }).then(() => {
            preferences.autoPlay = false;
            savePreferencesToStorage();
            document.getElementById('autoplayHostList-div').style.display = 'none';
        });
    }
};

const createAddToAutoplayHostList = () => {
    const element = document.getElementById('autoplayHostsAdd');

    element.appendChild(createButton('Add', () => addToAutoplayHosts()));

    const input = document.createElement('input');
    input.id = 'autoplayHostsAddForm';
    input.placeholder = 'youtube.com';
    element.appendChild(input);
};

const renderAutoplayHostList = () => {
    const element = document.getElementById('autoPlay');
    if (element) {
        setSettingValue(element, preferences.autoPlay);
        element.addEventListener('change', setAutoPlay());
    }
    document.getElementById('autoplayHostList-div').style.display = preferences.autoPlay ? '' : 'none';
    const containerElement = document.getElementById('autoplayHosts');
    if (preferences.autoplayHosts.length > 0) {
        preferences.autoplayHosts.forEach((hostReg) => containerElement.appendChild(createElementDiv(hostReg.source)));
    }

    createAddToAutoplayHostList();
};

const addToAutoplayHosts = () => {
    const element = document.getElementById('autoplayHostsAddForm');
    const host = element.value;
    let regHost;

    if (host) {
        element.value = '';
        try {
            regHost = RegExp(host);
        } catch (e) {
            return;
        }
        if (preferences.autoplayHosts.some((hostReg) => hostReg.source === host)) {
            return;
        }
        preferences.autoplayHosts.push(regHost);
        savePreferencesToStorage();
        document.getElementById('autoplayHosts').appendChild(createElementDiv(regHost.source));
    }
};

const createElementDiv = (id) => {
    const div = document.createElement('div');
    div.id = id;
    div.appendChild(createButton('Remove', () => removeHostnameFromList(id)));
    div.appendChild(document.createTextNode(id));
    return div;
};

const createButton = (innerText, onClickFunction) => {
    const button = document.createElement('button');
    button.innerText = innerText;
    button.onclick = onClickFunction;
    return button;
};

const removeHostnameFromList = (id) => {
    preferences.autoplayHosts = preferences.autoplayHosts.filter((itemReg) => itemReg.source !== id);
    savePreferencesToStorage();
    document.getElementById(id).remove();
};

document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get().then((prefs) => {
        restorePreferences(prefs);
        renderPlayerSelector();
        renderPlayerSettings();
        addPlayerSettingEventListeners();
        renderMiscSettings();
        renderAutoplayHostList();
    });
});