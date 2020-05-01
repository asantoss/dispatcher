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
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = (email) => {
		this.auth.sendPasswordResetEmail(email);
	};
	doPasswordUpdate = (password) => {
		this.auth.currentUser.updatePassword(password);
	};

	// *** Database Api

	getUser = (uid) => {
		return this.db
			.collection(`/master/${this.user.masterId}/users`)
			.doc(uid)
			.get();
	};

	addUser = async (id, payload) => {
		return await this.db
			.collection('users')
			.doc(id)
			.set({
				...payload,
			});
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
		this.currentMaster = master.path;
	};

	getUserMasters = async (email) => {
		const usersQuery = await this.db
			.collection('users')
			.where('email', '==', email)
			.get();
		if (usersQuery.docs.length) {
			this.user = {
				...usersQuery.docs[0].data(),
				id: usersQuery.docs[0].id,
			};
			this.masters = await Promise.all(
				this.user.masters.map(async ({ master, role }) => {
					const { path, id } = master;
					master = await (await this.db.doc(master.path).get()).data();
					return { master: { ...master, path, id }, role };
				})
			);
			return this.masters;
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
			.collection(`${this.currentMaster}/locations`)
			.doc(id)
			.get()
			.catch((e) => e);
		if (location) {
			const locationData = { ...location.data(), docId: location.id };
			return locationData;
		}
	};

	getTerminal = async (id) => {
		const terminal = await this.db
			.doc(`${this.currentMaster}/terminals/${id}`)
			.get()
			.catch((e) => e);
		if (terminal) {
			return { ...terminal.data(), docId: terminal.id };
		}
	};
	getMasterTerminals = async (masterPath) => {
		const terminalsSnapshot = await this.db
			.collection(masterPath + '/terminals')
			.get()
			.catch((e) => e);
		if (terminalsSnapshot) {
			const terminals = [];
			await terminalsSnapshot.forEach((doc) => {
				const terminal = doc.data();
				terminals.push({ ...terminal, docId: doc.id });
			});
			return terminals;
		}
	};
	getMasterBoards = async (masterPath) => {
		const boardsSnapshot = await this.db
			.collection(masterPath + '/boards')
			.get()
			.catch((e) => e);
		if (boardsSnapshot) {
			const boards = [];
			await boardsSnapshot.forEach((doc) => {
				const { terminal, ...board } = doc.data();
				boards.push({
					...board,
					terminal: { id: terminal.id, path: terminal.path },
					docId: doc.id,
				});
			});
			return boards;
		}
	};
	addTerminalToLocation = async (terminal, locationId) => {
		await this.db
			.doc(`${this.currentMaster}/terminals/${terminal.docId}`)
			.update({
				locationId: locationId,
			});
		return this.db.doc(`${this.currentMaster}/locations/${locationId}`).update({
			terminals: app.firestore.FieldValue.arrayUnion({
				...terminal,
				locationId,
			}),
		});
	};
	addTerminalToMaster = async (values, locationId, docId) => {
		const terminalDoc = await this.db
			.collection(`${this.currentMaster}/terminals`)
			.doc();
		await terminalDoc.set({ ...values, locationId });
		if (locationId) {
			return this.db
				.doc(`${this.currentMaster}/locations/${locationId}`)
				.update({
					terminals: app.firestore.FieldValue.arrayUnion({
						...values,
						locationId,
						docId: terminalDoc.id,
					}),
				});
		}
	};
	updateTerminal = async (values, docId) => {
		const terminalDoc = await this.db
			.collection(`${this.currentMaster}/terminals`)
			.doc(docId);
		return await terminalDoc.update(values);
	};
	removeTerminalFromLocation = async (terminal, location) => {
		const locationDoc = await this.db.doc(
			`${this.currentMaster}/locations/${location.docId}`
		);

		const terminals = location.terminals.filter(
			(e) => e.docId !== terminal.docId
		);
		await locationDoc.update({
			terminals,
		});
		return this.db
			.doc(`${this.currentMaster}/terminals/${terminal.docId}`)
			.update({ locationId: null })
			.then(() => {
				return terminals;
			});
	};
	addUserToMaster = async (values, masterId) => {
		const addUser = await this.functions.httpsCallable('addUserToMaster');
		debugger;
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
}
export default Firebase;
