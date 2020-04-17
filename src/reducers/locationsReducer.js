const initialState = {
	all: [],
	currentLocation: null,
	view: null,
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
		case 'ALL':
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default locationsReducer;
