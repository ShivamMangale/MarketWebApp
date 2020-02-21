const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');


// var productid = new mongoose.Schema({
//     // name: String,
//     // quantity: Number,
//     // price: Number
//     productid: mongoose.Schema.ObjectId
// })

let Vendor = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    products: [mongoose.Schema.ObjectId],
    ratecount:{
        type: Number,
        default: '0'
    },
    rating:{
        type: Number,
        default: '5'
    }
});

Vendor.plugin(uniqueValidator);
Vendor.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Vendor', Vendor);