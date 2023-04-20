const { Schema, model } = require("mongoose");
const Products = require("./Products.model");

const collectionName = 'cart'

const collectionSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: Products,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
});

const Carts = model(collectionName, collectionSchema)

module.exports = Carts