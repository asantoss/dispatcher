import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../Layouts/styles/Form';
import Autocomplete from '../shared/Autocomplete';
import { useConfirmModal } from '../../hooks/Modal';
import { useDispatch, useSelector } from 'react-redux';

// import { useHistory } from 'react-router-dom';

export default function TicketForm({ initialState, onSubmit }) {
	const dispatch = useDispatch();
	const locations = useSelector((state) => state.locations);
	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		setFieldValue,
	} = useFormik({
		initialValues: initialState || {
			locationId: '',
			terminalId: '',
			message: '',
		},
		onSubmit,
	});

	const [options, setOptions] = useState([]);

	useEffect(() => {
		setOptions(locations.ids);
	}, [dispatch, locations]);

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
					getLabel={(option) => {
						const location = locations.entities[option];
						return location?.license
							? `${location.name}/ License: ${location?.license}`
							: location.name;
					}}
					getSelected={(option) => setFieldValue('locationId', option)}
				/>
				{values.locationId && locations.entities[values.locationId]?.terminals && (
					<TextField
						select
						variant='outlined'
						name='terminal'
						label='Terminal'
						value={values.type}
						onChange={(e) => {
							setFieldValue(
								'terminal',
								locations.entities[values.locationId][e.target.value]
							);
						}}
						SelectProps={{
							native: true,
						}}
						onBlur={handleBlur}>
						<option aria-label='None' value=''></option>
						{locations.entities[values.locationId]?.terminals?.map(
							(terminal, i) => (
								<option key={i} value={i}>
									{terminal?.game ? terminal.game : 'No Game'} /{' '}
									{terminal?.serial}
								</option>
							)
						)}
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
