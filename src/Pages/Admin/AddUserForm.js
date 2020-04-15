import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { AdminContext } from './AdminController';
export default function AddUserForm() {
	const [error, setError] = useState(null);
	const Admin = useContext(AdminContext);

	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			role: 'user',
		},
		onSubmit: (values) => {
			Admin.createUser(values)
				.then((results) => {
					console.log(results);
				})
				.catch((e) => {
					setError(e.message);
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
