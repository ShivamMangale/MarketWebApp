// const router = require('express').Router();
const customerRoutes = require('express').Router();
let Customer = require('../models/customer.model');


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
  

// module.exports = router;
module.exports = customerRoutes;