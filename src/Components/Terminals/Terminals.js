import React, { useContext } from 'react';
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	IconButton,
	ListItemSecondaryAction,
} from '@material-ui/core';
import { CloseOutlined, EditOutlined } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from '../../Firebase';
import * as ACTIONS from '../../constants/actions';
export default function Terminals({ terminals }) {
	const {
		locations: { currentLocation },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const firebase = useContext(FirebaseContext);
	const handleRemove = (terminal) => {
		firebase
			.removeTerminalFromLocation(terminal, currentLocation)
			.then((terminals) => {
				alert('Success');
				dispatch(
					ACTIONS.SET_CURRENT_LOCATION({ ...currentLocation, terminals })
				);
			})
			.catch((e) => alert('Error please try againt \n ' + e.message));
	};
	return terminals?.length ? (
		terminals.map((terminal, i) => (
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
						<IconButton onClick={() => handleRemove(terminal)}>
							<CloseOutlined />
						</IconButton>
						<IconButton>
							<EditOutlined />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		))
	) : (
		<p>No Terminals Set</p>
	);
}
