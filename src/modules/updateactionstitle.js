const setContextMenuTitle = (title) => {
    browser.contextMenus.update(
        'YASTM',
        { title: `Play URL in &${title}` },
    );
};

export default (fullTitle) => {
    const title = fullTitle.split(' (')[0];
    setContextMenuTitle(title);
};