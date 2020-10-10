// Initialize pusher
require('dotenv').config()
const Pusher = require('pusher');

const { appId, key, secret, cluster } = process.env
const pusher = new Pusher({
    appId: appId,
    key: key,
    secret: secret,
    cluster: cluster,
    useTLS: true,
});


module.exports = pusher