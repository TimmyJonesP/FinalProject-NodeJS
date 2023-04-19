const Products = require("./models/Protucts.model")

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
    async create(newProductInfo){
        try {
            return await Products.create(newProductInfo)
        } catch (error) {
            return error
        }
    }
    async deleteAll(){
        return await Products.deleteMany()
    }
}



module.exports = ProductsDao