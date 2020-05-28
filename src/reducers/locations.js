const initialState = {
	entities: {},
	ids: [],
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
		case 'SET_LOCATION':
			return {
				...state,
				entities: {
					...state.entities,
					[payload.id]: { ...state.entities[payload.id], ...payload.entity },
				},
			};
		case 'SET_ALL_LOCATIONS':
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};

export default locationsReducer;
