const initialState = {
	entities: {},
	ids: [],
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_TICKET':
			return {
				...state,
				entities: {
					...state.entities,
					[payload.id]: { ...state.entities[payload.id], ...payload.entity },
				},
			};
		case 'SET_ALL_TICKETS':
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default reducer;
