const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


module.exports = {
    async checkToken(token) {
        try {
            // const userToken = token.split(' ')[1];
            if (token === '' || token === undefined || token === null) {
                return {
                    success: false
                }
            } else {
                return {
                    user_token: jwt.verify(token, JWT_SECRET_KEY),
                    success: true
                };
            }
        } catch (err) {
            return false;
        }
    },
    async generateToken(email, username, _id, user_type) {
        try {
            const token = jwt.sign({ email: email, username: username, _id: _id, user_type: user_type }, JWT_SECRET_KEY, { expiresIn: '24h' }, { algorithm: 'RS256' })
            if (token) {
                return token
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    }
}