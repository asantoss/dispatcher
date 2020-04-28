import React, { useContext, createContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';
class LocationInterface {
	constructor(firebase, user) {
		this.user = user;
		this.db = firebase.db;
		this.locations = [];
		this.currentLocation = null;
	}
	getMasterLocations = async () => {
		const mastersSnapshot = await this.db
			.collection(`masters/${this.user.currentMaster.id}/locations`)
			.get()
			.catch((e) => {
				throw e;
			});
		if (mastersSnapshot) {
			let locations = [];
			await mastersSnapshot.forEach((doc) => {
				return locations.push({ ...doc.data(), docId: doc.id });
			});
			locations = locations.sort((a, b) => (a['name'] > b['name'] ? 1 : -1));
			return locations;
		}
	};
	getLocation = async (id) => {
		const location = await this.db
			.collection(`masters/${this.user.currentMaster.id}/locations`)
			.doc(id)
			.get()
			.catch((e) => e);
		if (location) {
			const locationData = { ...location.data(), docId: location.id };
			this.currentLocation = locationData;
			return locationData;
		}
	};
	updateLocation = (id, data) => {
		return this.db
			.collection(`masters/${this.user.currentMaster.id}/locations`)
			.doc(id)
			.update(data);
	};
	deleteLocation = (id) =>
		this.db
			.collection(`masters/${this.user.currentMaster.id}/locations`)
			.doc(id)
			.delete();
}

export const LocationContext = createContext();

export default function LocationController({ children }) {
	const firebase = useContext(FirebaseContext);
	const user = useSelector(({ user }) => user);

	return (
		<LocationContext.Provider value={new LocationInterface(firebase, user)}>
			{children}
		</LocationContext.Provider>
	);
}
