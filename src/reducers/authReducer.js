const initialState = {
	email: '',
	id: '',
	displayName: '',
	masters: '',
	currentMaster: null,
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
				isLoggedIn: true,
			};
		case 'LOGOUT':
			return {
				...initialState,
			};
		case 'SET_USER_MASTER': {
			return {
				...state,
				currentMaster: payload,
			};
		}
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
