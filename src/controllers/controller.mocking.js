const { Router } = require("express");
const ProductsRepository = require("../dao/repository/products.repository");

const router = Router()

router.post("/", async (req, res, next) => {
    try {
        const productsRepository = new ProductsRepository()
        const mockProducts = await productsRepository.generateMockProducts()
        res.json({ Productos: mockProducts })
    } catch (error) {
        next(error)
    }
})
module.exports = router
