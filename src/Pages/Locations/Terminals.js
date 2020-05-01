import React, { useState } from 'react';
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Checkbox,
	ListItemSecondaryAction,
} from '@material-ui/core';

export default function Terminals({ terminals }) {
	const [checked, setChecked] = useState([]);

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
	return terminals.map((terminal) => (
		<List>
			<ListItem>
				<ListItemAvatar>
					<Avatar />
				</ListItemAvatar>
				<ListItemText
					primary={terminal.game}
					secondary={
						<div>
							<span>{terminal.serial}</span>
							<span>{terminal.type}</span>
							<span>{terminal.billAcceptor}</span>
						</div>
					}
				/>
			</ListItem>
		</List>
	));
}
