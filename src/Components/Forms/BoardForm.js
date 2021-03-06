import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { useConfirmModal } from '../../hooks/Modal';
import { Form } from '../Layouts/styles/Form';

export default function BoardForm({ initialState, onSubmit }) {
	const { handleChange, handleSubmit, handleBlur, values } = useFormik({
		initialValues: initialState || {
			game: '',
			manufacturer: '',
			refrence: '',
			type: '',
			version: '',
		},
		onSubmit,
	});
	const [openModal, Modal] = useConfirmModal(() => {
		handleSubmit();
	});

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				openModal();
			}}>
			<div id='main_info'>
				<h4>Board Information</h4>
				<TextField
					required
					variant='outlined'
					name='refrence'
					value={values.refrence}
					label='Refrence'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					required
					variant='outlined'
					name='game'
					label='Board Name'
					value={values.game}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					required
					variant='outlined'
					value={values.manufacturer}
					name='manufacturer'
					label='Manufacturer'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					variant='outlined'
					value={values.type}
					name='type'
					label='Type'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					variant='outlined'
					value={values.version}
					name='version'
					label='Version'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
			<Button variant='outlined' type='submit'>
				Submit
			</Button>
			<Modal>
				<p>Are you sure you want to update this?</p>
			</Modal>
		</Form>
	);
}

/**
 * 	<Autocomplete
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				getOptionSelected={(option, value) => option.game === value.game}
				getOptionLabel={(option) => `${option?.type}/${option?.serial}`}
				options={options}
				onChange={(e) => {
					setFieldValue('terminal', options[e.target.value]?.docId ?? null);
				}}
				loading={loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Cabinet'
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
 */
