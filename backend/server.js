const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 5000;
// const vendorRoutes = express.Router();
const vendorRoutes = require('./routes/vendors');
const customerRoutes = require('./routes/customers');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

// let Vendor = require('./models/vendor.model');
// let Customer = require('./models/customer.model');
// let Product = require('./models/product.model');

app.use(cors());
app.use(express.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/centraldb', { useNewUrlParser: true });//change users to centraldb
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints


app.use('/vendors', vendorRoutes);

app.use('/customers', customerRoutes);

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use('/reviews', reviewRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
