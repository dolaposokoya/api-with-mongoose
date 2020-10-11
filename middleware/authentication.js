const statusMessages = require('../config/appConstants')
const password = process.env.password
const email = process.env.email
const id = process.env.id
const users = [{ id, email, password }];

module.exports = {
    async authenticate({ email, password }) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            statusMessages.SUCCESS_MSG.SUCCESS.data = userWithoutPassword
            return statusMessages.SUCCESS_MSG.SUCCESS;
        }
        else {
            return statusMessages.ERROR_MSG.DATA_NOT_FOUND
        }
    }
}  