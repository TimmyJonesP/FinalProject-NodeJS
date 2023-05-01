const { Router } = require('express')
const Products = require('../dao/models/Products.model');
const uploader = require('../utils/multer.utils');

const fileManager = require('../dao/filemanager.dao');
const ProductsDao = require('../dao/products.dao');
const privateAccess = require('../middlewares/privateAccess.middleware');
const router = Router();

const FileManager = new fileManager;

const ProDao = new ProductsDao;

router.get('/', privateAccess, async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';
    const bystock = req.query.stock || '';
    const {user} = req.session

    try {
        let result;
        let count;

        if (limit || page || (sort && sort.length > 0) || query || bystock) {
            const pipeline = [
                { $match: { 'title': { $regex: query, $options: 'i' } } },
                ...(sort && sort.length > 0 ? [{ $sort: { [sort]: -1 } }] : []),
                { $sort: { stock: bystock === 'true' ? -1 : 1 } },
                { $sort: { price: sort === 'asc' ? 1 : -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit }
            ];

            result = await Products.aggregate(pipeline);

            const countPipeline = [
                { $match: { 'title': { $regex: query, $options: 'i' } } },                { $group: { _id: null, count: { $sum: 1 } } }
            ];

            const countResult = await Products.aggregate(countPipeline);
            count = countResult.length > 0 ? countResult[0].count : 0;
        } else {
            result = await Products.find();
            count = result.length;
        }


        const totalPages = Math.ceil(count / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevLink = hasPrevPage ? `${req.protocol}://${req.get('host')}${req.baseUrl}?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}&stock=${bystock}` : null;
        const nextLink = hasNextPage ? `${req.protocol}://${req.get('host')}${req.baseUrl}?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}&stock=${bystock}` : null;
        res.render("products.handlebars", {
            status: 'success',
            payload: result,
            totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            user: user
        })
    } catch (err) {
        res.status(500).json({ error: err.message, status: 'error' });
    }
});

router.post('/', uploader.single('file'), async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body
        const newProductInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            image: req.file.filename
        }
        const newProduct = await Products.create(newProductInfo)
        res.json({ message: newProduct })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: "Este producto ya esta agregado en la base de datos." })
        }
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/:id', privateAccess, async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stock = req.body.stock;

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/loadItems', privateAccess, async (req, res) => {
    try {
        const products = await FileManager.loadItems()
        const newProduct = await ProDao.createMany(products)
        res.json({ message: newProduct })
    } catch (error) {
        res.json(error)
    }
})

router.delete("/deleteAll", async (req, res) => {
    await ProDao.deleteAll()
    res.json({ message: "Doomed" })
})
module.exports = router