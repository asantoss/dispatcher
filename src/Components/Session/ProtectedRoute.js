import React from 'react';
import { Route } from 'react-router-dom';
import * as ROLES from '../../constants/roles';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({
	component: Component,
	role,
	...rest
}) {
	const user = useSelector(({ user }) => user);
	const rolesAccess = {
		manager: ['manager', 'admin'],
		user: ['user', 'manager'],
	};
	return (
		<Route
			{...rest}
			render={(props) =>
				rolesAccess[role]?.includes(user?.currentMaster?.role) ||
				user?.currentMaster?.role === ROLES.ADMIN ? (
					<Component {...props} />
				) : (
					<p>You are not authorized to view this page.</p>
				)
			}
		/>
	);
}
