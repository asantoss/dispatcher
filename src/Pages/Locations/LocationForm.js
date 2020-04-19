import React, { useContext } from 'react';
import {
	TextField,
	Select,
	MenuItem,
	Button,
	InputLabel,
	FormControl,
} from '@material-ui/core';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { LocationContext } from './LocationController';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../constants/actions';

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
	'FM',
	'FL',
	'GA',
	'GU',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MH',
	'MD',
	'MA',
	'MI',
	'MN',
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
	'ND',
	'MP',
	'OH',
	'OK',
	'OR',
	'PW',
	'PA',
	'PR',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VI',
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
		display: flex;
		justify-content: space-evenly;
		margin: 1em;
		align-items: center;
	}
	div {
		margin: 0.25em;
	}
	#address {
		flex-wrap: wrap;
		align-self: flex-start;
		height: 200px;
		justify-content: space-between;
	}
	.select {
		[role='button'] {
			padding: 14.5px 32px 14.5px 14px;
		}
	}
`;

export default function LocationForm({ docId, initialState }) {
	const controller = useContext(LocationContext);
	const dispatch = useDispatch();
	const { handleChange, handleSubmit, handleBlur, values } = useFormik({
		initialValues: { ...initialState } || {
			name: '',
			state: '',
			terminals: ``,
			address: '',
			city: '',
			id: '',
			zipCode: '',
		},
		onSubmit: (values) => {
			dispatch(ACTIONS.FIRED);
			controller
				.updateLocation(docId, values)
				.then(() => {
					dispatch(ACTIONS.FULFILLED);
				})
				.then(() => dispatch(ACTIONS.SET_CURRENT_LOCATION(values)))
				.catch((e) => dispatch(ACTIONS.ERROR(e.message)));
		},
	});
	return (
		<Form onSubmit={handleSubmit}>
			<div id='storeInfo'>
				<TextField
					required
					variant='outlined'
					name='id'
					label='License No.'
					value={values.id}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					required
					variant='outlined'
					value={values.name}
					name='name'
					label='Name'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<FormControl variant='outlined' style={{ minWidth: 120 }}>
					<InputLabel htmlFor='terminal'>Terminals</InputLabel>
					<Select
						required
						className='select'
						labelId='terminal'
						name='terminals'
						label='Terminals'
						value={values.terminals}
						onChange={handleChange}
						onBlur={handleBlur}>
						<MenuItem></MenuItem>
						{Array.from({ length: 9 }, (x, i) => (x = i + 1)).map((n, i) => (
							<MenuItem value={n} key={i}>
								{n}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div id='address'>
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
					style={{ flexGrow: 1 }}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					required
					variant='outlined'
					value={values.zipCode}
					name='zipCode'
					label='Zip'
					style={{ maxWidth: 120 }}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<FormControl variant='outlined' style={{ minWidth: 90 }}>
					<InputLabel htmlFor='state'>State</InputLabel>
					<Select
						required
						className='select'
						name='state'
						labelId='state'
						value={values.state}
						label='State'
						onChange={handleChange}
						onBlur={handleBlur}>
						<MenuItem></MenuItem>
						{USStates.map((state, i) => (
							<MenuItem value={state} key={i}>
								{state}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<Button variant='outlined' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
