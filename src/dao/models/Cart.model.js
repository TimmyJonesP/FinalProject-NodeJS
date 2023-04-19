const { default: mongoose } = require("mongoose");

const collectionName = 'cart'

const collectionSchema = new mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
    }]
})

const Carts = mongoose.model(collectionName, collectionSchema)

module.exports = Carts