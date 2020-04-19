const initialState = {
	email: '',
	id: '',
	username: '',
	location: null,
	isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'LOGIN':
			return {
				...initialState,
				...payload,
			};
		case 'LOGOUT':
			return {
				...initialState,
			};
		case 'SET_USER_LOCATION':
			return {
				...state,
				location: payload,
			};
		default:
			return state;
	}
};

export default authReducer;
