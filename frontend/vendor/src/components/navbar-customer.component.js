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
          <Link to="/create" className="nav-link">Order a Product</Link>
          </li>
          <li className="navbar-item">
          <Link to="/viewall" className="nav-link">Your Orders</Link>
          </li>
          <li className="navbar-item">
          <Link to="/" className="nav-link" onClick={() => { localStorage.clear(); alert("Please Reload.") }}>Sign Out</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}