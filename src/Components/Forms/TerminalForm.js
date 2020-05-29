import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../Layouts/styles/Form';
import Autocomplete from '../shared/Autocomplete';
import { useSelector } from 'react-redux';
import { useConfirmModal } from '../../hooks/Modal';
// import { useHistory } from 'react-router-dom';

export default function TerminalForm({ initialState, onSubmit }) {
	const boards = useSelector(({ boards }) => boards);

	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		setFieldValue,
	} = useFormik({
		initialValues: initialState || {
			monitor: ``,
			type: '',
			billAcceptor: '',
			manufacturer: '',
			serial: '',
			boardId: null,
		},
		onSubmit,
	});
	const [options, setOptions] = useState([]);

	useEffect(() => {
		//Filter the ones where the terminal id is null or false
		setOptions(boards.ids.filter((e) => !boards.entities[e]?.terminalId));
	}, [boards]);

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
				<TextField
					style={{ flexGrow: 0.5 }}
					variant='outlined'
					value={values.serial}
					name='serial'
					label='Serial No.'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					style={{ flexGrow: 1 }}
					variant='outlined'
					required
					name='type'
					label='Type'
					value={values.type}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					style={{ flexGrow: 1 }}
					required
					variant='outlined'
					value={values.manufacturer}
					name='manufacturer'
					label='Manufacturer'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>

			<div id='secondary_info'>
				<div style={{ flexGrow: 1 }}>
					<Autocomplete
						keys={['game', 'refrence', 'version']}
						label='Game'
						defaultValue={values.boardId}
						getSelected={(option) => {
							setFieldValue('boardId', option);
						}}
						getLabel={(option) =>
							boards.entities[option]?.refrence
								? `${boards.entities[option]?.game}/ Refrence: ${boards.entities[option]?.refrence}`
								: boards.entities[option]?.game
						}
						options={options}
						entities={boards.entities}
					/>
				</div>
				<TextField
					style={{ flexBasis: '40%' }}
					required
					variant='outlined'
					value={values.monitor}
					name='monitor'
					label='Monitor'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<TextField
					style={{ flexBasis: '40%' }}
					required
					variant='outlined'
					name='billAcceptor'
					value={values.billAcceptor}
					label='Bill Acceptor'
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
			<Button style={{ width: '25%' }} variant='outlined' type='submit'>
				Submit
			</Button>
			<Modal>
				<p>Are you sure you want to update this?</p>
			</Modal>
		</Form>
	);
}
