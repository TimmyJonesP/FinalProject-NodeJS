const bcrypt = require('bcrypt')

const hashPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    const passEncrypted = bcrypt.hashSync(password, salt)

    return passEncrypted
}

const isValidPassword = (password, user) => {
    const response = bcrypt.compareSync(password, user.password)

    return response
}

module.exports = {
    hashPassword,
    isValidPassword,
}