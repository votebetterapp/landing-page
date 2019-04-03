exports.handler = function(event, context, callback) {
    // your server-side functionality
    console.info(`event body cid: ${JSON.parse(event.body).cid}`);
}