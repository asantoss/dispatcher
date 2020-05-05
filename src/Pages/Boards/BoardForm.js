import React, { useContext } from 'react';
import { TextField, Select, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../constants/actions';
import { useConfirmModal } from '../../hooks/Modal';
import { useHistory } from 'react-router-dom';
import { Form } from '../../Components/shared/styles/Form';
import { FirebaseContext } from '../../Firebase';

export default function BoardForm({ initialState }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const firebase = useContext(FirebaseContext);
	const { handleChange, handleSubmit, handleBlur, values } = useFormik({
		initialValues: initialState || {
			name: '',
			manufacturer: '',
			refrence: '',
			type: '',
			version: '',
		},
		onSubmit: (values) => {
			const { docId, ...boardInfo } = values;
			return firebase
				.updateBoard(docId, boardInfo)
				.then(() => alert('Success'));
		},
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
			<TextField
				required
				variant='outlined'
				name='name'
				label='Board Name'
				value={values.name}
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
				required
				variant='outlined'
				name='refrence'
				value={values.refrence}
				label='Refrence'
				style={{ flexGrow: 1 }}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				variant='outlined'
				value={values.type}
				name='type'
				label='Type'
				style={{ maxWidth: 120 }}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				variant='outlined'
				value={values.version}
				name='version'
				label='Version'
				style={{ maxWidth: 120 }}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<Button variant='outlined' type='submit'>
				Submit
			</Button>
			<Modal>
				<p>Are you sure you want to update this?</p>
			</Modal>
		</Form>
	);
}
