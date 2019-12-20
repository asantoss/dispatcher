import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const prodConfig = {
	apiKey: process.env.REACT_APP_PROD_API_KEY,
	authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
	projectId: process.env.REACT_APP_PROD_PROJECT_ID,
	storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
};
const devConfig = {
	apiKey: process.env.REACT_APP_DEV_API_KEY,
	authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
	projectId: process.env.REACT_APP_DEV_PROJECT_ID,
	storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
};
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
console.log(config);
class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);
	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);
	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

	// *** Database Api
	user = uid => {
		return this.db.collection('users').doc(uid);
	};

	addUser = async (uid, payload) => {
		return this.user(uid).set({
			...payload
		});
	};
	getUser = async uid => {
		const docData = await this.user(uid).get();
		return docData.data();
	};
	users = async () =>
		this.db
			.collection('users')
			.get()
			.then(querySnapshot => {
				let users = [];
				querySnapshot.forEach(doc => {
					users = [...users, doc.data()];
				});
				return users;
			});
}
export default Firebase;
