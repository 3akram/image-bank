import React, { useState, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [toGallery, setToGallery] = useState(false);
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
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

	const onLoginHandler = async (e) => {
		e.preventDefault();
		const action = authActions.login(
			formState.inputValues.email,
			formState.inputValues.password
		);
		setIsLoading(true);
		await dispatch(action);
		setToGallery(true);
		setIsLoading(false);
	};

	if (isLoading) return <Spinner />;
	if (toGallery) return <Redirect to={'/gallery'} />;
	return (
		<div className="mt-5">
			<form>
				<h3>Sign In</h3>

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
					onClick={onLoginHandler}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
