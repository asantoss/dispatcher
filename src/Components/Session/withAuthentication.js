import React, { useEffect, useState, useContext } from 'react';
import AuthUserContext from './context';
import { FirebaseContext } from '../../Firebase';
import { useDispatch, useSelector } from 'react-redux';

const AuthUserContextProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState(null);
	const dispatch = useDispatch();
	const { user } = useSelector((s) => s);
	useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				if (!user.isLoggedIn) {
					firebase.doGetUserByEmail(firebaseUser.email).then((response) => {
						if (response) {
							dispatch({
								type: 'LOGIN',
								payload: { ...response, isLoggedIn: true },
							});
						}
						setState({ ...response, isLoggedIn: true });
					});
				} else {
					return setState(user);
				}
			}
			return setState(null);
		});
		return () => {
			setState(null);
			firebase.auth.removeAuthTokenListener(listener);
		};
	}, [firebase, dispatch, user]);

	return (
		<AuthUserContext.Provider value={state}>
			{children}
		</AuthUserContext.Provider>
	);
};

export default AuthUserContextProvider;
