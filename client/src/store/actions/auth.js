import axios from 'axios';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signUp = (name, email, password) => {
	return async (dispatch) => {
		const data = {
			name,
			email,
			password,
		};
		try {
			const response = await axios.post('/api/v1/auth/register', data);
			dispatch({
				type: SIGNUP,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const data = {
			email,
			password,
		};
		try {
			const response = await axios.post('/api/v1/auth/login', data);

			dispatch({
				type: LOGIN,
				payload: {
					token: response.data.token,
					userId: response.data.userId,
				},
			});
			const expirationDate = new Date(
				new Date().getTime() + parseInt(response.data.expiresIn) * 1000
			);
			saveDataToStorage(
				response.data.token,
				response.data.userId,
				expirationDate
			);
		} catch (error) {
			console.log(error);
		}
	};
};

const saveDataToStorage = (token, userId, expirationDate) => {
	localStorage.setItem(
		'userData',
		JSON.stringify({
			token: token,
			userId: userId,
			expirationDate: expirationDate.toISOString(),
		})
	);
};
