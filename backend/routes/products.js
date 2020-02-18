// const router = require('express').Router();
const productRoutes = require('express').Router();
let Product = require('../models/product.model');

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
    const quantityleft = req.body.quantity;
    const price = req.body.price;
    const vendorid = req.body.vendorid;
    const buyers = req.body.buyers;
    const status = req.body.status;
    const rating = req.body.rating;

    // let product = new Product(req.body);
    const product = new Product(
        {
            name,
            quantity,
            quantityleft,
            price,
            vendorid,
            buyers,
            status
        }
    );
    product.save()
        .then(product => {
            res.status(200).json({
                'Product': 'Product added successfully',
                "name": product.name,
                "quantity": product.quantity,
                "quantityleft": product.quantityleft,
                "price": product.price,
                "vendorid": product.vendorid,
                "buyers": product.buyers,
                "status": product.status,
                "rating": product.rating
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
        product.quantityleft = req.body.quantityleft || req.body.quantity;
        product.price = req.body.price;
        product.vendorid = req.body.vendorid;
        product.buyers = req.body.buyers;
        product.status = req.body.status;
        product.rating = req.body.rating;

        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

// module.exports = router;
module.exports = productRoutes;