const CartsRepository = require('./repository/carts.repository')


async function saveCart(cart, product) {
    try {
        const cartsRepository = new CartsRepository()
        return cartsRepository.saveProduct(cart, product)
    } catch (error) {
        return error
    }
}


module.exports = saveCart