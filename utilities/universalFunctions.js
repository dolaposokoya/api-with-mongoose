const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    async encryptPassword(data) {
        try {
            const hash = await bcrypt.hash(data, saltRounds);
            if (hash) {
                return hash
            }
            else {
                return false
            }
        }
        catch (error) {
            return error
        }
    },

    async verifyPassword(password, hash) {
        try {
            const match = await bcrypt.compare(password, hash)
            if (match) {
                return match
            }
            else {
                return false
            }
        }
        catch (error) {
            return error
        }
    }
}