import React, { useEffect, useState, useContext } from 'react';
import AuthUserContext from './context';
import { FirebaseContext } from '../../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from '../../constants/actions';
import { useHistory } from 'react-router-dom';

const AuthUserContextProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({ isLoggedIn: false });
	const dispatch = useDispatch();
	const history = useHistory();
	const { user } = useSelector((s) => s);
	useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				if (!user.isLoggedIn) {
					const { displayName, email, photoURL } = firebaseUser;
					setState((s) => ({ ...s, isLoggedIn: true }));
					firebase
						.getUserMaster(email)
						.then((res) => {
							dispatch(
								ACTIONS.LOGIN({
									photoURL,
									displayName,
									email,
									currentMaster: res,
								})
							);
							if (history.location.state?.fromProtected) {
								history.replace(
									history.location.state.path,
									history.location.state
								);
							} else {
								history.replace('/home');
							}
						})
						.catch((e) => {
							console.log('No user found in this session signing out.', e);
						});
				}
			}
		});
		if (!user.isLoggedIn && history.location.pathname !== '/signin') {
			history.replace('/signin', {
				fromProtected: true,
				path: history.location.pathname,
			});
		}
		return () => {
			setState({ isLoggedIn: false });
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
