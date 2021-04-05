import handleClick from './handleclick';
import { handleAutoplayHosts, handleTabClose } from './handleAutoplayHosts';
import updateActions from './updateactions';

export default () => {
    browser.contextMenus.onClicked.addListener((info) => {
        switch (info.menuItemId) {
            case 'yastm-contextMenu':
                handleContextMenu(info);
                break;
            case 'yastm-bookmarkMenu':
                handleBookmarkMenu(info);
                break;
            case 'yastm-pageAction-mpv':
            case 'yastm-pageAction-celluloid':
            case 'yastm-pageAction-youtubedl':
                handlePageActionMenu(info);
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

    const handlePageActionMenu = (info) => {
        const player = info.menuItemId.split('-')[2];
        browser.storage.local.set({ player }).then(() => browser.storage.local.get().then((prefs) => {
            updateActions(prefs);
        }));
    };

    browser.pageAction.onClicked.addListener((tab) => {
        handleClick(tab);
    });

    browser.tabs.onUpdated.addListener(handleAutoplayHosts);
    browser.tabs.onRemoved.addListener(handleTabClose);
};
