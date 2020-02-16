import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateVendor from "./components/create-vendor.component";



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
        Hello World!!!
        This works.
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/vendor" component={CreateVendor} />
      </div>
    </Router>
  );
}

export default App;
