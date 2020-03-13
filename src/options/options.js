import updateActionsTitle from '../modules/updateactionstitle';
import preferences from './preferences';

const restorePreferences = ({ player, autoplayHosts, playerProperties }) => {
    preferences.player = player || 'mpv';
    preferences.autoplayHosts = autoplayHosts || [];
    if (playerProperties) {
        Object.entries(playerProperties).forEach(([playerName, commonSettings]) => {
            Object.assign(preferences.playerProperties[playerName].settings, commonSettings.settings);
        });
    }
};

const savePreferencesToStorage = () => browser.storage.local.set(preferences);

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

// Player settings
const renderPlayerSettings = () => {
    Object.entries(preferences.playerProperties).forEach(([player, commonSettings]) => {
        Object.entries(commonSettings.settings).forEach(([id, value]) => {
            const element = document.getElementById(`${player}-${id}`);
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
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
const renderAutoplayHostList = () => {
    const containerElement = document.getElementById('autoplayHosts');
    if (preferences.autoplayHosts.length > 0) {
        preferences.autoplayHosts.forEach((hostReg) => containerElement.appendChild(createElementDiv(hostReg.source)));
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

const addToAutoplayHosts = () => {
    const element = document.getElementById('autoplayHostsAddForm');
    const host = element.value;

    if (host) {
        element.value = '';
        try {
            RegExp(host);
        } catch (e) {
            return;
        }
        if (preferences.autoplayHosts.some((hostReg) => hostReg.source === host)) {
            return;
        }
        preferences.autoplayHosts.push(RegExp(host));
        savePreferencesToStorage();
        document.getElementById('autoplayHosts').appendChild(createElementDiv(host));
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
        renderAutoplayHostList();
        createAddToAutoplayHostList();
    });
});