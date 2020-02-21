const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
 
var order = new mongoose.Schema({ 
    name: String, 
    pid: Number, 
    quantity: Number
});


let Customer = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        dropdups: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    orders: {
        type: order
    }
});

Customer.plugin(uniqueValidator);
Customer.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('Customer', Customer);