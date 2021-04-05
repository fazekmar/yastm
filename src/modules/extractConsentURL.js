export default (url) => {
    let newURL = url;
    if (newURL.indexOf('consent.youtube.com') !== -1) {
        const addr = new URL(newURL);
        const urlParams = new URLSearchParams(addr.search);
        newURL = urlParams.get('continue');
    }

    return newURL;
};
