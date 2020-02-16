const mongoose = require('mongoose');

var product = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
})

let Vendor = new mongoose.Schema({
    // _id: Number,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: product
    }
});

module.exports = mongoose.model('Vendor', Vendor);