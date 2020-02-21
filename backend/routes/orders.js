// const router = require('express').Router();
const orderRoutes = require('express').Router();
let Order = require('../models/orders.model');

// Getting all the orders
orderRoutes.route('/').get(function(req, res) {
    console.log("here");
    Order.find(function(err, orders) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(orders);
        }
    });
});


// Adding a new order
orderRoutes.route('/add').post(function(req, res) {
    console.log("HERE");
    const productid = req.body.productid;
    const productname = req.body.productname;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const vendorid = req.body.vendorid;
    const customerid = req.body.customerid;
    // let order = new Order(req.body);
    const order = new Order(
        {
            productid,
            productname,
            quantity,
            price,
            vendorid,
            customerid,
        }
    );
    order.save()
        .then(order => {
            res.status(200).json({
                'Order': 'Order added successfully',
                "productid": order.productid,
                "productname": order.productname,
                "quantity": order.quantity,
                "price": order.price,
                "vendorid": order.vendorid,
                "customerid": order.customerid,
                });
        })
        .catch(err => {
            res.status(400).send('Errors' + err);
        });
});

// Getting a order by id
orderRoutes.route('/:id').get(function(req, res) {
    console.log("in id");
    let id = req.params.id;
    Order.findById(id)
      .then(order => res.json(order))
      .catch(err => res.status(400).json('Error: ' + err));
});

orderRoutes.route('/productid/:id').get(function(req, res) {
    // console.log("in id");
    let id = req.params.id;
    Order.findById(id)
      .then(order => res.json(order.productid))
      .catch(err => res.status(400).json('Error: ' + err));
});


orderRoutes.route('/quantity/:id').get(function(req, res) {
    // console.log("in id");
    let id = req.params.id;
    Order.findById(id)
      .then(order => res.json(order.quantity))
      .catch(err => res.status(400).json('Error: ' + err));
});


// Deleting a order by id
orderRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    Order.findByIdAndDelete(id)
        .then(() => res.json('Order deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Updating the details of a order by id
orderRoutes.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
      .then(order => {
        order.name = req.body.name;
        order.quantity = req.body.quantity;
        order.price = req.body.price;
        order.vendorid = req.body.vendorid;
        order.buyers = req.body.buyers;

        order.save()
          .then(() => res.json('Order updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  orderRoutes.route('/cancel/:id').post((req, res) => {
    console.log("in cancelled");
    // Order.update({"productid": this.props.match.params.id}, {"$set":{"status": "cancelled"}}, {"multi": true}, (err, writeResult) => {});
    Order.updateMany({"productid": this.props.match.params.id}, {"$set":{"status": "cancelled"}});
});
  

module.exports = orderRoutes;