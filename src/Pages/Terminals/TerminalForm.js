import React, { useContext } from 'react';
import { TextField, Select, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../constants/actions';
import { useConfirmModal } from '../../hooks/Modal';
import { useHistory } from 'react-router-dom';

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
		/* [role='button'] {
        padding: 14.5px 32px 14.5px 14px;
    } */
		min-width: 100px;
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

export default function TerminalForm({ docId, initialState }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { handleChange, handleSubmit, handleBlur, values } = useFormik({
		initialValues: initialState || {
			game: '',
			location: '',
			monitor: ``,
			type: '',
			billAcceptor: '',
			serial: '',
		},
		onSubmit: (values) => {},
	});
	const [openModal, Modal] = useConfirmModal(handleSubmit);
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				openModal();
			}}>
			<div id='storeInfo'>
				<TextField
					required
					variant='outlined'
					name='game'
					label='Game'
					value={values.game}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					required
					variant='outlined'
					value={values.monitor}
					name='monitor'
					label='Monitor'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<div className='select'>
					<label htmlFor='terminal'>Location</label>
					<Select
						native
						required
						variant='outlined'
						labelId='location'
						name='location'
						value={values.location}
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
				<TextField
					required
					variant='outlined'
					name='billAcceptor'
					value={values.billAcceptor}
					label='Bill Acceptor'
					style={{ flexGrow: 1 }}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					variant='outlined'
					value={values.zipCode}
					name='serial'
					label='Serial No.'
					style={{ maxWidth: 120 }}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<div variant='outlined' className='select'>
					<label htmlFor='type'>Type</label>
					<Select
						variant='outlined'
						native
						required
						name='type'
						labelId='type'
						value={values.type}
						onChange={handleChange}
						onBlur={handleBlur}>
						<option aria-label='None' value=''></option>
					</Select>
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
