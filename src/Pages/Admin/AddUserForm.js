import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Components/Session';

export default function AddUserForm() {
	const [error, setError] = useState(null);
	const currentUser = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			role: 'user',
		},
		onSubmit: (values) => {
			firebase
				.doCreateUserWithEmailAndPassword(values.email, values.password)
				.then((authUser) => {
					// Create a user in your Firebase realtime database
					if (authUser) {
						return this.props.firebase.addUser(authUser.user.uid, {
							...values,
							master: currentUser.master,
						});
					}
				})
				.catch((e) => {
					setError("Sorry, couldn't create this user. Code: " + e.message);
				});
		},
	});
	return (
		<>
			{error && <p>{error}</p>}
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='Email'>Email</label>
				<input
					required
					type='email'
					name='email'
					id=''
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<label htmlFor='firstName'>First Name</label>
				<input
					required
					type='text'
					name='firstName'
					id='firstName'
					onChange={formik.handleChange}
					value={formik.values.firstName}
				/>
				<label htmlFor='lastName'>Last Name</label>
				<input
					required
					type='text'
					name='lastName'
					id='lastName'
					onChange={formik.handleChange}
					value={formik.values.lastName}
				/>
				<label htmlFor='password'>Password</label>
				<input
					required
					type='password'
					name='password'
					id='password'
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<label htmlFor='role'>Role</label>
				<select
					required
					name='role'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.role}>
					<option value='admin'>Admin</option>
					<option value='user'>User</option>
					<option value='manager'>Manager</option>
				</select>
				<br />
				<button type='submit'>Submit</button>
			</form>
		</>
	);
}
