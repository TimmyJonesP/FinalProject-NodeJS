const { default: mongoose } = require("mongoose");

const collectionName = 'product'

const collectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code:{
        type: String,
        unique: true,
    },
    category: String,
    status: Boolean,
    stock: Number
})

const Products = mongoose.model(collectionName, collectionSchema)

module.exports = Products