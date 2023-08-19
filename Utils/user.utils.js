const bcrypt = require('bcrypt');

module.exports = {
    async getHashedPassword(password) {
        try {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log(hashedPassword);
            return hashedPassword;
        } catch (error) {
            console.error('Error while hashing password:', error);
            throw error;
        }
    },
};
