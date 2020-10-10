const reservationSchema = require("../model/reservation.model");
const statusMessages = require('../config/appConstants')


const makeReservation = async (req, res) => {
    try {
        const reservation = new reservationSchema();
        reservation.user_id = req.user._id
        const response = await reservation.save()
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_REGISTER)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

module.exports = {
    makeReservation
}