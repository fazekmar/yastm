const isLogging = false;

const logInfo = (msg) => {
    if (isLogging) {
        // eslint-disable-next-line no-console
        console.log(`=== YASTM ===> Info: ${msg}`);
    }
};

const logWarning = (msg) => {
    if (isLogging) {
        // eslint-disable-next-line no-console
        console.log(`=== YASTM ===> Warning: ${msg}`);
    }
};

const logError = (msg) => {
    if (isLogging) {
        // eslint-disable-next-line no-console
        console.log(`=== YASTM ===> Error: ${msg}`);
    }
};

export { logInfo, logWarning, logError };
