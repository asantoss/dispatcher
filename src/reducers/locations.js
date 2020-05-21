const initialState = {
	entities: [],
	filtered: null,
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
		case 'SORT_LOCATIONS':
			if (state.filtered) {
				return {
					...state,
					filtered: payload,
				};
			} else {
				return {
					...state,
					allLocations: payload,
				};
			}
		case 'UPDATE_LOCATION':
			const idx = state.allLocations.findIndex((e) => e?.id === payload?.id);
			return {
				...state,
				currentLocation: payload,
				allLocations: [
					...state.allLocations.slice(0, idx),
					payload,
					...state.allLocations.slice(idx + 1),
				],
			};
		case 'SET_CURRENT_LOCATION':
			return {
				...state,
				currentLocation: payload,
			};
		case 'SET_ALL_LOCATIONS':
			return {
				...state,
				allLocations: payload,
			};

		default:
			return state;
	}
};

export default locationsReducer;
