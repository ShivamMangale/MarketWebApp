const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 5000;
// const vendorRoutes = express.Router();
const customerRoutes = express.Router();
const productRoutes = express.Router();
const vendorRoutes = require('./routes/vendors');

// let Vendor = require('./models/vendor.model');
let Customer = require('./models/customer.model');
let Product = require('./models/product.model');

app.use(cors());
app.use(express.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/centraldb', { useNewUrlParser: true });//change users to centraldb
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints


// Getting all the customers
customerRoutes.route('/').get(function(req, res) {
    Customer.find(function(err, customers) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(customers);
        }
    });
});

// Adding a new customer
customerRoutes.route('/add').post(function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // let customer = new Customer(req.body);
    const customer = new Customer(
        {
            username,
            email,
            password
        }
    );
    customer.save()
        .then(customer => {
            res.status(200).json({
                'Customer': 'Customer added successfully',
                "username": customer.username,
                "email": customer.email,
                "password": customer.password});
        })
        .catch(err => {
            res.status(400).send('Errors' + err);
        });
});

// Getting a customer by id
customerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Customer.findById(id)
      .then(customer => res.json(customer))
      .catch(err => res.status(400).json('Error: ' + err));
});



// Deleting a customer by id
customerRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    Customer.findByIdAndDelete(id)
        .then(() => res.json('Customer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Updating the details of a customer by id
customerRoutes.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id)
      .then(customer => {
        customer.username = req.body.username;
        customer.email = req.body.email;
        customer.password = req.body.password;

        customer.save()
          .then(() => res.json('Customer updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


// Getting all the products
productRoutes.route('/').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(products);
        }
    });
});

// Adding a new product
productRoutes.route('/add').post(function(req, res) {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const vendorid = req.body.vendorid;
    const buyers = req.body.buyers;
    // let product = new Product(req.body);
    const product = new Product(
        {
            name,
            quantity,
            price,
            vendorid,
            buyers
        }
    );
    product.save()
        .then(product => {
            res.status(200).json({
                'Product': 'Product added successfully',
                "name": product.name,
                "quantity": product.quantity,
                "price": product.price,
                "vendorid": product.vendorid,
                "buyers": product.buyers,
                });
        })
        .catch(err => {
            res.status(400).send('Errors' + err);
        });
});

// Getting a product by id
productRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id)
      .then(product => res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
});



// Deleting a product by id
productRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Updating the details of a product by id
productRoutes.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        product.name = req.body.name;
        product.quantity = req.body.quantity;
        product.price = req.body.price;
        product.vendorid = req.body.vendorid;
        product.buyers = req.body.buyers;

        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


app.use('/vendors', vendorRoutes);

app.use('/customers', customerRoutes);

app.use('/products', productRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
