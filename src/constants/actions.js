import { value as firebase } from '../index';

export const FETCH = 'FETCH';

export const LOGIN = (payload) => {
	return { type: 'LOGIN', payload };
};
export const LOGOUT = () => {
	return { type: 'LOGOUT' };
};

export const SET_USER_LOCATION = (payload) => {
	return { type: 'SET_USER_LOCATION', payload };
};
export const SET_USER_MASTER = (payload) => {
	return { type: 'SET_USER_MASTER', payload };
};
export const SET_USER_MASTERS = (payload) => {
	return { type: 'SET_USER_MASTERS', payload };
};

// export const UPDATE_LOCATION = (payload) => {
// 	return { type: 'UPDATE_LOCATION', payload };
// };

export const REMOVE_TERMINAL = (payload) => {
	const { terminal, id } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { locations } = getState();
		const location = locations.entities[id];
		firebase
			.removeTerminalFromLocation(terminal, location, id)
			.then((terminals) => {
				dispatch(SET_LOCATION({ entity: { ...location, terminals }, id }));
			})
			.catch((e) => alert('Error please try again \n ' + e.message));
	};
};
export const ADD_TERMINALS = (payload) => {
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { locations } = getState();
		const { terminals, id } = payload;
		Promise.all(
			terminals.map((terminal) => firebase.addTerminalToLocation(terminal, id))
		)
			.then(() => {
				dispatch(
					SET_LOCATION({ entity: { ...locations.entities[id], terminals }, id })
				);
			})
			.catch((e) => dispatch(ERROR(e.message)));
	};
};
export const UPDATE_LOCATION = (payload) => {
	const { id, values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { locations } = getState();
		firebase.updateLocation(id, values).then(() => {
			dispatch(
				SET_LOCATION({ id, entity: { ...locations.entities[id], ...values } })
			);
		});
	};
};
export const UPDATE_BOARD = (payload) => {
	const { id, values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { boards } = getState();
		firebase.updateBoard(id, values).then(() =>
			dispatch(
				SET_BOARD({
					id,
					entity: {
						...boards.entities[id],
						...values,
					},
				})
			)
		);
	};
};

export const UPDATE_TERMINAL = (payload) => {
	const { id, values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { boards } = getState();
		firebase
			.updateTerminal(values, id)
			.then(() => {
				dispatch(
					SET_TERMINAL({ entity: { ...boards.entity[id], ...values }, id })
				);
			})
			.catch((e) => dispatch(ERROR(e.message)));
	};
};

export const ERROR = (payload) => {
	return { type: 'SET_ERROR', payload };
};

export const SET_ALL_LOCATIONS = (payload) => {
	return { type: 'SET_ALL_LOCATIONS', payload };
};
export const SET_ALL_TERMINALS = (payload) => {
	return { type: 'SET_ALL_TERMINALS', payload };
};
export const SET_ALL_BOARDS = (payload) => {
	return { type: 'SET_ALL_BOARDS', payload };
};
export const SET_LOCATION = (payload) => {
	return { type: 'SET_LOCATION', payload };
};
export const SET_BOARD = (payload) => {
	return { type: 'SET_BOARD', payload };
};
export const SET_TERMINAL = (payload) => {
	return { type: 'SET_TERMINAL', payload };
};
export const GET_ALL_LOCATIONS = () => {
	return (dispatch) => {
		dispatch({ type: FETCH });
		firebase.getMasterLocations().then((results) => {
			dispatch(SET_ALL_LOCATIONS(results));
		});
	};
};
export const GET_ALL_BOARDS = () => {
	return (dispatch) => {
		dispatch({ type: FETCH });
		firebase.getMasterBoards().then((results) => {
			dispatch(SET_ALL_BOARDS(results));
		});
	};
};
export const GET_ALL_TERMINALS = () => {
	return (dispatch) => {
		dispatch({ type: FETCH });
		firebase.getMasterTerminals().then((results) => {
			dispatch(SET_ALL_TERMINALS(results));
		});
	};
};
