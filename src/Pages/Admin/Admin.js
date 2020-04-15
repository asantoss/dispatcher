import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useHistory } from 'react-router-dom';
import { AuthUserContext } from '../../Components/Session';
import AddUserForm from './AddUserForm';
import AdminController from './AdminController';
import User from './User';

const AdminPage = () => {
	const history = useHistory();
	const { email } = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({
		loading: false,
		users: [],
	});
	useEffect(() => {
		setState((s) => ({ ...s, loading: true }));
		const unsubscribe = firebase.getUsersListener((usersSnapshot) => {
			let users = [];
			usersSnapshot.forEach((doc) => {
				users = [...users, { ...doc.data(), id: doc.id }];
			});
			setState(() => ({ users, loading: false }));
		});
		return () => {
			unsubscribe();
		};
	}, [firebase, setState, email, history]);
	const { users, loading } = state;
	return (
		<div>
			<AdminController>
				<h1>Admin</h1>
				{loading && <div>Loading ...</div>}
				<UserList users={users} />
				<AddUserForm />
			</AdminController>
		</div>
	);
};

const UserList = ({ users }) => (
	<ul>
		{users.map((user) => (
			<User {...{ user, key: user.id }} />
		))}
	</ul>
);
export default AdminPage;
