const metaDataSchema = require("../model/metadata.model");
const pusher = require('../config/pusher');
const statusMessages = require('../config/appConstants')


const createBloodGroup = async (req, res) => {
    try {
        const blooddata = new metaDataSchema();
        const response = await blooddata.save()
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS);
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG);
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getAllBloodGroup = async (req, res) => {
    try {
        const response = await metaDataSchema.find()
        if (response) {
            pusher.trigger('blood', 'my-blood', { data: response });
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS);
        } else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_RETRIEVE);;
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}
module.exports = {
    createBloodGroup,
    getAllBloodGroup
}