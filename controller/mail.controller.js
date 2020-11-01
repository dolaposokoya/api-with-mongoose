const nodemailer = require('nodemailer');
const moment = require('moment');
const statusMessages = require('../config/appConstants');

// Email Transport //
const sendRecoveryMail = async (req, res) => {
    try {
        const host = "smtp.ethereal.email"
        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: host,
            port: 587,
            auth: {
                user: "sokoya.webnexus@gmail.com",
                pass: "sokoya@webnexus2019"
            },
        });

        const { email } = req
        let date = new Date().getDate()
        const month = new Date().getMonth()
        const year = new Date().getFullYear()
        const day = new Date().getDay()
        const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        date = date < 10 ? `0${date}` : `${date}`
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const link = `http://localhost:5000/index.html`;
        const text = `You have made a request for password recovery on ${dayArray[day]}, ${date} ${monthArray[month]}, ${year} click this 👉${link} to begin the process, if you didn't initiate this request contact our admin.`;
        const mailOptions = {
            from: "Agent Gateway",
            to: email,
            subject: "Passwod Recovery",
            html: `<h3>${text}</h3><h4>Thanks & Regards!</h4>`
        }
        const response = await smtpTransport.sendMail(mailOptions);
        if (response) {
            res.json(statusMessages.SUCCESS_MSG.PWD_RECOVERY)
        }
        else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
};


module.exports = { sendRecoveryMail }