import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import { Form } from '../shared/styles/Form.js';
import { FirebaseContext } from '../../Firebase';
import { Autocomplete } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { useConfirmModal } from '../../hooks/Modal';

// import { useHistory } from 'react-router-dom';

export default function TerminalForm({ initialState, location }) {
	const { currentMaster } = useSelector(({ user }) => user);
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
			game: '',
			location: '',
			monitor: ``,
			type: '',
			billAcceptor: '',
			serial: '',
			boardId: null,
		},
		onSubmit: ({ board, ...values }) => {
			const locationRef = location?.docId ?? null;
			const docId = initialState?.docId ?? null;
			debugger;
			if (values?.boardId) {
				firebase.updateBoard(values.boardId, { terminalId: docId });
			} else {
				values.boardId = null;
				board = null;
				if (initialState) {
					initialState.board = null;
					initialState.boardId = null;
				}
			}
			if (docId) {
				return firebase.updateTerminal(values, docId).then(() => {
					alert('Success');
				});
			}
			return firebase
				.addTerminalToMaster({ ...values, locationId: locationRef })
				.then(() => {
					resetForm();
					alert('Success!');
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
			const boards = await firebase.getMasterFreeBoards();
			if (active) {
				setOptions(boards);
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
					option?.refrence ? `${option.game}/${option?.refrence}` : option.game
				}
				options={options}
				onChange={(e) => {
					setFieldValue('board', options[e.target.value]);
					setFieldValue('boardId', options[e.target.value]?.docId ?? null);
				}}
				loading={loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Game Board'
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
				style={{ flexGrow: 1 }}
				required
				variant='outlined'
				value={values.monitor}
				name='monitor'
				label='Monitor'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 2 }}
				required
				variant='outlined'
				name='billAcceptor'
				value={values.billAcceptor}
				label='Bill Acceptor'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 2 }}
				variant='outlined'
				value={values.serial}
				name='serial'
				label='Serial No.'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextField
				style={{ flexGrow: 3 }}
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
			<div style={{ flexBasis: '100%' }}></div>
			<Button style={{ width: '25%' }} variant='outlined' type='submit'>
				Submit
			</Button>
			<Modal>
				<p>Are you sure you want to update this?</p>
			</Modal>
		</Form>
	);
}
