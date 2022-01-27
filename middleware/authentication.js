const statusMessages = require('../config/appConstants')
const { password, email, userid } = process.env
const users = [{ userid, email, password }];

module.exports = {
    async authenticate({ email, password }) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            statusMessages.SUCCESS_MSG.SUCCESS.data = userWithoutPassword
            return statusMessages.SUCCESS_MSG.SUCCESS;
        } else {
            return statusMessages.ERROR_MSG.DATA_NOT_FOUND
        }
    }
}