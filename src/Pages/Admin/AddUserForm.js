import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';
export default function AddUserForm() {
	const [error, setError] = useState(null);
	const Admin = useContext(FirebaseContext);
	const { currentMaster } = useSelector(({ user }) => user);
	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			phoneNumber: '',
			role: 'user',
		},
		onSubmit: (values) => {
			return Admin.addUserToMaster(values, currentMaster.id);
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
				<label htmlFor='phoneNumber'>Phone Number</label>
				<input
					required
					type='tel'
					name='phoneNumber'
					id='phoneNumber'
					onChange={formik.handleChange}
					value={formik.values.phoneNumber}
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
