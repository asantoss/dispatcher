const firebase_admin = require('firebase-admin');
require('dotenv').config();

// console.log(GOOGLE_APPLICATION_CREDENTIALS);
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

class FirebaseAdmin {
	constructor() {
		firebase_admin.initializeApp({
			credentials: firebase_admin.credential.applicationDefault(),
		});
		this.auth = firebase_admin.auth();
		this.db = firebase_admin.firestore();
	}
	// *** Database API

	doCreateUser = async (data) => {
		try {
			const user = await this.auth.createUser({
				...data,
			});
			if (user.uid) {
				return user;
			}
		} catch (error) {
			throw error;
		}
	};
	doDeleteUser = (email) => {
		return this.auth
			.getUserByEmail(email)
			.then((user) => this.auth.deleteUser(user.uid));
	};

	doAddUserToMaster = async (user, masterId) => {
		const recordRef = await this.db.collections('masters');
	};
}

module.exports = FirebaseAdmin;
