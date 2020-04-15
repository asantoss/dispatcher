const functions = require('firebase-functions');
const FirebaseAdmin = require('./utils/FirebaseAdmin');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = new FirebaseAdmin();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: 'utf8',
	})
);

app.post('/user', (req, res) => {
	const { user } = req.body;
	admin
		.doCreateUser(user)
		.then((data) => res.send(data))
		.catch((e) => res.status(400).send(e.message));
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUser = functions.firestore
	.document('masters/{masterId}/users/{userId}')
	.onCreate(async (snap, context) => {
		const { email, firstName, lastName, password, role } = snap.data();
		const user = await admin
			.doCreateUser({
				email,
				displayName: firstName + ' ' + lastName,
				password,
			})
			.catch((e) => console.log(e));
		if (user) {
			return await snap.ref.update({
				email,
				firstName,
				lastName,
				role,
				authId: user.uid,
				password: admin.db.FieldValue.delete(),
			});
		} else {
			return await snap.ref.delete();
		}
	});
exports.deleteUser = functions.firestore
	.document('masters/{masterId}/users/{userId}')
	.onDelete((snap, context) => {
		const { authId } = snap.data();
		return admin.doDeleteUser(authId).catch((e) => console.log(e));
	});

exports.server = functions.https.onRequest(app);
