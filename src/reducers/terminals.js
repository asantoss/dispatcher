const initialState = {
	entities: {},
	ids: [],
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_TERMINAL':
			return {
				...state,
				entities: {
					...state.entities,
					[payload.id]: { ...state.entities[payload.id], ...payload.entity },
				},
			};
		case 'SET_ALL_TERMINALS':
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default reducer;
