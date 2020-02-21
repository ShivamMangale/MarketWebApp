const mongoose = require('mongoose');

let Rating = new mongoose.Schema({
    vendorid: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Rating', Rating);