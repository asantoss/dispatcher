import React, { useContext, createContext, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';
class LocationInterface {
	constructor(firebase, user, setStatus) {
		this.user = user;
		this.db = firebase.db;
		this.currentMaster = firebase.master;
		this.locations = [];
		this.currentLocation = null;
		this.setStatus = setStatus;
	}
	getMasterLocations = (callback) => {
		return this.db.collection(`${this.currentMaster}/locations`).onSnapshot(
			(querySnapshot) => {
				let locations = [];
				querySnapshot.forEach((doc) => {
					return locations.push({ ...doc.data(), docId: doc.id });
				});
				locations = locations.sort((a, b) => (a['name'] > b['name'] ? 1 : -1));
				callback(locations);
			},
			(error) => {
				this.setStatus('Error: ' + error.message);
			}
		);
	};
	getLocation = async (id) => {
		const location = await this.db
			.collection(`${this.currentMaster}/locations`)
			.doc(id)
			.get()
			.catch((e) => this.setStatus('Error: ' + e.message));
		if (location) {
			const locationData = { ...location.data(), docId: location.id };
			this.currentLocation = locationData;
			return locationData;
		}
	};
	createLocation = (data) => {
		return this.db
			.collection(`${this.currentMaster}/locations`)
			.doc(data.license)
			.set(data)
			.catch((e) => this.setStatus('Error: ' + e.message));
	};
	updateLocation = (id, data) => {
		return this.db
			.collection(`${this.currentMaster}/locations`)
			.doc(id)
			.update(data)
			.catch((e) => this.setStatus('Error: ' + e.message));
	};
	deleteLocation = (id) =>
		this.db
			.collection(`${this.currentMaster}/locations`)
			.doc(id)
			.delete()
			.catch((e) => this.setStatus('Error: ' + e.message));
}

export const LocationContext = createContext();

export default function LocationController({ children }) {
	const firebase = useContext(FirebaseContext);
	const user = useSelector(({ user }) => user);
	const [status, setStatus] = useState(null);
	return (
		<LocationContext.Provider
			value={[new LocationInterface(firebase, user, setStatus), setStatus]}>
			{status && <p>{status}</p>}
			{children}
		</LocationContext.Provider>
	);
}
