const initialState = {
	message: '',
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_ERROR':
			return {
				...state,
				...payload,
			};
		case 'CLEAR':
			return {
				...initialState,
			};
		default:
			return initialState;
	}
}
