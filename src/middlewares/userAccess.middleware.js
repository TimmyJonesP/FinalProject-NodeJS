const ErrorRepository = require("../dao/repository/error.repository");

function userAccess(req, res, next) {
    if (req.user.role === 'usuario') {
        next()
    } else {
        next(new ErrorRepository(403))
    }
}

module.exports = userAccess