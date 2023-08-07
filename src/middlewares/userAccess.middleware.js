const ErrorRepository = require("../dao/repository/error.repository");

function userAccess(req, res, next) {
    if(req.session.user.role === 'user' || req.user.role === "admin") {
        next()
    } else {
        next(new ErrorRepository(403))
    }
}

module.exports = userAccess