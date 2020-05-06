import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useDispatch } from 'react-redux';

class Auth {
	constructor(firebase, setError) {
		this.firebase = firebase;
		this.setError = setError;
	}
	signInWithEmail = async (email, password) => {
		return this.firebase
			.doSignInWithEmailAndPassword(email, password)
			.catch((e) => {
				throw e;
			});
	};
	signInWithGoogle = () => {
		return this.firebase.doSignInWithGoogle().catch((e) => {
			this.firebase.doSignOut();
			throw e;
		});
	};
}

export const AuthPageContext = createContext();

export default function AuthController({ children }) {
	const firebase = useContext(FirebaseContext);
	const dispatch = useDispatch();

	return (
		<AuthPageContext.Provider value={new Auth(firebase, dispatch)}>
			{children}
		</AuthPageContext.Provider>
	);
}
