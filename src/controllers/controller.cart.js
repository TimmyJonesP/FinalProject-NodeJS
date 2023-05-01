const { Router } = require('express')
const Carts = require('../dao/models/Cart.model')
const Products = require('../dao/models/Products.model')
const privateAccess = require('../middlewares/privateAccess.middleware')

const router = Router()

router.get('/', privateAccess, async (req, res) => {
    try {
        const carts = await Carts.find()
        res.json({ message: carts })
    } catch (error) {
        res.json(error)
    }
})

router.post("/", async (req, res) => {
    try {
        const newCart = { products: [] };
        const cart = new Carts(newCart);
        await cart.save();
        res.json({ id: cart._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', privateAccess, async (req, res) => {
    try {
        const cart = await Carts.findById(req.params.cid).populate('products.productId').lean();
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        console.log(cart)
        res.render("cart.handlebars",{ carro : cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Carts.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const { productId, quantity } = req.body;

        const product = await Products.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        cart.products.push({ productId, quantity });
        const updatedCart = await cart.save();

        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:cid/product/p:pid', async (req, res) => {
    try {

    } catch (error) {

    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Carts.findOneAndUpdate(
            { _id: cid, "products.productId": pid },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params

        await Carts.findOneAndDelete(cid)

        res.status(200).json({ message: `Cart ${cid} eliminado correctamente.` })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Carts.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.id === pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
});
module.exports = router