"use strict";
const { authenticate } = require('../middleware/authentication')
const statusMessages = require('./appConstants')

async function basicAuth(req, res, next) {
    if (req.path === '/api/user/authenticated') {
        return next();
    }

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.json(statusMessages.ERROR_MSG.MISSING_AUTH)
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const user = await authenticate({ email, password })
    if (user.success == true) {
        next();
        return base64Credentials;
    } else {
        return res.json(statusMessages.ERROR_MSG.INVALID_CREDENTIALS)
    }

};

module.exports = { basicAuth };