const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('User', User);