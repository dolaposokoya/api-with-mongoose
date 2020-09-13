// Initialize pusher
require('dotenv').config()
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    encrypted: true
});


module.exports = pusher