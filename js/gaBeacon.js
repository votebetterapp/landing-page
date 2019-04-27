/**
 * This file contains the code that sends the Google Analytics beacon. Note
 * that a Netlify Function proxy (whose name is a UUID) is used so that ad
 * blockers don't block the beacon request. Many ad blockers like ublock origin
 * block calls to Google Analyics servers.
 */
(function () {
    // Don't do GA beacon on preview branches
    if (window.location.hostname !== 'votebetter.app') {
        return;
    }

    var gaProxyUrl = 'https://' + window.location.hostname + '/.netlify/functions/d0e9ce3b-caba-491d-8131-c100fdb6096b';

    function uuid() {
        var uuid = "",
            i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }
    // Anonymous user identification so GA tracks users and sessions properly
    var cidKey = 'votebetter.app-cid';
    var cid = localStorage.getItem(cidKey);
    if (cid === null) {
        cid = uuid();
        localStorage.setItem(cidKey, cid);
    }
    document.addEventListener('DOMContentLoaded', function () {
        console.info('Starting Google Analytics proxy request...');
        axios.post(gaProxyUrl, {
            cid,
            dl: document.location.href,
            dr: document.referrer,
            ua: navigator.userAgent,
            sr: `${window.screen.width}x${window.screen.height}`,
            vp: `${window.innerWidth}x${window.innerHeight}`,
            ul: window.navigator.language,
        })
            .then(() => {
                console.info('...Google Analytics proxy request success.');
            })
            .catch(() => {
                console.error('...Google Analytics proxy request fail.');
            });
    });
})();
