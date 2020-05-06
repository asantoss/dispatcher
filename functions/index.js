const functions = require('firebase-functions');
const FirebaseAdmin = require('./utils/FirebaseAdmin');

const cors = require('cors');
const { geocodeAddress } = require('./utils/googleMaps');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const admin = new FirebaseAdmin();

// const bitlyReg = /http[s][://]+([])\/([0-9a-zA-Z]+)/g;
exports.updateLocation = functions.firestore
	.document('masters/{masterId}/locations/{locationId}')
	.onUpdate(async (changes, context) => {
		const newValue = changes.after.data();
		const coordinates = newValue['coordinates'];
		const coords = await geocodeAddress(
			`${newValue.address}+${newValue.city}+${newValue.zipCode}`,
			process.env.API_KEY
		);
		const coordsURL = `https://www.google.com/maps?saddr=My+Location&daddr=${coords.lat},${coords.lng}&amp;ll`;
		if (coordinates !== coords) {
			return changes.after.ref.update({
				coordinates: coordsURL,
			});
		} else {
			return null;
		}
	});

// exports.createUser = functions.firestore
// 	.document('users/{userId}')
// 	.onCreate(async (snap, context) => {
// 		const { email, firstName, lastName, password, phoneNumber } = snap.data();
// 		const user = await admin
// 			.doCreateUser({
// 				email,
// 				displayName: firstName + ' ' + lastName,
// 				password,
// 				phoneNumber,
// 			})
// 			.catch((e) => console.log(e));
// 		if (user) {
// 			return 'Completed';
// 		} else {
// 			return await snap.ref.delete();
// 		}
// 	});

exports.deleteUserFromMaster = functions.https.onCall(async (data, context) => {
	const { id, masterId, role } = data;
	const master = admin.db.doc(`masters/${masterId}`);
	const user = await admin.db.doc(`users/${id}`).get();
	if (user) {
		await user.ref.set(
			{
				masters: FieldValue.arrayRemove({
					master,
					role,
				}),
			},
			{ merge: true }
		);
		console.log(user.data());
		return;
	}
});

exports.addUserToMaster = functions.https.onCall(async (data, context) => {
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		masterId,
		role,
		password,
	} = data;
	const master = admin.db.doc(`/masters/${masterId}`);
	const querySnapshot = await admin.db
		.collection('/users/')
		.where('email', '==', email)
		.limit(1)
		.get()
		.catch((e) => console.log(e.message));
	if (querySnapshot.docs.length && querySnapshot.docs[0].exists) {
		const user = querySnapshot.docs[0].ref;
		await user.update({
			masters: FieldValue.arrayUnion({
				master,
				role,
			}),
		});
		return 'Successfully wrote the data!';
	} else {
		console.log('Initial query failed. Checking if user exists in auth.');
		const user = await admin.auth.getUserByEmail(email);
		if (user) {
			console.log('Found user in auth executing new document');
			return await admin.db
				.collection('/users/')
				.doc()
				.set({
					firstName,
					lastName,
					masters: FieldValue.arrayUnion({ master, role }),
					email,
					phoneNumber,
				});
		} else {
			console.log('No user found creating one now.');
			const newUser = await admin.db.doCreateUser({
				email,
				displayName: firstName + ' ' + lastName,
				password,
				phoneNumber,
			});
			if (newUser) {
				console.log('created user in auth executing new document');

				return await admin.db
					.collection('/users/')
					.doc()
					.set({
						firstName,
						lastName,
						masters: FieldValue.arrayUnion({ master, role }),
						email,
						phoneNumber,
					});
			}
			return null;
		}
	}
});
