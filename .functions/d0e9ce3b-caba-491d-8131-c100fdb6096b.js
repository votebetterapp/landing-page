exports.handler = function (event, context, callback) {
    const https = require('https');
    const querystring = require('querystring');

    const body = JSON.parse(event.body);

    // Get IP from event included header
    const uip = event.headers['x-forwarded-for'];
    // console.info(`User IP from event headers: ${uip}`);

    // Get other properties important for GA tracking from event body
    const cid = body.cid;
    // console.info(`Client ID from event body: ${cid}`);

    const dl = body.dl;
    // console.info(`Document location URL from body: ${dl}`);

    const dr = body.dr;
    // console.info(`Document referrer from body: ${dr}`);

    const ua = body.ua;
    // console.info(`User Agent from body: ${ua}`);

    const sr = body.sr;
    // console.info(`Screen Resolution from body: ${sr}`);

    const vp = body.vp;
    // console.info(`Viewport size from body: ${vp}`);

    const ul = body.ul;
    // console.info(`User Language from body: ${ul}`);

    const gaPayload = querystring.stringify({
        v: '1',
        tid: 'UA-137586657-1',
        cid,
        t: 'pageview',
        dl,
        uip,
        dr,
        ua,
        sr,
        vp,
        ul,
    });
    console.info(`ga payload: ${JSON.stringify(gaPayload)}`);

    const options = {
        hostname: 'www.google-analytics.com',
        port: 443,
        path: '/collect',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': gaPayload.length,
        },
    };

    const req = https.request(options, res => {
        console.info(`GA POST response status code: ${res.statusCode}`);
    });

    req.on('error', e => {
        console.error(`GA POST error: ${e.message}`);
        throw e;
    })

    req.write(gaPayload);
    req.end();
}