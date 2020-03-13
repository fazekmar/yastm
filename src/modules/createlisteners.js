import handleClick from './handleclick';
import handleAutoplayHosts from './handleAutoplayHosts';

export default () => {
    browser.contextMenus.onClicked.addListener((info) => {
        const url = info.srcUrl || info.linkUrl || info.frameURL || info.selectionText;
        switch (info.menuItemId) {
            case 'YASTM':
                if (url) {
                    handleClick({ url });
                }
                break;
            default:
        }
    });

    browser.pageAction.onClicked.addListener((tab) => {
        handleClick(tab);
    });

    browser.tabs.onUpdated.addListener(handleAutoplayHosts);
};
