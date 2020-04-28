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
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../constants/actions';

export default function TerminalsChecked({ location }) {
	const [checked, setChecked] = useState([]);
	const [state, setState] = useState([]);
	const user = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		if (user?.currentMaster?.path)
			firebase.getMasterTerminals(user.currentMaster.path).then((results) => {
				const terminals = results.filter(
					(terminal) => terminal?.locationId !== location?.docId
				);
				setState(terminals);
			});
	}, [user, setState, firebase, location]);
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
		const terminals = [...location.terminals, ...checked];
		if (terminals.length < location.terminalsTotal) {
			Promise.all(
				checked.map((terminal) =>
					firebase.addTerminalToLocation(
						terminal,
						location.docId,
						user.currentMaster.path
					)
				)
			).then(() => {
				setChecked([]);
				dispatch(
					ACTIONS.SET_CURRENT_LOCATION({ ...location, terminals: checked })
				);
				alert('Success');
			});
		}
	};
	return state.length ? (
		<form onSubmit={handleSubmit}>
			{state.map((terminal, i) => (
				<List key={i}>
					<ListItem>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							primary={terminal.game}
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
			<Button color='primary' type='submit'>
				Save
			</Button>
		</form>
	) : (
		<h4>No available terminals!</h4>
	);
}
