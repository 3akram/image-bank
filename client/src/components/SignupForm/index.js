import React, { useState, useReducer, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import Spinner from '../Common/Spinner';

export const FORM_INPUT_CHANGE = 'FORM_INPUT_CHANGE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_CHANGE) {
		const updatedValues = {
			...state.inputValues,
			[action.name]: action.value,
		};

		return {
			inputValues: updatedValues,
		};
	}
	return state;
};

const SignupForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [toLogin, setToLogin] = useState(false);
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
			name: '',
		},
	});

	const dispatch = useDispatch();

	const inputChangeHandler = useCallback(
		(e) => {
			dispatchFormState({
				type: FORM_INPUT_CHANGE,
				value: e.target.value,
				name: e.target.name,
			});
		},
		[dispatchFormState]
	);

	const onSignUpHandler = async (e) => {
		e.preventDefault();
		const action = authActions.signUp(
			formState.inputValues.name,
			formState.inputValues.email,
			formState.inputValues.password
		);
		setIsLoading(true);
		await dispatch(action);
		setToLogin(true);
		setIsLoading(false);
	};

	if (isLoading) return <Spinner />;
	if (toLogin) return <Redirect to={'/login'} />;
	return (
		<div className="mt-5">
			<form>
				<h3>Sign Up</h3>

				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Name"
						name="name"
						onChange={inputChangeHandler}
					/>
				</div>

				<div className="form-group">
					<input
						type="email"
						name="email"
						className="form-control"
						placeholder="Enter email"
						onChange={inputChangeHandler}
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						name="password"
						className="form-control"
						placeholder="Enter password"
						onChange={inputChangeHandler}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary btn-block"
					onClick={onSignUpHandler}
				>
					Sign Up
				</button>
				<p className="text-right">
					Already registered <Link to={'/sign-in'}>sign in?</Link>
				</p>
			</form>
		</div>
	);
};

export default SignupForm;
