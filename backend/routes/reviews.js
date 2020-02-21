// const router = require('express').Router();
const reviewRoutes = require('express').Router();
let Review = require('../models/review.model');
let Rating = require('../models/rating.model');


// Getting all the reviews
reviewRoutes.route('/').get(function(req, res) {
    Review.find(function(err, reviews) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(reviews);
        }
    });
});

reviewRoutes.route('/ratings').get(function(req, res) {
    Rating.find(function(err, ratings) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(ratings);
        }
    });
});



// Adding a new review
reviewRoutes.route('/add').post(function(req, res) {
    const vendorid = req.body.vendorid;
    const productid = req.body.productid;
    const customerid = req.body.customerid;
    const content = req.body.content;
    const rating = req.body.rating;
    // let review = new Review(req.body);
    const review = new Review(
        {
            vendorid,
            productid,
            customerid,
            content,
            rating,
        }
    );
    review.save()
        .then(review => {
            res.status(200).json({
                'Review': 'Review added successfully',
                "vendorid": review.vendorid,
                "productid": review.productid,
                "customerid": review.customerid,
                "content": review.content,
                "rating": review.rating});
        })
        .catch(err => {
            res.status(400).send('Errors' + err);
        });
});

reviewRoutes.route('/rate').post(function(req, res) {
    const vendorid = req.body.vendorid;
    const rating = req.body.rating;
    const record = new Rating(
        {
            vendorid,
            rating,
        }
    );
    record.save()
        .then(record => {
            res.status(200).json({
                'Review': 'Rating added successfully',
                "vendorid": record.vendorid,
                "rating": record.rating});
        })
        .catch(err => {
            res.status(400).send('Errors' + err);
        });
});

// Getting a review by id
reviewRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Review.findById(id)
      .then(review => res.json(review))
      .catch(err => res.status(400).json('Error: ' + err));
});

reviewRoutes.route('/getrate/:id').get(function(req, res) {
    let id = req.params.id;
    Rating.findById(id)
      .then(record => res.json(record.rating))
      .catch(err => res.status(400).json('Error: ' + err));
});



// Deleting a review by id
reviewRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    Review.findByIdAndDelete(id)
        .then(() => res.json('Review deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Updating the details of a review by id
reviewRoutes.route('/update/:id').post((req, res) => {
    Review.findById(req.params.id)
      .then(review => {
        review.vendorid = req.body.vendorid;
        review.productid = req.body.productid;
        review.customerid = req.body.customerid;
        review.content = req.body.content;
        review.rating = req.body.rating;
        review.save()
          .then(() => res.json('Review updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
// module.exports = router;
module.exports = reviewRoutes;