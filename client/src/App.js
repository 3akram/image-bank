import React, { useEffect } from 'react';

import './App.css';

import { useDispatch } from 'react-redux';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/LoginForm';
import Signup from './components/SignupForm';
import Gallery from './components/Gallery';
import * as authActions from './store/actions/auth';

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
	// to check session
	const dispatch = useDispatch();
	useEffect(() => {
		const tryToLogin = () => {
			const userData = localStorage.getItem('userData');
			const transformedData = JSON.parse(userData);

			if (!userData) {
				return;
			} else {
				const { token, userId, expirationDate } = transformedData;
				const expiryDate = new Date(expirationDate);

				if (expiryDate <= new Date() || !token || !userId) {
					return;
				}
				const action = authActions.authenticate(token, userId);
				console.log(userData);
				dispatch(action);
			}
		};
		tryToLogin();
	}, [dispatch]);
	return (
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
	);
}

export default App;
