import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		this.googleProvider = new app.auth.GoogleAuthProvider();
		this.functions = app.functions();
		// if (process.env.NODE_ENV === 'development') {
		// 	this.db.settings({
		// 		host: 'localhost:5005',
		// 		ssl: false,
		// 	});
		// 	this.functions.useFunctionsEmulator('http://localhost:5001');
		// }

		this.locationsUnsubscribe = null;
		this.ticketsUnsubscribe = null;
		this.boardsUnsubscribe = null;
		this.terminalsUnsubscribe = null;
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	doSignOut = () => {
		this.ticketsUnsubscribe();
		return this.auth.signOut();
	};

	doPasswordReset = (email) => {
		this.auth.sendPasswordResetEmail(email);
	};
	doPasswordUpdate = (password) => {
		this.auth.currentUser.updatePassword(password);
	};

	// *** Database Api

	addUser = async (id, payload) => {
		const user = await this.db.collection('users').doc(id);
		await user.set(payload);
		return (await user.get()).data();
	};
	doGetUserByEmail = async (email) => {
		if (!this?.user) {
			const usersQuery = await this.db
				.collection('users')
				.where('email', '==', email)
				.get();
			if (usersQuery.docs.length) {
				this.user = {
					...usersQuery.docs[0].data(),
					id: usersQuery.docs[0].id,
				};
			}
			return this.user;
		} else {
			throw new Error('No user found please check with your administrator.');
		}
	};

	setMaster = async (master) => {
		this.master = master.path;
	};

	getUserMaster = async (email) => {
		const usersQuery = await this.db
			.collection('users')
			.where('email', '==', email)
			.get();
		if (usersQuery.docs.length) {
			this.user = {
				...usersQuery.docs[0].data(),
				id: usersQuery.docs[0].id,
			};
			const role = this.user.master.role;
			this.master = `masters/${this.user.master.id}`;
			const master = await (await this.db.doc(this.master).get()).data();
			return { ...master, role };
		} else {
			throw new Error('No user found please check with your administrator.');
		}
	};
	getUsersListener = (callback, master) => {
		const masterRef = this.user.masters.find((e) => e.master.id === master.id)
			.master;
		return this.db
			.collection(`users/`)
			.where('masters', 'array-contains-any', [
				{
					master: masterRef,
					role: 'admin',
				},
				{
					master: masterRef,
					role: 'user',
				},
				{
					master: masterRef,
					role: 'manager',
				},
			])
			.onSnapshot(callback);
	};
	getLocation = async (id) => {
		const location = await this.db
			.collection(`${this.master}/locations`)
			.doc(id)
			.get()
			.catch((e) => e);
		if (location) {
			const locationData = { ...location.data(), id: location.id };
			return locationData;
		}
	};

	getTerminal = async (id) => {
		const terminal = await this.db
			.doc(`${this.master}/terminals/${id}`)
			.get()
			.catch((e) => e);
		if (terminal) {
			return { ...terminal.data(), id: terminal.id };
		}
	};
	getMasterTerminals = async () => {
		const terminalsSnapshot = await this.db
			.collection(this.master + '/terminals')
			.get()
			.catch((e) => e);
		if (terminalsSnapshot) {
			const terminals = {};
			const ids = [];
			await terminalsSnapshot.forEach((doc) => {
				const terminal = doc.data();
				const id = doc.id;
				terminals[id] = terminal;
				ids.push(id);
			});
			return { entities: terminals, ids };
		}
	};
	getMasterLocations = async () => {
		const locationsSnapshot = await this.db
			.collection(this.master + '/locations')
			.get()
			.catch((e) => e);
		if (locationsSnapshot) {
			const entities = {};
			const ids = [];
			await locationsSnapshot.forEach((doc) => {
				const location = doc.data();
				entities[doc.id] = location;
				ids.push(doc.id);
			});
			return { entities, ids };
		}
	};
	getMasterFreeTerminals = async () => {
		const terminalsSnapshot = await this.db
			.collection(this.master + '/terminals')
			.where('boardId', '==', null)
			.get()
			.catch((e) => e);
		if (terminalsSnapshot) {
			const terminals = [];
			await terminalsSnapshot.forEach((doc) => {
				const terminal = doc.data();
				terminals.push({ ...terminal, id: doc.id });
			});
			return terminals;
		}
	};

	getMasterTerminalsListener = (callback) => {
		if (!this.terminalsUnsubscribe) {
			this.terminalsUnsubscribe = this.db
				.collection(this.master + '/terminals')
				.onSnapshot((querySnapshot) => {
					let entities = {};
					let ids = [];
					querySnapshot.forEach((doc) => {
						entities[doc.id] = doc.data();
						ids.push(doc.id);
					});
					callback({ entities, ids });
				});
		} else {
			this.terminalsUnsubscribe();
			this.terminalsUnsubscribe = null;
			return this.getMasterTerminalsListener(callback);
		}
	};
	getMasterTicketsListener = (callBack) => {
		if (!this.ticketsUnsubscribe) {
			this.ticketsUnsubscribe = this.db
				.collection(this.master + '/tickets')
				.onSnapshot((querySnapshot) => {
					const entities = {};
					const ids = [];
					querySnapshot.forEach((doc) => {
						entities[doc.id] = doc.data();
						ids.push(doc.id);
					});
					callBack({ entities, ids });
				});
		} else {
			this.ticketsUnsubscribe();
			this.ticketsUnsubscribe = null;
			return this.getMasterTicketsListener(callBack);
		}
	};

	getMasterBoardsListener = (callback) => {
		if (!this.boardsUnsubscribe) {
			this.boardsUnsubscribe = this.db
				.collection(this.master + '/boards')
				.onSnapshot((querySnapshot) => {
					let entities = {};
					let ids = [];
					querySnapshot.forEach((doc) => {
						entities[doc.id] = doc.data();
						ids.push(doc.id);
					});
					callback({ entities, ids });
				});
		} else {
			this.boardsUnsubscribe();
			this.boardsUnsubscribe = null;
			this.getMasterBoardsListener(callback);
		}
	};

	getMasterBoards = async () => {
		const boardsSnapshot = await this.db
			.collection(this.master + '/boards')
			.get()
			.catch((e) => e);
		if (boardsSnapshot) {
			const boards = {};
			const ids = [];
			await boardsSnapshot.forEach((doc) => {
				const { terminal, ...board } = doc.data();
				const id = doc.id;
				boards[id] = board;
				ids.push(id);
			});
			return { entities: boards, ids };
		}
	};

	getMasterFreeBoards = async () => {
		const boardsSnapshot = await this.db
			.collection(this.master + '/boards')
			.where('terminalId', '==', null)
			.get()
			.catch((e) => e);
		if (boardsSnapshot) {
			const boards = [];
			await boardsSnapshot.forEach((doc) => {
				const { terminal, ...board } = doc.data();
				boards.push({
					...board,
					id: doc.id,
				});
			});
			return boards;
		}
	};

	getBoard = async (id) => {
		const board = await this.db
			.doc(`${this.master}/boards/${id}`)
			.get()
			.catch((e) => e);
		if (board) {
			return {
				...board.data(),
				id: board.id,
			};
		}
	};

	updateBoard = async (id, boardInfo) => {
		const board = await this.db
			.doc(`${this.master}/boards/${id}`)
			.get()
			.catch((e) => e);
		if (board) {
			return board.ref.update(boardInfo);
		}
	};

	addBoard = async (boardInfo) => {
		const boardRef = await this.db
			.collection(`${this.master}/boards`)
			.doc(boardInfo.refrence)
			.get();

		if (boardRef.exists) {
			console.log('Board already exists');
			throw new Error('Board already exists');
		} else {
			return boardRef.ref.set(boardInfo);
		}
	};

	addTicket = async (ticketInfo) => {
		const ticketRef = await this.db.collection(`${this.master}/tickets`).add({
			...ticketInfo,
			completed: false,
			created: Date.now().toString(),
		});
		return ticketRef;
	};

	addTerminalToLocation = async (terminal, locationId) => {
		// The location id is pass to the terminal.
		await this.db.doc(`${this.master}/terminals/${terminal}`).update({
			locationId,
		});
		//The terminals serial number is passed into the relationship to the location
		return this.db.doc(`${this.master}/locations/${locationId}`).update({
			terminals: app.firestore.FieldValue.arrayUnion(terminal),
		});
	};

	addTerminalToMaster = async (values, locationId) => {
		const terminalDoc = await this.db
			.collection(`${this.master}/terminals`)
			.doc(values.serial)
			.get();
		if (terminalDoc.exists) {
			throw new Error('Terminal already exists');
		} else {
			if (locationId) {
				await this.db.doc(`${this.master}/locations/${locationId}`).update({
					terminals: app.firestore.FieldValue.arrayUnion({
						...values,
						locationId,
						id: terminalDoc.id,
					}),
				});
			}
			await terminalDoc.ref.set({ ...values });
			return terminalDoc.ref;
		}
	};
	updateTicket = (id, data) => {
		if (data?.complete) {
			data.completedAt = Date.now().toString();
		}
		return this.db.doc(`${this.master}/tickets/${id}`).update(data);
	};
	removeTicket = (id) => {
		return this.db.doc(`${this.master}/tickets/${id}`).delete();
	};
	updateTerminal = async (values, id) => {
		const terminalDoc = await this.db
			.collection(`${this.master}/terminals`)
			.doc(id);
		// const currentData = await (await terminalDoc.get()).data();
		// if (currentData.boardId && !values.boardId) {
		// 	await this.updateBoard(currentData.boardId, { terminalId: null });
		// }
		return await terminalDoc.update(values);
	};
	removeTerminalFromLocation = async (terminal, location, id) => {
		const locationDoc = await this.db.doc(`${this.master}/locations/${id}`);
		const terminals = location.terminals.filter((e) => e !== terminal.serial);
		await locationDoc.update({
			terminals,
		});
		return this.db
			.doc(`${this.master}/terminals/${terminal.serial}`)
			.update({ locationId: null })
			.then(() => {
				return terminals;
			});
	};
	addUserToMaster = async (values, masterId) => {
		const addUser = await this.functions.httpsCallable('addUserToMaster');
		return addUser({
			...values,
			masterId,
		});
	};
	deleteUserFromMaster = async (id, role, masterId) => {
		const deleteUser = await this.functions.httpsCallable(
			'deleteUserFromMaster'
		);
		return deleteUser({
			id,
			role,
			masterId,
		});
	};

	// *** Locations logic
	getMasterLocationsListener = (callback) => {
		if (!this.locationsUnsubscribe) {
			this.locationsUnsubscribe = this.db
				.collection(`${this.master}/locations`)
				.onSnapshot((querySnapshot) => {
					let entities = {};
					let ids = [];
					querySnapshot.forEach((doc) => {
						entities[doc.id] = doc.data();
						ids.push(doc.id);
					});
					callback({ entities, ids });
				});
		} else {
			this.locationsUnsubscribe();
			this.locationsUnsubscribe = null;
			this.getMasterLocationsListener(callback);
		}
	};
	getLocation = async (id) => {
		const location = await this.db
			.collection(`${this.master}/locations`)
			.doc(id)
			.get()
			.catch((e) => alert('Error:' + e.message));
		if (location) {
			const locationData = { ...location.data(), id: location.id };
			this.currentLocation = locationData;
			return locationData;
		}
	};
	createLocation = async (data) => {
		const newItem = await this.db
			.collection(`${this.master}/locations`)
			.doc(data.license)
			.get();
		if (newItem.exists) {
			throw new Error(
				'Item already exists with this license alread exists! \n License: ' +
					data.license
			);
		}
		return newItem.ref.set(data).catch((e) => alert('Error: ' + e.message));
	};
	updateLocation = (id, data) => {
		return this.db
			.collection(`${this.master}/locations`)
			.doc(id)
			.update(data)
			.catch((e) => alert('Error: ' + e.message));
	};
	deleteLocation = (id) =>
		this.db
			.collection(`${this.master}/locations`)
			.doc(id)
			.delete()
			.catch((e) => alert('Error: ' + e.message));
}
export default Firebase;
