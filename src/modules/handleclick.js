import assembleMessage from './assemblemessage';
import sendToNative from './sendtonative';
import extractConsentURL from './extractConsentURL';
import { logInfo } from './logger';

export default ({ id, url }) => {
    logInfo(`handleClick: url: ${url}`);

    browser.storage.local.get({
        player: 'mpv',
        misc: { autoPause: false },
        playerProperties: { mpv: { cmd: 'mpv', settings: {} } },
    }).then((prefs) => {
        const newURL = extractConsentURL(url);

        const msg = assembleMessage({ url: newURL, prefs });
        sendToNative(msg);
        if (prefs.misc.autoPause && id) {
            browser.tabs.executeScript(
                id,
                { code: '[...document.getElementsByTagName("video")].forEach((video) => { video.pause(); });' },
            );
        }
    });
};