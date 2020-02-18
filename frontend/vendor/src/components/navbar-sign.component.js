import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Bulk Order</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Sign Up</Link>
          </li>
          <li className="navbar-item">
          <Link to="/signin" className="nav-link">Sign In</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}