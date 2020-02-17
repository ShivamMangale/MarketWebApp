import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar-customer.component"
import OrderList from "./components/view-order.component";
import OrderProduct from "./components/order-product.component";



function Appcustomer() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
        Hello World!!!
        This works.
      <Route path="/viewall" exact component={OrderList} />
      <Route path="/create" component={OrderProduct} />
      </div>
    </Router>
  );
}

export default Appcustomer;
