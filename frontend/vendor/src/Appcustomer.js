import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar-customer.component"
import OrderList from "./components/view-order.component";
import ReviewList from "./components/view-review.component";
import GiveReview from "./components/give-review.component";
import GiveRating from "./components/give-rating.component";
import EditOrder from "./components/edit-order.component";
import OrderProduct from "./components/order-product.component";
import PlaceOrder from "./components/create-order.component";
import ViewStatus from "./components/view-status.component";



function Appcustomer() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      
      <Route path="/viewall" exact component={OrderList} />
      <Route path="/viewreview/:id" exact component={ReviewList} />
      <Route path="/review/:id/:prodid" exact component={GiveReview} />
      <Route path="/ratevendor/:id" exact component={GiveRating} />
      <Route path="/edit/:id/:orderid" exact component={EditOrder} />
      <Route path="/orders/add/:id" exact component={PlaceOrder} />
      <Route path="/create" component={OrderProduct} />
      <Route path="/viewstatus/:id/:vendorid" component={ViewStatus} />
      </div>
    </Router>
  );
}

export default Appcustomer;
