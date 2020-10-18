<<<<<<< HEAD
const adminSchema = require("../model/admin.model");
const { encryptPassword } = require('../utilities/universalFunctions');
const random = require('crypto')
const statusMessages = require('../config/appConstants')


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


module.exports = {
    createAdmin,
=======
const adminSchema = require("../model/admin.model");
const { encryptPassword } = require('../utilities/universalFunctions');
const random = require('crypto')
const statusMessages = require('../config/appConstants')


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


module.exports = {
    createAdmin,
>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
}