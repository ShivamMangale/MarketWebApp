const mongoose = require('mongoose');

// var productid = new mongoose.Schema({
//     // name: String,
//     // quantity: Number,
//     // price: Number
//     productid: mongoose.Schema.ObjectId
// })

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
    products: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('Vendor', Vendor);