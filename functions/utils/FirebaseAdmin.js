const firebase_admin = require('firebase-admin');
const GOOGLE_APLICATION_CREDENTIALS =
	process.env.NODE_ENV === 'development'
		? require(process.env.GOOGLE_APLICATION_CREDENTIALS)
		: firebase_admin.credential.applicationDefault();
require('dotenv').config();

class FirebaseAdmin {
	constructor() {
		firebase_admin.initializeApp({
			credentials: GOOGLE_APLICATION_CREDENTIALS,
		});
		this.auth = firebase_admin.auth();
		this.db = firebase_admin.firestore();
	}
	// *** Database API

	doCreateUser(data) {
		return this.auth.createUser(data).catch((e) => console.error(e));
	}
	doDeleteUser(email) {
		return this.auth
			.getUserByEmail(email)
			.then((user) => this.auth.deleteUser(user.uid));
	}
}

module.exports = FirebaseAdmin;
