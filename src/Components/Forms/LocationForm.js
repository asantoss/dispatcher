import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { useConfirmModal } from '../../hooks/Modal';
import { Form } from '../Layouts/styles/Form';
const USStates = [
	'AL',
	'AK',
	'AS',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'DC',
	'FL',
	'GA',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'OH',
	'OK',
	'OR',
	'PA',
	'PR',
	'RI',
	'SC',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
];

export default function LocationForm({ initialState, onSubmit }) {
	const { handleChange, handleSubmit, handleBlur, values } = useFormik({
		initialValues: initialState || {
			name: '',
			state: '',
			terminalsTotal: ``,
			address: '',
			city: '',
			license: '',
			zipCode: '',
		},
		onSubmit,
	});
	const [openModal, Modal] = useConfirmModal(handleSubmit);
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				openModal();
			}}>
			<div id='main_info'>
				<h4 className='title'>Address</h4>
				<TextField
					required
					variant='outlined'
					name='address'
					label='Address'
					value={values.address}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<div>
					<TextField
						required
						style={{ marginBottom: '8px' }}
						variant='outlined'
						name='city'
						value={values.city}
						label='City'
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<TextField
						style={{ margin: '0 1rem' }}
						select
						SelectProps={{ native: true }}
						variant='outlined'
						required
						name='state'
						value={values.state}
						label='State'
						onChange={handleChange}
						onBlur={handleBlur}>
						<option aria-label='None' value=''></option>
						{USStates.map((state, i) => (
							<option value={state} key={i}>
								{state}
							</option>
						))}
					</TextField>
					<TextField
						style={{ maxWidth: 100 }}
						variant='outlined'
						value={values.zipCode}
						name='zipCode'
						label='Zip'
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</div>
			</div>
			<div id='secondary_info'>
				<h4 className='title'>COAM Information</h4>
				<TextField
					required
					variant='outlined'
					value={values.name}
					name='name'
					label='Name'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<div>
					<TextField
						required
						variant='outlined'
						name='license'
						label='License No.'
						value={values.license}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<TextField
						style={{ margin: '0 1rem' }}
						select
						SelectProps={{
							native: true,
						}}
						required
						variant='outlined'
						label='Terminal'
						name='terminalsTotal'
						value={values.terminalsTotal}
						onChange={handleChange}
						onBlur={handleBlur}>
						{Array.from({ length: 9 }, (x, i) => (x = i + 1)).map((n, i) => (
							<option value={n.toString()} key={i}>
								{n}
							</option>
						))}
					</TextField>
				</div>
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
