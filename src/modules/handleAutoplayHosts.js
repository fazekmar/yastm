import handleClick from './handleclick';
import extractConsentURL from './extractConsentURL';

let lastUrl = '';
const urlHistory = new Map();

const handleAutoplayHosts = (tabId, { url }) => {
    if (url) {
        browser.storage.local.get({
            autoPlay: false, autoplayHosts: [],
        }).then(({ autoPlay, autoplayHosts }) => {
            if (autoPlay
                && lastUrl !== url
                && ![...urlHistory].some((e) => e[1].some((u) => u === url))
                && autoplayHosts.some((host) => host.test(url))
            ) {
                const newURL = extractConsentURL(url);
                handleClick({ url: newURL });

                lastUrl = url;
                addtoHist(tabId, url);
                addtoHist(tabId, newURL);
            }
        });
    }
};

const handleTabClose = (tabId) => {
    urlHistory.delete(tabId);
};

const addtoHist = (id, url) => {
    if (!(urlHistory.has(id) && urlHistory.get(id).some((u) => u === url))) {
        urlHistory.set(id, urlHistory.has(id) ? [url, ...urlHistory.get(id)] : [url]);
    }
};

export { handleAutoplayHosts, handleTabClose };
