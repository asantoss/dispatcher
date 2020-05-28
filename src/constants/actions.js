import { value as firebase } from '../index';
import { toast } from 'react-toastify';
export const FETCH = 'FETCH';

export const LOGIN = (payload) => {
	const { strategy, values } = payload;
	return async (dispatch) => {
		try {
			let user;
			if (strategy === 'GOOGLE') {
				user = await (await firebase.doSignInWithGoogle()).user;
			} else if (strategy === 'LOCAL') {
				const { email, password } = values;
				user = await firebase.doSignInWithEmailAndPassword(email, password);
			} else {
				user = values;
			}
			const { photoURL, displayName, email } = user;
			user = await firebase.getUserMaster(email);
			firebase.getMasterTicketsListener((tickets) => {
				dispatch(SET_ALL_TICKETS(tickets));
			});
			firebase.getMasterTerminalsListener((results) => {
				dispatch(SET_ALL_TERMINALS(results));
			});
			firebase.getMasterBoardsListener((results) => {
				dispatch(SET_ALL_BOARDS(results));
			});
			firebase.getMasterLocationsListener((results) => {
				dispatch(SET_ALL_LOCATIONS(results));
			});

			return dispatch({
				type: 'LOGIN',
				payload: { ...user, photoURL, displayName },
			});
		} catch (e) {
			toast.warn(e.message);
		}
	};
};
export const LOGOUT = () => {
	firebase.doSignOut();
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
			.then(() => {
				toast.success('Succesfully removed terminal ' + id);
			})
			.catch((e) => console.error(e));
	};
};
export const ADD_TERMINALS = (payload) => {
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { terminals, id } = payload;
		Promise.all(
			terminals.map((terminal) => firebase.addTerminalToLocation(terminal, id))
		)
			.then((res) => {
				res.map(() => {
					toast.success('Succesfully added terminals');
				});
			})
			.catch((e) => toast.warn('Error adding terminal'));
	};
};
export const CREATE_BOARD = (payload) => {
	const { values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		const { terminalId } = payload;
		firebase
			.addBoard(values)
			.then(() => {
				toast.success('Successfully created the board!');
				if (values.terminalId) {
					return dispatch(
						UPDATE_TERMINAL({ id: values.terminalId, entity: { terminalId } })
					);
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
};
export const CREATE_TERMINAL = (payload) => {
	const { values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		firebase
			.addTerminalToMaster(values)
			.then(() => {
				toast.success('Succesfully created the terminal');
				if (values?.boardId) {
					return firebase.updateBoard(values.boardId, {
						terminalId: values.serial,
					});
				} else {
					values.boardId = null;
				}
			})
			.catch((e) => toast.warn(e.message));
	};
};
export const CREATE_LOCATION = (payload) => {
	const { values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		firebase
			.createLocation(values)
			.then(() => {
				toast.success('Succesfully created the location.');
			})
			.catch((e) => toast.warn(e.message));
	};
};
export const UPDATE_LOCATION = (payload) => {
	const { id, values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		firebase
			.updateLocation(id, values)
			.then(() => {
				toast.success('Succesfully updated location.');
			})
			.catch((e) => toast.warn(e.message));
	};
};
export const UPDATE_BOARD = (payload) => {
	const { id, values } = payload;
	return (dispatch, getState) => {
		dispatch({ type: FETCH });
		firebase
			.updateBoard(id, values)
			.then(() => {
				toast.success('Succesfully updated board');
			})
			.catch((e) => toast.warn(e.message));
	};
};

export const UPDATE_TERMINAL = (payload) => {
	const { id, values } = payload;
	return (dispatch) => {
		dispatch({ type: FETCH });
		firebase
			.updateTerminal(values, id)
			.then(() => {
				toast.success('Succesfully updated Terminal.');
			})
			.catch((e) => {
				console.log(e);
				toast.warn(e.message);
			});
	};
};

export const UPDATE_TICKET = (payload) => {
	const { id, values } = payload;
	return (dispatch) => {
		dispatch({ type: FETCH });
		firebase.updateTicket(id, values).then(() => {
			toast.success('Succesfully updated ticket');
		});
	};
};

export const ERROR = (payload) => {
	return { type: 'SET_ERROR', payload };
};

export const SET_ALL_TICKETS = (payload) => {
	return { type: 'SET_ALL_TICKETS', payload };
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
