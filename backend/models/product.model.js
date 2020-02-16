const mongoose = require('mongoose');

var booking = new mongoose.Schema({
    customerid: mongoose.Schema.ObjectId,
    quantity: Number,
})

let Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    vendorid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    buyers: [booking]
});

module.exports = mongoose.model('Product', Product);