import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Appcustomer from './Appcustomer';
import Appsign from './Appsign';

// console.log(localStorage.getItem("signin"), "here");
if(!localStorage.getItem("signin")){
    ReactDOM.render(<Appsign />, document.getElementById('root'));
}
else if(localStorage.getItem("usertype") === "customer"){
    ReactDOM.render(<Appcustomer />, document.getElementById('root'));
}
else{
    ReactDOM.render(<App />, document.getElementById('root'));
}

serviceWorker.unregister();
