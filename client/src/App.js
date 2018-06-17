import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from  'react-redux';
import Store from './Store'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';


class App extends Component {
  render() {
    return (
    	<Provider>
	    	<Router>
		      <div className="App">
		        <Navbar />
		        <Route exact path="/" component={ Landing } />
		        <div className="contanier">
		        	<Route exact path='/register' component={ Register } />
		        	<Route exact path='/Login' component={ Login } />
		 	      </div>
		        <Footer />
		      </div>
	      </Router>
      </Provider>
    );
  }
}

export default App;
