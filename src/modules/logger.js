const isLogging = false;

const logInfo = (msg) => {
    if (isLogging) {
        // eslint-disable-next-line no-console
        console.log(`===> Info: ${msg}`);
    }
};

const logError = (msg) => {
    if (isLogging) {
        // eslint-disable-next-line no-console
        console.log(`===> Error: ${msg}`);
    }
};

export { logInfo, logError };
