const errorMessages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    500: 'Internal Server Error'
}

class ErrorRepository extends Error {
    constructor(code, message) {
        super(message || errorMessages[code])
        this.code = code
    }
}

module.exports = ErrorRepository
