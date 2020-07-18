var jwt = require('jsonwebtoken');
require('dotenv').config()
config = require('../DB');
module.exports = {
    verify: (token) => {
        try {
            let userToken = token.split(' ')[1];
            if (userToken == '' || userToken == undefined) {
                return false;
            } else {
                return jwt.verify(userToken, process.env.JWT_SECRET_KEY);
            }
        } catch (err) {
            return false;
        }
    }
}