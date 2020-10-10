const userSchema = require("../model/user.model");
const nodemailer = require("nodemailer");
const statusMessages = require('../config/appConstants')


const checkRequest = async (req, res, next) => {
    try {
        const { email } = req.body
        const response = await userSchema.findOne({ email: email }, { number_of_request: 5 })
        if (response) {
            if (response.number_of_request === 5) {
                res.json(statusMessages.ERROR_MSG.NUMBER_EXCEDED)
            } else if (response.number_of_request < 5) {
                next();
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

// not completed go through it again
const makeRequest = async (req, res) => {
    try {
        const request = new requestSchema()
        request.user_id = legit.user_id
        const response = await userSchema.updateOne({ email: legit.email }, { number_of_request: data.number_of_request + 1 })
        if (data) {
            statusMessages.SUCCESS_MSG.REQUEST_RESPONSE.data = response
            res.json(statusMessages.SUCCESS_MSG.REQUEST_RESPONSE)
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const myRequest = async (req, res) => {
    try {
        const { email } = req.query
        const response = await userSchema.findOne({ email: email })
        if (response) {
            if (response.approved == false) {
                res.json(statusMessages.ERROR_MSG.REQUEST_NOT_APPROVED)
            }
            else {
                res.json(statusMessages.SUCCESS_MSG.REQUEST_APPROVED)
            }
        }
        else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}



module.exports = {
    checkRequest,
    makeRequest,
    myRequest
}