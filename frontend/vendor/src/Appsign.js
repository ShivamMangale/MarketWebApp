import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar-sign.component"
import Signup from "./components/signup.component";
import Signin from "./components/signin.component";




function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
        Hello World!!!
        This works.
        <Route path="/" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
      </div>
    </Router>
  );
}

export default App;
