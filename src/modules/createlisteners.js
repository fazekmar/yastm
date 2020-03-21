import handleClick from './handleclick';
import handleAutoplayHosts from './handleAutoplayHosts';

export default () => {
    browser.contextMenus.onClicked.addListener((info) => {
        switch (info.menuItemId) {
            case 'yastm-contextMenu':
                handleContextMenu(info);
                break;
            case 'yastm-bookmarkMenu':
                handleBookmarkMenu(info);
                break;
            default:
        }
    });

    const handleContextMenu = (info) => {
        const url = info.srcUrl || info.linkUrl || info.frameURL || info.selectionText;
        if (url) {
            handleClick({ url });
        }
    };

    const handleBookmarkMenu = (info) => {
        if (info.bookmarkId) {
            browser.bookmarks.get(info.bookmarkId).then((bookmarks) => {
                bookmarks.forEach((bookmark) => {
                    if (bookmark.type === 'bookmark') {
                        handleClick({ url: bookmark.url });
                    }
                });
            });
        }
    };

    browser.pageAction.onClicked.addListener((tab) => {
        handleClick(tab);
    });

    browser.tabs.onUpdated.addListener(handleAutoplayHosts);
};
