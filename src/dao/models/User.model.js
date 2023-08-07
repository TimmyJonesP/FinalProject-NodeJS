const mongoose = require('mongoose');

const collectionName = "User"


const collectionSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }

})

const User = mongoose.model(collectionName, collectionSchema)

module.exports = User