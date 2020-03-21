import handleClick from './handleclick';

let lastUrl = '';

export default (tabId, { url }) => {
    if (url) {
        browser.storage.local.get({
            autoPlay: false, autoplayHosts: [],
        }).then(({ autoPlay, autoplayHosts }) => {
            if (autoPlay && lastUrl !== url && autoplayHosts.some((host) => host.test(url))) {
                handleClick({ url });
                lastUrl = url;
            }
        });
    }
};
