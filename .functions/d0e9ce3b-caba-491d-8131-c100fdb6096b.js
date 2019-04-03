'use strict';

const axios = require('axios');
const querystring = require('querystring');

exports.handler = async function (event, context, callback) {
    const body = JSON.parse(event.body);

    // Get IP from event included header
    const uip = event.headers['x-forwarded-for'];
    console.info(`User IP from event headers: ${uip}`);

    // Get other properties important for GA tracking from event body
    const cid = body.cid;
    console.info(`Client ID from event body: ${cid}`);

    const dl = body.dl;
    console.info(`Document location URL from body: ${dl}`);

    const dr = body.dr;
    console.info(`Document referrer from body: ${dr}`);

    const ua = body.ua;
    console.info(`User Agent from body: ${ua}`);

    const sr = body.sr;
    console.info(`Screen Resolution from body: ${sr}`);

    const vp = body.vp;
    console.info(`Viewport size from body: ${vp}`);

    const ul = body.ul;
    console.info(`User Language from body: ${ul}`);

    const gaPayload = querystring.stringify({
        v: '1',
        tid: 'unknown',
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

    await axios.post(
        'https://www.google-analytics.com/collect',
        gaPayload,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        },
    );
}