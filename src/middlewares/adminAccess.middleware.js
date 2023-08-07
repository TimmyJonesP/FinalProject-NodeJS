const ErrorRepository = require("../dao/repository/error.repository");

function adminAccess(req, res, next) {
    if(req.session.user.role === 'admin') {
        next()
    } else {
        next(new ErrorRepository(401))
    }
}

module.exports = adminAccess