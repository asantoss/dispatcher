import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../Layouts/styles/Form';
import { FirebaseContext } from '../../Firebase';
import Autocomplete from '../shared/Autocomplete';
import { useSelector } from 'react-redux';
import { useConfirmModal } from '../../hooks/Modal';

// import { useHistory } from 'react-router-dom';

export default function TerminalForm({ initialState, onSubmit }) {
	const { currentMaster } = useSelector(({ user }) => user);
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
		let active = true;
		(async () => {
			const boards = await firebase.getMasterFreeBoards();
			if (active) {
				setOptions(boards);
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
					select
					variant='outlined'
					required
					name='type'
					label='Type'
					value={values.type}
					onChange={handleChange}
					SelectProps={{
						native: true,
					}}
					onBlur={handleBlur}>
					<option aria-label='None' value=''></option>
					{currentMaster?.cabinetTypes.map((type, i) => (
						<option key={i} value={type}>
							{type}
						</option>
					))}
				</TextField>
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
						defaultValue={initialState?.board ?? undefined}
						getSelected={(option) => {
							setFieldValue('board', option);
							setFieldValue('boardId', option?.docId);
						}}
						getLabel={(option) =>
							option?.refrence
								? `${option.game}/ Refrence: ${option?.refrence}`
								: option.game
						}
						options={options}
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
