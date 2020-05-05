import React, { useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../shared/styles/Form.js';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

export default function TerminalForm({ initialState, location }) {
	const { currentMaster } = useSelector(({ user }) => user);
	const firebase = useContext(FirebaseContext);
	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		resetForm,
	} = useFormik({
		initialValues: initialState || {
			game: '',
			location: '',
			monitor: ``,
			type: '',
			billAcceptor: '',
			serial: '',
		},
		onSubmit: (values) => {
			const locationRef = location?.docId ?? null;
			const docId = initialState?.docId ?? null;
			if (docId) {
				debugger;
				return firebase.updateTerminal(values, docId).then(() => {
					alert('Success');
				});
			}
			return firebase
				.addTerminalToMaster(
					{ ...values, locationId: location?.docId },
					locationRef
				)
				.then(() => {
					resetForm();
					alert('Success!');
				});
		},
	});
	return (
		<Form onSubmit={handleSubmit}>
			<TextField
				style={{ flexGrow: 3 }}
				required
				variant='outlined'
				name='game'
				label='Game'
				value={values.game}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 1 }}
				required
				variant='outlined'
				value={values.monitor}
				name='monitor'
				label='Monitor'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 2 }}
				required
				variant='outlined'
				name='billAcceptor'
				value={values.billAcceptor}
				label='Bill Acceptor'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 2 }}
				variant='outlined'
				value={values.serial}
				name='serial'
				label='Serial No.'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 3 }}
				select
				variant='outlined'
				required
				name='type'
				label='Type'
				value={values.type}
				onChange={handleChange}
				SelectProps={{
					native: true,
				}}
				onBlur={handleBlur}>
				<option aria-label='None' value=''></option>
				{currentMaster?.cabinetTypes.map((type, i) => (
					<option key={i} value={type}>
						{type}
					</option>
				))}
			</TextField>
			<div style={{ flexBasis: '100%' }}></div>
			<Button style={{ width: '25%' }} variant='outlined' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
