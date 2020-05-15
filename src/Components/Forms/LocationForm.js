import React from 'react';
import { TextField, Select, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { useConfirmModal } from '../../hooks/Modal';

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

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	button {
		width: 25%;
	}
	& > div {
		width: 100%;
		display: flex;
		margin: 1em;
		align-items: center;
		flex-wrap: wrap;
	}
	div {
		margin: 0.25em;
	}
	#address {
		margin: 3rem 0;
		flex-wrap: wrap;
		align-self: flex-start;
		height: 200px;
		justify-content: space-between;
	}
	.title {
		margin: 1rem;
		font-weight: 500;
		flex-grow: 2;
	}
	.select {
		min-width: 100px;
		flex-grow: 1;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		label {
			color: rgba(0, 0, 0, 0.54);
			margin-bottom: -22px;
			transform: scale(0.75);
		}
	}
`;

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
			<div id='storeInfo'>
				<h4 className='title'>COAM Information</h4>
				<TextField
					required
					style={{ flexGrow: 1 }}
					variant='outlined'
					value={values.name}
					name='name'
					label='Name'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					required
					variant='outlined'
					name='license'
					label='License No.'
					value={values.license}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<div className='select'>
					<label htmlFor='terminal'>Terminals *</label>
					<Select
						native
						required
						variant='outlined'
						labelId='terminal'
						name='terminalsTotal'
						value={values.terminalsTotal}
						onChange={handleChange}
						onBlur={handleBlur}>
						{Array.from({ length: 9 }, (x, i) => (x = i + 1)).map((n, i) => (
							<option value={n.toString()} key={i}>
								{n}
							</option>
						))}
					</Select>
				</div>
			</div>
			<div id='address'>
				<h4 className='title'>Address</h4>
				<TextField
					required
					variant='outlined'
					name='address'
					label='Address'
					value={values.address}
					onChange={handleChange}
					onBlur={handleBlur}
					style={{ flexGrow: 2, minWidth: '85%' }}
				/>
				<TextField
					required
					variant='outlined'
					name='city'
					value={values.city}
					label='City'
					style={{ flexGrow: 0.5 }}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<div variant='outlined' className='select'>
					<label htmlFor='state'>State *</label>
					<Select
						variant='outlined'
						native
						required
						name='state'
						labelId='state'
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
					</Select>
				</div>
				<TextField
					variant='outlined'
					value={values.zipCode}
					name='zipCode'
					label='Zip'
					style={{ maxWidth: 120 }}
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
