const statusMessages = require('../config/appConstants')
const token = require('../config/auth');
const userSchema = require("../model/user.model");


module.exports = async (req, res, next) => {
    try {
        const legit = await token.checkToken(req.headers.token)
        if (legit.success == true) {
            req.user = legit.user_token
            const result = await userSchema.findById({ _id: req.user._id })
            if (result) {
                next();
            }
            else {
                res.json(statusMessages.ERROR_MSG.UNAUTHORIZATION_ACCESS)
            }
        }
        else {
            res.json(statusMessages.ERROR_MSG.UNAUTHORIZATION_ACCESS);
        }
    }
    catch (error) {
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}