import { value as firebase } from '../index';
import { toast } from 'react-toastify';
export const FETCH = 'FETCH';

export const LOGIN = (payload) => {
	const { strategy, values } = payload;
	return async (dispatch, getState) => {
		try {
			const { locations, terminals, boards } = getState();
			let user;
			if (strategy === 'GOOGLE') {
				user = await (await firebase.doSignInWithGoogle()).user;
			} else if (strategy === 'LOCAL') {
				const { email, password } = values;
				user = (await firebase.doSignInWithEmailAndPassword(email, password))
					.user;
			} else {
				user = values;
			}
			const { photoURL, displayName, email } = user;
			user = await firebase.getUserMaster(email);
			firebase.getMasterTicketsListener((tickets) => {
				dispatch(SET_ALL_TICKETS(tickets));
			});
			if (!locations.ids.length) {
				dispatch(GET_ALL_LOCATIONS());
			}
			if (!terminals.ids.length) {
				dispatch(GET_ALL_TERMINALS());
			}
			if (!boards.ids.length) {
				dispatch(GET_ALL_BOARDS());
			}

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
		const { locations } = getState();
		const location = locations.entities[id];
		firebase
			.removeTerminalFromLocation(terminal, location, id)
			.then(() => {
				const terminals = location.terminals.filter(
					(e) => e !== terminal.serial
				);
				dispatch(
					SET_LOCATION({
						id,
						entity: {
							terminals,
						},
					})
				);
				dispatch(SET_TERMINAL({ id: terminal, entity: { locationId: null } }));
			})
			.then(() => {
				toast.success('Succesfully removed terminal ' + terminal.serial);
			})
			.catch((e) => console.error(e));
	};
};
export const ADD_TERMINALS = (payload) => {
	return (dispatch) => {
		const { terminals, id } = payload;
		Promise.all(
			terminals.map((terminal) => firebase.addTerminalToLocation(terminal, id))
		)
			.then(() => {
				dispatch(
					SET_LOCATION({
						id,
						entity: {
							terminals,
						},
					})
				);
				return terminals.forEach((terminal) => {
					dispatch(
						SET_TERMINAL({ id: terminal, entity: { locationId: null } })
					);
				});
			})
			.then(() => {
				terminals.forEach((terminal) => {
					toast.success(
						`Succesfully added terminal ${terminal} to location ${id}.`
					);
				});
			})
			.catch((e) => toast.warn('Error adding terminal'));
	};
};

export const CREATE_USER = (payload) => {
	const { master, user } = payload;
	return async (dispatch) => {
		const { username, email, passwordOne } = user;
		const masterDoc = await firebase.db.collection('masters').doc();
		await masterDoc.set(master);
		const authUser = await firebase.doCreateUserWithEmailAndPassword(
			email,
			passwordOne
		);
		const userDoc = await firebase.addUser(authUser.user.uid, {
			username,
			email,
			master: { id: masterDoc.id, role: 'admin' },
		});

		dispatch(LOGIN({ values: { ...userDoc } }));
	};
};

export const CREATE_TICKET = (payload) => {
	const { values } = payload;
	return (dispatch) => {
		firebase
			.addTicket(values)
			.then(() => {
				toast.success('Successfully added a ticket!');
			})
			.catch((e) => {
				toast.warn("Couldn't create Ticket");
			});
	};
};
export const CREATE_BOARD = (payload) => {
	const { values } = payload;
	return (dispatch) => {
		const { terminalId } = payload;
		firebase
			.addBoard(values)
			.then(() => dispatch(GET_ALL_BOARDS()))
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
		firebase
			.addTerminalToMaster(values)
			.then(() => dispatch(GET_ALL_TERMINALS()))
			.then(() => {
				toast.success('Succesfully created the terminal');
				if (values?.boardId) {
					return firebase
						.updateBoard(values.boardId, {
							terminalId: values.serial,
						})
						.then(() =>
							dispatch({
								id: values.boardId,
								values: { terminalId: values.serial },
							})
						);
				} else {
					values.boardId = null;
				}
			})
			.catch((e) => toast.warn(e.message));
	};
};
export const CREATE_LOCATION = (payload) => {
	const { values } = payload;
	return (dispatch) => {
		firebase
			.createLocation(values)
			.then(() => {
				dispatch(GET_ALL_LOCATIONS());
				if (values?.terminals?.length) {
					values.terminals.forEach((terminal) => {
						dispatch(
							SET_BOARD({
								id: terminal,
								values: { locationId: values.license },
							})
						);
					});
				}
			})
			.then(() => {
				toast.success(`Succesfully created the location ${values.license}.`);
			})
			.catch((e) => toast.warn(e.message));
	};
};
export const UPDATE_LOCATION = (payload) => {
	const { id, values } = payload;
	return (dispatch) => {
		firebase
			.updateLocation(id, values)
			.then(() => dispatch(SET_LOCATION({ id, entity: values })))
			.then(() => {
				toast.success(`Succesfully updated location ${id}.`);
			})
			.catch((e) => toast.warn(e.message));
	};
};
export const UPDATE_BOARD = (payload) => {
	const { id, values } = payload;
	return (dispatch, getState) => {
		return firebase
			.updateBoard(id, values)
			.then(() => dispatch(SET_BOARD({ id, entity: values })))
			.then(() => {
				toast.success('Succesfully updated board');
			})
			.catch((e) => toast.warn(e.message));
	};
};

export const UPDATE_TERMINAL = (payload) => {
	const { id, values } = payload;
	return (dispatch) => {
		firebase
			.updateTerminal(values, id)
			.then(() => dispatch(SET_TERMINAL({ id, entity: values })))
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
		firebase.updateTicket(id, values).then(() => {
			toast.success('Succesfully updated ticket');
		});
	};
};
export const REMOVE_TICKET = (payload) => {
	const { id } = payload;
	return (dispatch) => {
		firebase.removeTicket(id).then(() => {
			toast.success('Succesfully deleted ticket ' + id);
		});
	};
};

export const REMOVE_ITEM = (payload) => {
	const { id, collection } = payload;
	return (dispatch) => {
		firebase.db
			.doc(`${firebase.master}${collection}/${id}`)
			.get()
			.then((element) => {
				if (element.exists) {
					return element.ref.delete();
				}
			})
			.then(() => {
				if (collection === '/locations') {
					dispatch(GET_ALL_LOCATIONS());
				}
				if (collection === '/terminals') {
					dispatch(GET_ALL_TERMINALS());
				}
				if (collection === '/boards') {
					dispatch(GET_ALL_BOARDS());
				}
				return toast.success('Sucessfully deleted item.');
			})
			.catch((e) => alert('Error ' + e.message));
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
