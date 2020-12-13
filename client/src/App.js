import './App.css';

import { Provider } from 'react-redux';
import store from './config/store';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/LoginForm';
import Signup from './components/SignupForm';
import Gallery from './components/Gallery';

import React from 'react';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light fixed-top">
			<div className="container">
				<Link className="navbar-brand" to={'/sign-in'}>
					Image Bank
				</Link>
				<div
					className="collapse navbar-collapse"
					id="navbarTogglerDemo02"
				>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to={'/sign-in'}>
								Login
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={'/sign-up'}>
								Sign up
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<div>
						<Navbar />
					</div>

					<div className="auth-wrapper">
						<div className="auth-inner">
							<Switch>
								<Route exact path="/" component={Login} />
								<Route path="/sign-in" component={Login} />
								<Route path="/sign-up" component={Signup} />
								<Route path="/gallery" component={Gallery} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
