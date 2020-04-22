import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddUserForm from './AddUserForm';
import User from './User';

const AdminPage = () => {
	const history = useHistory();
	const { currentMaster } = useSelector(({ user }) => user);
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
				const { masters, ...userData } = doc.data();
				const idx = masters.findIndex((e) => e.master?.id === currentMaster.id);
				users = [
					...users,
					{ ...userData, id: doc.id, role: masters[idx].role },
				];
			});
			setState(() => ({ users, loading: false }));
		}, currentMaster);
		return () => {
			unsubscribe();
		};
	}, [firebase, setState, history, currentMaster]);
	const { users, loading } = state;
	return (
		<div>
			<h1>Admin</h1>
			{loading && <div className='spinner' />}
			<UserList {...{ users, setState }} />
			<AddUserForm />
		</div>
	);
};

const UserList = ({ users, setState }) => (
	<ul>
		{users.map((user) => (
			<User {...{ user, key: user.id, setState }} />
		))}
	</ul>
);
export default AdminPage;
