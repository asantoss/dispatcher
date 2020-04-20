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
