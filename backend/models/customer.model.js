const mongoose = require('mongoose');

var order = new mongoose.Schema({ 
    name: String, 
    pid: Number, 
    quantity: Number
});


let Customer = new mongoose.Schema({
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
    orders: {
        type: order
    }
});

module.exports = mongoose.model('Customer', Customer);