const adminSchema = require("../model/admin.model");
const { encryptPassword, verifyPassword } = require('../utilities/universalFunctions');
const random = require('crypto')
const { generateToken } = require('../config/jwtAuthorization')
const statusMessages = require('../config/appConstants')

const findAdmin = async (req, res, next) => {
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


const createAdmin = async (req, res) => {
    try {
        const id = random.randomBytes(4).toString('hex')
        const { password } = req.body;
        const admin = new adminSchema(req.body);
        const hash = await encryptPassword(password);
        if (hash) {
            admin.password = hash
            admin.profile_id = id
            const response = await admin.save()
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)

            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_REGISTER)
            }
        }
        else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
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

const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.query;
        const { user_type } = req.user
        if (user_type === 'admin') {
            const response = await userSchema.findByIdAndUpdate({ _id: id }, { status: status }, { returnOriginal: false })
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
    createAdmin,
    findAdmin,
    loginAdmin,
    updateUserStatus
}