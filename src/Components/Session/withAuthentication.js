import React, { useEffect, useState, useContext } from 'react';
import AuthUserContext from './context';
import { FirebaseContext } from '../../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from '../../constants/actions';
import { useHistory } from 'react-router-dom';

const AuthUserContextProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({ isLoggedIn: false, masterId: null });
	const dispatch = useDispatch();
	const history = useHistory();
	const { user } = useSelector((s) => s);
	useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				if (!user.isLoggedIn) {
					const { displayName, email, photoURL } = firebaseUser;
					dispatch(
						ACTIONS.LOGIN({
							photoURL,
							displayName,
							email,
							currentMaster: null,
						})
					);
					firebase
						.getUserMasters(email)
						.then((res) => {
							dispatch(ACTIONS.SET_USER_MASTERS(res));
						})
						.catch((e) => {
							console.log('No user found in this session signing out.', e);
							// dispatch(ACTIONS.LOGOUT());
							// firebase.doSignOut();
						});
				}
			}
		});
		if (!user.isLoggedIn) {
			history.push('/signin');
		}
		return () => {
			setState(null);
			firebase.auth.removeAuthTokenListener(listener);
		};
	}, [firebase, dispatch, user, history]);

	return (
		<AuthUserContext.Provider value={state}>
			{children}
		</AuthUserContext.Provider>
	);
};

export default AuthUserContextProvider;
