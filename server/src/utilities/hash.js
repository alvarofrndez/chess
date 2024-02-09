const bcrypt = require('bcrypt')
const crypto = require('crypto')

module.exports = {

    async hashPassword(password){
        const salt_rounds = 10

        const salt = await bcrypt.genSalt(salt_rounds)

        const hash = crypto.createHash('sha256')

        hash.update(password);

        const hashed_password = hash.digest('hex')

        return {hashed_password, salt};
    },

    async comparePasswords(entered_password, store_password){
        return new Promise((res, rej) => {
            res(entered_password == store_password)
        })
    }
}