export default () => {
    browser.contextMenus.create({
        id: 'yastm-bookmarkMenu',
        title: 'Play Bookmark in &MPV',
        contexts: ['bookmark'],
    });
    browser.contextMenus.create({
        id: 'yastm-contextMenu',
        title: 'Play URL in &MPV',
        contexts: ['audio', 'frame', 'image', 'link', 'selection', 'video'],
    });
    createActionMenu();
};

const createActionMenu = () => browser.storage.local.get().then(({ player: defaultPlayer, playerProperties }) => {
    Object.keys(playerProperties).forEach((player) => {
        browser.contextMenus.create({
            id: `yastm-pageAction-${player}`,
            title: playerProperties[player].name.split(' (')[0],
            type: 'radio',
            checked: player === defaultPlayer,
            visible: player === defaultPlayer || playerProperties[player].settings.enabled,
            enabled: playerProperties[player].settings.enabled,
            contexts: ['page_action'],
        });
    });
});