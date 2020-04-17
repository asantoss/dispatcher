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
		if (process.env.NODE_ENV === 'development') {
			this.db.settings({
				host: 'localhost:5005',
				ssl: false,
			});
		}
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = async (email, password) => {
		const authUser = await this.auth.signInWithEmailAndPassword(
			email,
			password
		);
		if (authUser) {
			const user = await this.doGetUserByEmail(email);
			return user;
		}
	};

	doSignInWithGoogle = async () => {
		const results = await this.auth.signInWithPopup(this.googleProvider);
		this.token = results.credential.accessToken;
		// const user = await this.doGetUserByEmail(results.user.email);
		// if (!user) {
		// 	throw new Error('Please check with your admin and request an account!');
		// }
		return results;
	};

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
		const usersQuery = await this.db
			.collectionGroup('users')
			.where('email', '==', email)
			.get();
		if (usersQuery.docs.length) {
			const masterId = usersQuery?.docs[0].ref.parent.parent.id;
			this.user = {
				...usersQuery.docs[0].data(),
				masterId,
				id: usersQuery.docs[0].id,
			};
			return this.user;
		} else {
			throw new Error('No user found please check with your administrator.');
		}
	};
	getUsersListener = (callback) => {
		return this.db
			.collection(`masters/${this.user.masterId}/users`)
			.onSnapshot(callback);
	};
}
export default Firebase;
