import React, { useContext, createContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Components/Session';
class LocationInterface {
	constructor(firebase, user) {
		this.user = user;
		this.db = firebase.db;
		this.locations = [];
	}
	getMasterLocations = async () => {
		const mastersSnapshot = await this.db
			.collection(`masters/${this.user.masterId}/locations`)
			.get()
			.catch((e) => {
				throw e;
			});
		console.log(mastersSnapshot);
		if (mastersSnapshot) {
			const locations = [];
			await mastersSnapshot.forEach((doc) =>
				locations.push({ ...doc.data(), docId: doc.id })
			);
			this.locations = locations;
			return locations;
		}

		return this.locations;
	};
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
