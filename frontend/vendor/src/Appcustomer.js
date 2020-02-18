import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar-customer.component"
import OrderList from "./components/view-order.component";
import ReviewList from "./components/view-review.component";
import GiveReview from "./components/give-review.component";
import OrderProduct from "./components/order-product.component";
import PlaceOrder from "./components/create-order.component";



function Appcustomer() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
        Hello World!!!
        This works.
      <Route path="/viewall" exact component={OrderList} />
      <Route path="/viewreview/:id" exact component={ReviewList} />
      <Route path="/review/:id" exact component={GiveReview} />
      <Route path="/orders/add/:id" exact component={PlaceOrder} />
      <Route path="/create" component={OrderProduct} />
      </div>
    </Router>
  );
}

export default Appcustomer;
