import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Appcustomer from './Appcustomer';

if(true){
ReactDOM.render(<Appcustomer />, document.getElementById('root'));
}
else{
    ReactDOM.render(<App />, document.getElementById('root'));
}
serviceWorker.unregister();
