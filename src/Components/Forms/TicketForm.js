import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../Layouts/styles/Form';
import { FirebaseContext } from '../../Firebase';
import { Autocomplete } from '@material-ui/lab';
import { useConfirmModal } from '../../hooks/Modal';

// import { useHistory } from 'react-router-dom';

export default function TicketForm({
	initialState,
	location,
	isNew,
	setStatus,
}) {
	const firebase = useContext(FirebaseContext);

	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues: initialState || {
			location: '',
			terminal: '',
			message: '',
		},
		onSubmit: async (values) => {
			debugger;
			values.terminal = values?.location?.terminals[values?.terminal] ?? null;
			return firebase
				.addTicket(values)
				.then((res) => {
					console.log(res);
					setStatus(
						'Success created a new ticket for: ' + values?.location?.name
					);
				})
				.catch((e) => {
					resetForm();
					setStatus('Error: ' + e.message);
				});
		},
	});
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		if (!loading) {
			return undefined;
		}
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
	}, [loading, firebase]);

	const [openModal, Modal] = useConfirmModal(() => {
		handleSubmit();
	});
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				openModal(true);
			}}>
			<Autocomplete
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				defaultValue={initialState?.board ?? undefined}
				getOptionSelected={(option, value) => option.game === value.game}
				getOptionLabel={(option) =>
					option?.license
						? `${option.name}/ License: ${option?.license}`
						: option.name
				}
				options={options}
				onChange={(e) => {
					debugger;
					setFieldValue('location', options[e.target.value]);
				}}
				loading={loading}
				renderInput={(params) => (
					<TextField
						required
						{...params}
						label='Location'
						variant='outlined'
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{loading && <CircularProgress color='inherit' size={20} />}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
			/>

			<TextField
				style={{ flexGrow: 3 }}
				select
				variant='outlined'
				name='terminal'
				label='Terminal'
				value={values.type}
				onChange={handleChange}
				SelectProps={{
					native: true,
				}}
				onBlur={handleBlur}>
				<option aria-label='None' value=''></option>
				{values.location?.terminals?.map((terminal, i) => (
					<option key={i} value={i}>
						{terminal?.game ? terminal.game : 'No Game'} / {terminal?.serial}
					</option>
				))}
			</TextField>
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
			<Button style={{ width: '25%' }} variant='outlined' type='submit'>
				Submit
			</Button>
			<Modal>
				<p>Are you sure you want to continue?</p>
			</Modal>
		</Form>
	);
}
