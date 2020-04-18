import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import AuthUserContext from './context';
import * as ROLES from '../../constants/roles';

export default function ProtectedRoute({
	component: Component,
	role,
	...rest
}) {
	const authUser = useContext(AuthUserContext);
	const rolesAccess = {
		admin: ['user', 'manager', 'admi'],
		manager: ['user', 'manager'],
		user: ['user'],
	};
	// const history = useHistory();
	// useEffect(() => {
	// 	if (!authUser?.isLoggedIn) {
	// 		history.push('/signin');
	// 	}
	// }, [authUser, history]);
	return (
		<Route
			{...rest}
			render={(props) =>
				rolesAccess[role].includes(authUser?.role) ||
				authUser?.role === ROLES.ADMIN ? (
					<Component {...props} />
				) : (
					<p>You are not authorized to view this page.</p>
				)
			}
		/>
	);
}
