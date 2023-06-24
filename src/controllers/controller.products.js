const { Router } = require('express')
const Products = require('../dao/models/Products.model');
const uploader = require('../utils/multer.utils');

const fileManager = require('../dao/filemanager.dao');
const ProductsDao = require('../dao/products.dao');
const privateAccess = require('../middlewares/privateAccess.middleware');
const adminAccess = require('../middlewares/adminAccess.middleware');
const router = Router();

const FileManager = new fileManager;

const ProDao = new ProductsDao;

router.get('/', privateAccess, async (req, res, next) => {
    try {
        const user = req.session.user;
        const message = user
            ? `Bienvenido ${user.role} ${user.first_name} ${user.last_name}!`
            : null;
        const cart = await Cart.findOne({ _id: user.cartId });
        const cartId = cart._id.toString()
        const products = await productSearch(req, message, cartId)
        res.render('products.handlebars', { user: user, products });
    } catch (error) {
        next(error)
    }
});

router.post('/', adminAccess, uploader.single('file'), async (req, res) => {
    try {
        const newProduct = await Products.create(req.body)
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