import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Components/Session';

export const AdminContext = createContext();

class AdminInterface {
	constructor(firebase, authUser) {
		this.db = firebase.db;
		this.masterId = authUser.masterId;
	}
	createUser = async (data) => {
		return await this.db
			.collection(`/masters/${this.masterId}/users`)
			.doc()
			.set({
				...data,
				masterId: this.masterId,
			});
	};
	deleteUser = (id) => {
		return this.db
			.collection(`masters/${this.masterId}/users`)
			.doc(id)
			.delete();
	};
}

export default function AdminController({ children }) {
	const firebase = useContext(FirebaseContext);
	const currentUser = useContext(AuthUserContext);
	return (
		<AdminContext.Provider value={new AdminInterface(firebase, currentUser)}>
			{children}
		</AdminContext.Provider>
	);
}
