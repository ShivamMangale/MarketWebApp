// const router = require('express').Router();
const vendorRoutes = require('express').Router();
let Vendor = require('../models/vendor.model');


// Getting all the vendors
vendorRoutes.route('/').get(function(req, res) {
    Vendor.find(function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(vendors);
        }
    });
});

// Adding a new vendor
vendorRoutes.route('/add').post(function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // let vendor = new Vendor(req.body);
    const vendor = new Vendor(
        {
            username,
            email,
            password
        }
    );
    vendor.save()
        .then(vendor => {
            res.status(200).json({
                'Vendor': 'Vendor added successfully',
                "username": vendor.username,
                "email": vendor.email,
                "password": vendor.password});
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// Getting a vendor by id
vendorRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Vendor.findById(id)
      .then(vendor => res.json(vendor))
      .catch(err => res.status(400).json('Error: ' + err));
});



// Deleting a vendor by id
vendorRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    Vendor.findByIdAndDelete(id)
        .then(() => res.json('Vendor deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Updating the details of a vendor by id
vendorRoutes.route('/update/:id').post((req, res) => {
    Vendor.findById(req.params.id)
      .then(vendor => {
        vendor.username = req.body.username;
        vendor.email = req.body.email;
        vendor.password = req.body.password;

        vendor.save()
          .then(() => res.json('Vendor updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
// module.exports = router;
module.exports = vendorRoutes;