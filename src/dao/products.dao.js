const Products = require("./models/Products.model")
const ProductsRepository = require("./repository/products.repository")

class ProductsDao {
    constructor() { }

    async findAll() {
        try {
            const products = await Products.find()
        } catch (error) {
            return error
        }
    }
    async createMany(newProductsInfo) {
        try {
            const newProduct = await Products.insertMany(newProductsInfo)
            return newProduct
        } catch (error) {
            return error
        }
    }
    async create(newProductInfo) {
        try {
            return await Products.create(newProductInfo)
        } catch (error) {
            return error
        }
    }
    async productSearch(req, message, cartId) {
        try {
            const productsRepository = new ProductsRepository()
            const products = await productsRepository.searchProducts(req, message, cartId)
            return products
        } catch (error) {
            return error
        }
    }

    async deleteAll() {
        return await Products.deleteMany()
    }
}



module.exports = ProductsDao