const initialState = {
	message: '',
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'FIRED':
			return {
				...state,
				loading: true,
			};
		case 'FULFILLED':
			return {
				...state,
				loading: false,
			};
		case 'SET_ERROR':
			return {
				...state,
				error: payload,
				loading: false,
			};
		case 'CLEAR':
			return {
				...initialState,
			};
		default:
			return initialState;
	}
}
