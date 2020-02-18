const mongoose = require('mongoose');

let Review = new mongoose.Schema({
    vendorid: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    // productid: {
    //     type: mongoose.Schema.ObjectId,
    //     required: true
    // },
    customerid: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Review', Review);