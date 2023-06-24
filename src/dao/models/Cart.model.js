const { Schema, model } = require("mongoose");
const Products = require("./Products.model");

const collectionName = 'cart'

const collectionSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: Products,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const Carts = model(collectionName, collectionSchema)

module.exports = Carts