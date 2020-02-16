const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 5000;
const userRoutes = express.Router();
// const userRoutes = require('./routes/users');

let User = require('./models/user.model');

app.use(cors());
app.use(express.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/centraldb', { useNewUrlParser: true });//change users to centraldb
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    // let user = new User(req.body);
    const user = new User(
        {
            username,
            email
        }
    );
    user.save()
        .then(user => {
            res.status(200).json({
                'User': 'User added successfully',
                "username": user.username,
                "email": user.email});
        })
        .catch(err => {
            res.status(400).send('Errors');
        });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});



// Deleting a user by id
userRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    User.findByIdAndDelete(id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Updating the details by id
userRoutes.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.username = req.body.username;
        user.email = req.body.email;

        user.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
