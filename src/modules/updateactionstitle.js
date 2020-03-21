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

export default (fullTitle) => {
    const title = fullTitle.split(' (')[0];
    setContextMenuTitle(title);
};