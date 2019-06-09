import { logInfo, logError } from './logger';

export default (msg) => {
    logInfo(`sendToNative: ${JSON.stringify(msg, null, 4)}}`);

    const send = browser.runtime.sendNativeMessage('yastm', msg);

    send.then(onResp, onError);
};

const onResp = (response) => {
    logInfo(`Received: ${JSON.stringify(response, null, 4)}`);
};

const onError = (error) => {
    logError(error);
};
