const nodemailer = require('nodemailer');
const statusMessages = require('../config/appConstants');

// Email Transport //
const sendRequestMail = async (req, res) => {
    try {
        const host = "smtp.ethereal.email"
        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: host,
            port: 587,
            auth: {
                user: "dolexytest@gmail.com",
                pass: "Adedolapo@97"
            },
        });
        const { email, first_name } = req.request
        const link = `http://localhost:5000/pages/profile.html`;
        const text = `Hello, ${first_name} you've recieved a blood donation request. Please click this 👉${link}`;
        const mailOptions = {
            from: "Admin Bloodbank",
            to: 'dolaposokoya97@gmail.com',
            subject: "Blood Request",
            html: `<h3>${text}</h3><h4>Thanks & Regards!</h4>`
        }
        const response = await smtpTransport.sendMail(mailOptions);
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
};

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
        const text = `You have made a request on ${dayArray[day]}, ${date} ${monthArray[month]}, ${year}`;
        // const text = `You have made a request on ${dayArray[day]}, ${date} ${monthArray[month]}, ${year} click this 👉${link} to begin the process, if you didn't initiate this request contact our admin.`;
        const mailOptions = {
            from: "Admin Bloodbank",
            to: email,
            subject: "Blood Request",
            html: `<h3>${text}</h3><h4>Thanks & Regards!</h4>`
        }
        const response = await smtpTransport.sendMail(mailOptions);
        if (response) {
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        }
        else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error.message
        res.json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
};

module.exports = {
    sendRecoveryMail,
    sendRequestMail
}