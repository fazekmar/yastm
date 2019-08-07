import { logWarning } from './logger';
import handleClick from './handleclick';

let lastUrl = '';

export default (tabId, changeInfo) => {
    if (changeInfo.url) {
        browser.storage.local.get({
            autoplayHosts: '',
        }).then(({ autoplayHosts }) => {
            autoplayHosts.split('`').forEach((host) => {
                if (host === '') { // TODO: validate host
                    logWarning(`Not valid host: ${host}`);
                    return;
                }

                let regHost;
                let regIsValid = true;
                try {
                    regHost = new RegExp(host);
                } catch (e) {
                    regIsValid = false;
                }

                if (regIsValid) {
                    if (regHost.test(changeInfo.url) && lastUrl !== changeInfo.url) {
                        handleClick(changeInfo.url);
                        lastUrl = changeInfo.url;
                    }
                } else if (changeInfo.url.indexOf(host) !== -1 && lastUrl !== changeInfo.url) {
                    handleClick(changeInfo.url);
                    lastUrl = changeInfo.url;
                }
            });
        });
    }
};
