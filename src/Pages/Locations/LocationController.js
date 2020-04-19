import React, { useContext, createContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Components/Session';
class LocationInterface {
	constructor(firebase, user) {
		this.user = user;
		this.db = firebase.db;
		this.locations = [];
		this.currentLocation = null;
	}
	getMasterLocations = async () => {
		const mastersSnapshot = await this.db
			.collection(`masters/${this.user.masterId}/locations`)
			.get()
			.catch((e) => {
				throw e;
			});
		if (mastersSnapshot) {
			const locations = [];
			await mastersSnapshot.forEach((doc) =>
				locations.push({ ...doc.data(), docId: doc.id })
			);
			this.locations = locations.sort((a, b) =>
				a['name'] > b['name'] ? 1 : -1
			);
			return this.locations;
		}

		return this.locations;
	};
	getLocation = async (id) => {
		const location = await this.db
			.collection(`masters/${this.user.masterId}/locations`)
			.doc(id)
			.get()
			.catch((e) => e);
		if (location) {
			const locationData = { ...location.data(), docId: location.id };
			this.currentLocation = locationData;
			return locationData;
		}
	};
	updateLocation = (id, data) =>
		this.db
			.collection(`masters/${this.user.masterId}/locations`)
			.doc(id)
			.update(data);
	deleteLocation = (id) =>
		this.db
			.collection(`masters/${this.user.masterId}/locations`)
			.doc(id)
			.delete();
}

export const LocationContext = createContext();

export default function LocationController({ children }) {
	const firebase = useContext(FirebaseContext);
	const user = useContext(AuthUserContext);

	return (
		<LocationContext.Provider value={new LocationInterface(firebase, user)}>
			{children}
		</LocationContext.Provider>
	);
}
