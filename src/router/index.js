const cartController = require('../controllers/controller.cart')
const productsController = require('../controllers/controller.products')
const sessionsController = require('../controllers/controller.sessions')
const auth = require('../auth/controller.auth')
const loggerController = require('../controllers/controller.loggerTest')
const mockingProducts = require('../controllers/controller.mocking')


const router = app => {
    app.use('/api/cart', cartController)
    app.use('/api/products', productsController)
    app.use('/api/sessions', sessionsController)
    app.use('/auth', auth)
    app.use('/mockingproducts', mockingProducts)
    app.use('/loggerTest', loggerController)
}

module.exports = router