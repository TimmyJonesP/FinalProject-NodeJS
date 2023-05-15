const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const collectionName = "User"


const collectionSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
});

const User = mongoose.model(collectionName, collectionSchema)

module.exports = User