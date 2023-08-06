const Products = require("../models/Products.model");
const Cart = require('../models/Cart.model');
const ErrorRepository = require("./error.repository");
const faker = require('faker')

class ProductsRepository {
    async searchProducts(req, message, cartId) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const sort = req.query.sort === 'asc' ? 'price' : req.query.sort === 'desc' ? '-price' : null;
            const query = req.query.query ? {
                $and: [{
                    $or: [
                        { name: { $regex: new RegExp(req.query.query, 'i') } },
                        { description: { $regex: new RegExp(req.query.query, 'i') } },
                    ],
                }, {
                    category: {
                        $regex: req.query.category || '',
                        $options: 'i',
                    },
                },
                ],
            }
                : { category: { $regex: req.query.category || '', $options: 'i' } };

            const cart = await Cart.findById(cartId);
            const products = await Products.paginate(query, {
                limit: limit,
                page: page,
                sort: sort,
            });
            const totalPages = products.totalPages;
            const prevPage = products.prevPage;
            const nextPage = products.nextPage;
            const currentPage = products.page;
            const hasPrevPage = products.hasPrevPage;
            const hasNextPage = products.hasNextPage;
            const prevLink = hasPrevPage
                ? `http://${req.headers.host}/api/dbProducts?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}`
                : null;
            const nextLink = hasNextPage
                ? `http://${req.headers.host}/api/dbProducts?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}`
                : null;


            const numProdCart = cart.products.length
            const productList = {
                title: 'Lista de Productos',
                products: products.docs,
                cartId: cartId,
                cartQuantity: numProdCart,
                message: message,
                totalPages: totalPages,
                prevPage: prevPage,
                nextPage: nextPage,
                page: currentPage,
                hasPrevPage: hasPrevPage,
                hasNextPage: hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink,
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            }


            return productList
        } catch (error) {
            throw new ErrorRepository(400)
        }
    }
    async generateMockProducts() {
        try {
            const mockProducts = [];

            for (let i = 1; i <= 100; i++) {
                const product = {
                    _id: faker.datatype.uuid(),
                    name: faker.commerce.productName(),
                    description: faker.lorem.sentence(),
                    price: faker.commerce.price(),
                    stock: faker.random.number(100),
                    code: `Code ${i}`,
                    category: `Category ${i}`,
                    status: true,
                    img: `https://example.com/image${i}.jpg`
                };

                mockProducts.push(product);
            }

            return mockProducts;
        } catch (error) {
            throw new ErrorRepository(400, "Can't be generated");
        }
    }
}
module.exports = ProductsRepository