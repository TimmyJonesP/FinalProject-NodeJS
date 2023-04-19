const cartController = require('../controllers/controller.cart')
const productsController = require('../controllers/controller.products')

const router = app => {
    app.use('/api/cart', cartController)
    app.use('/api/products', productsController)
}

module.exports = router