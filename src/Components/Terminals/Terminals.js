import React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from '../../constants/actions';
import { Link } from 'react-router-dom';

export default function Terminals({ location, id }) {
	const dispatch = useDispatch();
	const { terminals, boards } = useSelector((state) => state);
	const handleRemove = (terminal) => {
		dispatch(ACTIONS.REMOVE_TERMINAL({ id, terminal }));
	};

	return location?.terminals?.length ? (
		location.terminals.map((id, i) => {
			const terminal = terminals.entities[id];
			return (
				<List key={i}>
					<ListItem>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							data-testid={'terminal' + i}
							primary={boards.entities[terminal?.boardId]?.game ?? 'No Game'}
							secondary={
								<>
									<span>{terminal?.serial}</span>
									<br />
									<span>{terminal?.type}</span>
									<br />
									<span>{terminal?.billAcceptor}</span>
								</>
							}
						/>
						<ListItemSecondaryAction>
							<IconButton onClick={() => handleRemove(terminal)}>
								<CloseOutlined />
							</IconButton>
							<IconButton>
								<Link to={`/terminals/${id}`}>
									<EditOutlined />
								</Link>
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			);
		})
	) : (
		<p>No terminals found.</p>
	);
}
