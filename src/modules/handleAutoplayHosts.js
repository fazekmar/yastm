import handleClick from './handleclick';

let lastUrl = '';

export default (tabId, { url }) => {
    if (url) {
        browser.storage.local.get({
            autoplayHosts: [],
        }).then(({ autoplayHosts }) => {
            if (lastUrl !== url && autoplayHosts.some((host) => host.test(url))) {
                handleClick(url);
                lastUrl = url;
            }
        });
    }
};
