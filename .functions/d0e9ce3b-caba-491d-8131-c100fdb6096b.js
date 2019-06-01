exports.handler = function (event, _, _) {
    const https = require('https');
    const querystring = require('querystring');

    const ipBlacklist = [
        ['Matt, Eldon home', '108.162.163.103'],
        ['Matt phone', '209.171.88.118'],
        ['Eldon phone', '209.171.88.161'],
        ['Steph home', '72.141.60.55'],
        ['Steph phone', '209.171.88.193'],
        ['Steph work', '130.63.149.46'],
    ];

    const body = JSON.parse(event.body);

    // Get IP from event included header
    const uip = event.headers['x-forwarded-for'];

    // Iterate through IP blacklist. As soon as a match is found, log that it's
    // skipped and return early from entire function.
    for (const ip of ipBlacklist) {
        if (ip[1] === uip) {
            console.info(`Skipping blacklisted IP for ${ip[0]}: ${uip}`);
            return;
        }
    }

    // Get other properties important for GA tracking from event body
    const cid = body.cid;
    const dl = body.dl;
    const dr = body.dr;
    const ua = body.ua;
    const sr = body.sr;
    const vp = body.vp;
    const ul = body.ul;

    // Prepare the body of the request to be sent to Google Analytics
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
    console.info(`GA payload: ${JSON.stringify(gaPayload)}`);

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
