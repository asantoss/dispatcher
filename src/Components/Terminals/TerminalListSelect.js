import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Firebase/index';
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Checkbox,
	ListItemSecondaryAction,
	Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../constants/actions';

export default function TerminalsChecked({ location, id }) {
	const [checked, setChecked] = useState([]);
	const [state, setState] = useState([]);
	const dispatch = useDispatch();
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		firebase.getMasterTerminals().then((results) => {
			const terminals = results.filter(
				(terminal) => terminal?.locationId !== id
			);
			setState(terminals);
		});
	}, [setState, firebase, id]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let terminals = [];
		if (location?.terminals) {
			terminals = [...location.terminals];
		}
		terminals = [...terminals, ...checked];
		if (terminals.length < location.terminalsTotal) {
			dispatch(ACTIONS.ADD_TERMINALS({ terminals, id }));
		}
	};
	return state.length ? (
		<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
			{state.map((terminal, i) => (
				<List key={i}>
					<ListItem>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							primary={terminal?.board?.game ?? 'No Game'}
							secondary={
								<>
									<span>{terminal.serial}</span>
									<br />
									<span>{terminal.type}</span>
									<br />
									<span>{terminal.billAcceptor}</span>
								</>
							}
						/>
						<ListItemSecondaryAction>
							<Checkbox
								edge='end'
								onChange={handleToggle(terminal)}
								checked={checked.indexOf(terminal) !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			))}
			<Button variant='contained' color='primary' type='submit'>
				Save
			</Button>
		</form>
	) : (
		<>
			<div className='spinner' />
			<h4>No available terminals!</h4>
		</>
	);
}
