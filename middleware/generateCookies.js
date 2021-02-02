"use strict";
const { SESSION_ID, ENV } = process.env
const random = require('crypto')
const { SUCCESS_MSG, ERROR_MSG } = require('../config/appConstants');
const { Base64 } = require('js-base64');

const generateCookies = async (req, res, next) => {
    const { token, _id, profile_image, first_name, last_name } = req
    const session_id = random.randomBytes(16).toString('hex')
    const credentials = `${Base64.encode(`${first_name}${_id}${session_id}`)}`
    const newcredentials = Buffer.from(credentials, 'base64').toString('ascii');
    const expires = new Date(Date.now() + (3600 * 1000 * 24))
    const maxAge = 5000
    if (token && _id && profile_image && first_name && last_name) {
        if (ENV === 'development') {
            res.cookie('_BLOODBANK_SESSION_', credentials, {
                expires,
                httpOnly: true
            })
            res.cookie('_USER_AUTHORIZATION_', token, {
                expires,
                httpOnly: true
            })
            res.cookie('_SESSION_ID_', SESSION_ID, {
                expires,
                httpOnly: false
            })
            SUCCESS_MSG.SUCCESS.data = {session_id, profile_image, first_name, last_name }
            res.json(SUCCESS_MSG.SUCCESS)
        }
        else {
            res.cookie('_BLOODBANK_SESSION_', credentials, {
                expires,
                httpOnly: true,
                secure: true
            })
            res.cookie('_USER_AUTHORIZATION_', token, {
                expires,
                httpOnly: true,
                secure: true
            })
            res.cookie('_SESSION_ID_', SESSION_ID, {
                expires,
                httpOnly: false,
                secure: true
            })
            SUCCESS_MSG.SUCCESS.data = { profile_image, first_name, last_name }
            res.json(SUCCESS_MSG.SUCCESS)
        }
    }
    else {
        res.json(ERROR_MSG.BAD_REQUEST)
    }
}

module.exports = {
    generateCookies
}