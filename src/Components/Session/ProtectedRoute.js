import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AuthUserContext from './context';
import * as ROLES from '../../constants/roles';

export default function ProtectedRoute({
	component: Component,
	role,
	...rest
}) {
	const authUser = useContext(AuthUserContext);
	const rolesAccess = {
		manager: ['manager', 'admin'],
		user: ['user', 'manager'],
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				rolesAccess[role]?.includes(authUser?.role) ||
				authUser?.role === ROLES.ADMIN ? (
					<Component {...props} />
				) : (
					<p>You are not authorized to view this page.</p>
				)
			}
		/>
	);
}
