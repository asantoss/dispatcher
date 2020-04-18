const initialState = {
	all: [],
	currentLocation: null,
	view: null,
	loading: false,
	error: null,
};

const locationsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'VIEW':
			return {
				...initialState,
				...payload,
			};
		case 'EDIT':
			return {
				...initialState,
			};
		case 'SET_CURRENT_LOCATION':
			return {
				...state,
				currentLocation: payload,
			};
		case 'FIRED':
			return {
				...state,
				loading: true,
			};
		case 'FUFILLED':
			return {
				...state,
				loading: false,
			};
		case 'ERROR':
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default locationsReducer;
