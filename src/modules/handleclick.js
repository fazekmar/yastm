import assembleMessage from './assemblemessage';
import sendToNative from './sendtonative';
import { logInfo } from './logger';

export default (url) => {
    logInfo(`handleClick: url: ${url}`);

    browser.storage.local.get({
        mpvProfile: '',
        mpvXClass: '',
        pseudo: false,
        pause: false,
    }).then((prefs) => {
        const msg = assembleMessage({ url, ...prefs });
        sendToNative(msg);
    });
};
