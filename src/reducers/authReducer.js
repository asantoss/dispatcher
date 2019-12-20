const initialState = {
	email: '',
	id: '',
	username: '',
	isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'LOGIN':
			return {
				...initialState,
				...payload
			};
		case 'LOGOUT':
			return {
				...initialState
			};
		default:
			return state;
	}
};

export default authReducer;
