import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import {
	DeleteOutline,
	EditOutlined,
	MoreVertOutlined,
	DirectionsOutlined,
	AddOutlined,
} from '@material-ui/icons';

const ActionsContainer = styled.div`
	display: flex;
`;

export default function Actions({ docId, address, name }) {
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);
	return (
		<ActionsContainer>
			<IconButton
				aria-label='more'
				aria-controls='long-menu'
				aria-haspopup='true'
				onClick={(e) => setAnchor(e.currentTarget)}>
				<MoreVertOutlined />
			</IconButton>
			<Menu
				anchorEl={anchor}
				open={open}
				keepMounted
				onClose={() => setAnchor(null)}>
				<MenuItem>
					<DeleteOutline />
				</MenuItem>
				<MenuItem>
					<EditOutlined />
				</MenuItem>
				<MenuItem>
					<AddOutlined />
				</MenuItem>
				<MenuItem>
					<DirectionsOutlined />
				</MenuItem>
			</Menu>
		</ActionsContainer>
	);
}
