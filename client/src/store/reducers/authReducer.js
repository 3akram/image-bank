import { AUTHENTICATE, LOGIN, SIGNUP } from '../actions/auth';

const initialState = {
	token: null,
	userId: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SIGNUP:
			return { ...state, ...payload };

		case LOGIN:
			return { token: payload.token, userId: payload.userId };

		case AUTHENTICATE:
			return { token: payload.token, userId: payload.userId };
		default:
			return state;
	}
};
