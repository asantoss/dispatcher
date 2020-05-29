import React, { useState, useEffect } from 'react';

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
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from '../../constants/actions';

export default function TerminalsChecked({ location, id }) {
	const [checked, setChecked] = useState([]);
	const [state, setState] = useState([]);
	const dispatch = useDispatch();
	const terminals = useSelector((state) => state.terminals);

	useEffect(() => {
		setState(terminals.ids.filter((e) => !terminals.entities[e]?.locationId));
	}, [dispatch, terminals, id]);

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
		terminals = [...terminals, ...checked.map((e) => e.serial)];
		if (terminals.length < location.terminalsTotal) {
			dispatch(ACTIONS.ADD_TERMINALS({ terminals, id }));
		}
	};
	return state.length ? (
		<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
			{state.map((terminalId, i) => {
				const terminal = terminals.entities[terminalId];
				return (
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
				);
			})}
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
