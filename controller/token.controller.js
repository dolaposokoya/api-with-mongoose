"use strict";
const token = require('../config/jwtAuthorization');
const jwt = require('jsonwebtoken');
const statusMessages = require('../config/appConstants')
const userSchema = require('../model/user.model')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const validateToken = async (req, res) => {
    try {
        jwt.verify(req.headers.token, JWT_SECRET_KEY, (error, legit) => {
            if (error) {
                statusMessages.ERROR_MSG.INAVLID_TOKEN.error = error.message
                res.json(statusMessages.ERROR_MSG.INAVLID_TOKEN)
            }
            else if (legit) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = { token_verified: true }
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            }
        })
    }
    catch (error) {
        console.log('error', error)
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


module.exports = {
    validateToken
}