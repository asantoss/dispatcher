import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../Layouts/styles/Form';
import { FirebaseContext } from '../../Firebase';
import Autocomplete from '../shared/Autocomplete';
import { useConfirmModal } from '../../hooks/Modal';

// import { useHistory } from 'react-router-dom';

export default function TicketForm({ initialState, onSubmit }) {
	const firebase = useContext(FirebaseContext);
	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		setFieldValue,
	} = useFormik({
		initialValues: initialState || {
			location: '',
			terminal: '',
			message: '',
		},
		onSubmit,
	});

	const [options, setOptions] = useState([]);

	useEffect(() => {
		let active = true;
		(async () => {
			const locations = await firebase.getMasterLocations();
			if (active) {
				setOptions(locations);
			}
		})();
		return () => {
			active = false;
		};
	}, [firebase]);

	const [openModal, Modal] = useConfirmModal(() => {
		handleSubmit();
	});
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				openModal(true);
			}}>
			<div id='main_info'>
				<Autocomplete
					required
					label='Location'
					keys={['license', 'name', 'address']}
					{...{ options }}
					getLabel={(option) =>
						option?.license
							? `${option.name}/ License: ${option?.license}`
							: option.name
					}
					getSelected={(option) => setFieldValue('location', option)}
				/>
				{values?.location?.terminals && (
					<TextField
						select
						variant='outlined'
						name='terminal'
						label='Terminal'
						value={values.type}
						onChange={(e) => {
							setFieldValue(
								'terminal',
								values.location.terminals[e.target.value]
							);
						}}
						SelectProps={{
							native: true,
						}}
						onBlur={handleBlur}>
						<option aria-label='None' value=''></option>
						{values.location?.terminals?.map((terminal, i) => (
							<option key={i} value={i}>
								{terminal?.game ? terminal.game : 'No Game'} /{' '}
								{terminal?.serial}
							</option>
						))}
					</TextField>
				)}
			</div>
			<div id='secondary_info'>
				<TextField
					label='Message'
					multiline
					onChange={handleChange}
					onBlur={handleBlur}
					rows={10}
					variant='outlined'
					aria-label='message'
					placeholder='Message'
					name='message'
					value={values.message}
				/>
				<div style={{ flexBasis: '100%' }}></div>
			</div>
			<Button style={{ width: '25%' }} variant='outlined' type='submit'>
				Submit
			</Button>
			<Modal>
				<p>Are you sure you want to continue?</p>
			</Modal>
		</Form>
	);
}
