const initialState = {
	entities: [],
	ids: [],
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_BOARD':
			return {
				...state,
				entities: {
					...state.entities,
					[payload.id]: payload.values,
				},
			};
		case 'SET_ALL_BOARDS':
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default reducer;
