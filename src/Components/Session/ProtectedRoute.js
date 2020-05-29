import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import * as ROLES from '../../constants/roles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProtectedRoute({
	component: Component,
	role,
	...rest
}) {
	const user = useSelector(({ user }) => user);
	const history = useHistory();
	useEffect(() => {
		if (!user.isLoggedIn && history.location.pathname !== '/signin') {
			history.replace('/signin', {
				fromProtected: true,
				path: history.location.pathname,
			});
		}
	}, [history, user]);
	const rolesAccess = {
		manager: ['manager', 'admin'],
		user: ['user', 'manager'],
	};
	return (
		<Route
			{...rest}
			render={(props) =>
				rolesAccess[role]?.includes(user?.role) ||
				user?.role === ROLES.ADMIN ? (
					<Component {...props} />
				) : (
					<p>You are not authorized to view this page.</p>
				)
			}
		/>
	);
}
