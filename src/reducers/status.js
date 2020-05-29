const initialState = {
	message: '',
	loading: false,
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	if (type.match(/^FETCH/g)) {
		return {
			...state,
			loading: true,
		};
	}
	if (type.match(/^SET/g)) {
		return {
			...state,
			loading: false,
		};
	}
	if (type === 'SET_ERROR') {
		return {
			message: payload,
			loading: false,
		};
	}
	if (type === 'CLEAR') {
		return { ...initialState };
	}
	return state;
}
