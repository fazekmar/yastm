export default () => {
    browser.contextMenus.create({
        id: 'YASTM',
        title: 'Play URL in &MPV',
        contexts: ['audio', 'frame', 'image', 'link', 'selection', 'video'],
    });
};
