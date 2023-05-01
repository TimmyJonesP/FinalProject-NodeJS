const cartController = require('../controllers/controller.cart')
const productsController = require('../controllers/controller.products')
const sessionsController = require('../controllers/controller.sessions')
const auth = require('../auth/controller.auth')

const router = app => {
    app.use('/api/cart', cartController)
    app.use('/api/products', productsController)
    app.use('/api/sessions', sessionsController)
    app.use('/auth', auth)
}

module.exports = router