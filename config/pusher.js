<<<<<<< HEAD
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


=======
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


>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
module.exports = pusher