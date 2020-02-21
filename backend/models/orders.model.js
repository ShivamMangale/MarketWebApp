const mongoose = require('mongoose');

var booking = new mongoose.Schema({
    customerid: mongoose.Schema.ObjectId,
    quantity: Number,
})

let Order = new mongoose.Schema({
    productid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    productname: {
        type: String,
        trim: true,
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
    customerid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    rating :{
        type: Number,
        default: -1
    }
});

module.exports = mongoose.model('Order', Order);