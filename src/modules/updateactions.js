const setContextMenuTitle = (title) => {
    browser.contextMenus.update(
        'yastm-contextMenu',
        { title: `Play URL in &${title}` },
    );
    browser.contextMenus.update(
        'yastm-bookmarkMenu',
        { title: `Play Bookmark in &${title}` },
    );
};

export default ({ player: defaultPlayer, playerProperties }) => {
    const title = playerProperties[defaultPlayer].name.split(' (')[0];
    setContextMenuTitle(title);

    Object.keys(playerProperties).forEach((player) => {
        browser.contextMenus.update(
            `yastm-pageAction-${player}`,
            {
                checked: player === defaultPlayer,
                visible: player === defaultPlayer || playerProperties[player].settings.enabled,
                enabled: playerProperties[player].settings.enabled,
            },
        );
    });
};