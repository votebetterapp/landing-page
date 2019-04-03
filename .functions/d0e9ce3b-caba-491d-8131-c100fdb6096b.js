exports.handler = function(event, context, callback) {
    // your server-side functionality
    console.info(`event :${event}`);
    console.info(`cid: ${event.body.cid}`);
}