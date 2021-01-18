const sessionSchema = require("../model/session.model");
const userSchema = require("../model/user.model");
const session = require('express-session');
const statusMessages = require('../config/appConstants')

const findToken = async (req, res, next) => {
    try {
        const { email, first_name } = req.body
        const adminEmail = email.toLowercase()
        const response = await adminSchema.findOne({ email: adminEmail })
        if (response && response.email === adminEmail && response.first_name === first_name) {
            res.json(statusMessages.ERROR_MSG.EMAIL_EXIST)
        }
        else {
            next()
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const saveToken = async (req, res) => {
    try {
        const { token, data } = req.admin_token
        const data = { token, user_id: _id }
        const session = new adminSchema(data);
        const response = await session.save()
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = { data, response }
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)

        } else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_MAKE_REQUEST)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const loginAdmin = async (req, res) => {
    try {
        const { password, email } = req.body
        const adminEmail = email.toLowerCase();
        const response = await adminSchema.findOne({ email: adminEmail })
        if (response) {
            const { username, _id, user_type, profile_image, profile_id, first_name, last_name } = response
            if (response.email === adminEmail) {
                const deHash = await verifyPassword(password, response.password)
                if (deHash) {

                    const token = await generateToken(response.email, username, _id, user_type)
                    statusMessages.SUCCESS_MSG.SUCCESS.data = { token, profile_id, profile_image, first_name, last_name }
                    res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                }
                else {
                    res.json(statusMessages.ERROR_MSG.EMAIL_OR_PASSWORD)
                }

            }
            else {
                res.json(statusMessages.ERROR_MSG.NO_MATCH)
            }
        }
        else {
            res.json(statusMessages.ERROR_MSG.EMAIL_NOT_FOUND)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const updateTokenStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.query;
        if (user_type === 'admin') {
            const response = await sessionSchema.findOneAndUpdate({ user_id: id }, { status: status }, { returnOriginal: false })
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = { status: response.status }
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
            }
        }
        else {
            res.json(statusMessages.ERROR_MSG.UNAUTHORIZATION_PERSONNEL)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

module.exports = {
    saveToken,
    findToken,
    loginAdmin,
    updateTokenStatus
}