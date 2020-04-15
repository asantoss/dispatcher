import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignInWithGoogle = async () => {
		const results = await this.auth.signInWithPopup(this.googleProvider);
		this.token = results.credential.accessToken;
		const user = await this.doGetUserByEmail(results.user.email);
		if (!user) {
			throw new Error('Please check with your admin and request an account!');
		}
		return user;
	};

	doSignOut = () => this.auth.signOut();

	doPasswordReset = (email) => {
		this.auth.sendPasswordResetEmail(email);
	};
	doPasswordUpdate = (password) => {
		this.auth.currentUser.updatePassword(password);
	};

	// *** Database Api
	doGetMasterLocations = async (masterId) => {
		try {
			const mastersSnapshot = await this.db
				.collection('masters')
				.where('id', '==', masterId)
				.get();
			if (mastersSnapshot?.docs.length) {
				const master = mastersSnapshot.docs[0];
				const locations = [];
				await this.db
					.collection('masters')
					.doc(master.id)
					.collection('locations')
					.get()
					.then((docs) =>
						docs.forEach((doc) =>
							locations.push({ ...doc.data(), docId: doc.id })
						)
					);

				return locations;
			}
		} catch (e) {
			return e;
		}
	};

	user = (uid) => {
		return this.db.collection('users').doc(uid);
	};

	addUser = async (uid, payload) => {
		return await this.db
			.collection('users')
			.doc(uid)
			.set({
				...payload,
			});
	};
	doGetUserByEmail = async (email) => {
		const usersQuery = await this.db
			.collection('users')
			.where('email', '==', email)
			.get();
		if (usersQuery.docs[0]) {
			return usersQuery.docs[0].data();
		} else {
			return false;
		}
	};
	users = async () =>
		this.db
			.collection('users')
			.get()
			.then((querySnapshot) => {
				let users = [];
				querySnapshot.forEach((doc) => {
					users = [...users, doc.data()];
				});
				return users;
			});
}
export default Firebase;
