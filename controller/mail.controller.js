const nodemailer = require('nodemailer');
const moment = require('moment');
const statusMessages = require('../config/appConstants');

// Email Transport //
const sendRecoveryMail = async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
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
        date = date < 10 ? `0${date}` : `${date}`
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        console.log(new Date().getDate())
        const link = `http://${host}/`;
        const text = `You have made a request for password recovery on ${monthArray[month]} ${date} ${year} check your mail for the link  ${link}, if you didn't initiate this request contact our admin.`;
        const mailOptions = {
            from: "Agent Gateway",
            to: email,
            subject: "Passwod Recovery",
            html: `<h1>Welcome</h1><h3>${text}</h3><p>Thanks & Regards!</p>`
        }
        const response = await smtpTransport.sendMail(mailOptions);
        if (!response) {
            console.log('err :', response);
            statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG.error = response
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
        else {
            statusMessages.SUCCESS_MSG.PWD_RECOVERY.data = response
            res.json(statusMessages.SUCCESS_MSG.PWD_RECOVERY)
        }
    }
    catch (error) {
        console.log('error', error)
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
};


module.exports = { sendRecoveryMail }