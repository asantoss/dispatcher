const functions = require('firebase-functions');
const FirebaseAdmin = require('./utils/FirebaseAdmin');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { Client } = require('@googlemaps/google-maps-services-js');

const app = express();
const admin = new FirebaseAdmin();

const mapsClient = new Client({
	key: process.env.API_KEY,
});

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

exports.updateLocation = functions.firestore
	.document('masters/{masterId}/locations/{locationId}')
	.onUpdate(async (changes, context) => {
		const newValue = changes.after.data();
		const previousValues = changes.before.data();
		const coordinates = newValue['coordinate'];
		if (coordinates === previousValues['coordinates']) {
			return null;
		}
		const response = await mapsClient.geocode({
			params: { address: newValue.address },
		});

		if (response.data.results.length) {
			const coords = response.data.results['geometry']['location'];
			if (coords) {
				change.after.ref.set({
					coordinates: coords,
				});
			}
		}
	});

exports.updateUser = functions.firestore
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
			return 'Completed';
		} else {
			return await snap.ref.delete();
		}
	});
exports.deleteUser = functions.firestore
	.document('masters/{masterId}/users/{userId}')
	.onDelete((snap, context) => {
		const { email } = snap.data();
		return admin.doDeleteUser(email).catch((e) => console.log(e));
	});

exports.server = functions.https.onRequest(app);
