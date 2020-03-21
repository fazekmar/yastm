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
};
