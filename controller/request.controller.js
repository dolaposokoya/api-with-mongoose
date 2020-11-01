const userSchema = require("../model/user.model");
const requestSchema = require("../model/request.model");
const nodemailer = require("nodemailer");
const statusMessages = require('../config/appConstants')


const checkRequest = async (req, res, next) => {
    try {
        const { _id } = req.user
        const response = await userSchema.findOne({ _id: _id }, { number_of_request: 5 })
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

const makeRequest = async (req, res) => {
    try {
        const request = new requestSchema()
        const { _id } = req.user
        request.user_id = _id
        const response = await request.save()
        if (response) {
            const incrementRequest = await userSchema.findByIdAndUpdate({ _id: _id }, { $inc: { number_of_request: 1 } })
            if (incrementRequest) {
                statusMessages.SUCCESS_MSG.REQUEST_RESPONSE.data = response
                res.json(statusMessages.SUCCESS_MSG.REQUEST_RESPONSE)
            }
            else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
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

const getOneRequest = async (req, res) => {
    try {
        const { _id } = req.query
        const response = await requestSchema.findById({ _id: _id })
        if (response) {
            statusMessages.SUCCESS_MSG.REQUEST_RESPONSE.data = response
            res.json(statusMessages.SUCCESS_MSG.REQUEST_RESPONSE)
        }
        else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const myRequests = async (req, res) => {
    try {
        const { _id } = req.user
        const response = await requestSchema.find({ user_id: _id })
        if (response) {
            statusMessages.SUCCESS_MSG.REQUEST_RESPONSE.data = response
            res.json(statusMessages.SUCCESS_MSG.REQUEST_RESPONSE)
        }
        else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const updateRequest = async (req, res) => {
    try {
        const { _id } = req.user
        req.body.user_id = _id
        const response = await userSchema.findByIdAndUpdate({ _id: _id }, req.body)
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

module.exports = {
    checkRequest,
    makeRequest,
    getOneRequest,
    myRequests,
    updateRequest
}