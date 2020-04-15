import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useHistory } from 'react-router-dom';
import { AuthUserContext } from '../../Components/Session';
import AddUserForm from './AddUserForm';

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
		firebase.users().then((users) => {
			setState({
				users,
				loading: false,
			});
		});
	}, [firebase, setState, email, history]);
	const { users, loading } = state;
	return (
		<div>
			<h1>Admin</h1>
			{loading && <div>Loading ...</div>}
			<UserList users={users} />
			<AddUserForm />
		</div>
	);
};

const UserList = ({ users }) => (
	<ul>
		{users.map((user) => (
			<li key={user.uid}>
				<span>
					<strong>ID:</strong> {user.uid}
				</span>
				<span>
					<strong>E-Mail:</strong> {user.email}
				</span>
				<span>
					<strong>Username:</strong> {user.username}
				</span>
				<span>
					<strong>Role:</strong> {user.role}
				</span>
			</li>
		))}
	</ul>
);
export default AdminPage;
