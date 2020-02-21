import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar-vendor.component"
import ProductList from "./components/view-product-listing.component";
import ProductReview from "./components/view-review-vendor.component";
import RODList from "./components/view-ready-to-dispatch.component";
import DispatchedList from "./components/view-dispatched.component";
import EditExercise from "./components/edit-exercise.component";
import ListProduct from "./components/create-product-listing.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>

        <Route path="/" exact component={ProductList} />
        <Route path="/viewall" exact component={ProductList} />
        <Route path="/viewproductreview/:id" exact component={ProductReview} />
        <Route path="/viewrod" exact component={RODList} />
        <Route path="/viewdispatched" exact component={DispatchedList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={ListProduct} />
        <Route path="/user" component={CreateUser} />
      </div>
    <div>
      <body bgcolor = "#E6E6FA">
    </body>
    </div>
    </Router>
  );
}

export default App;
