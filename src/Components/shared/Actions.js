import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import {
	MoreVertOutlined,
	DeleteOutline,
	DirectionsOutlined,
	VisibilityOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as ROLES from '../../constants/roles';
import { useConfirmModal } from '../../hooks/Modal';
import { useLocation } from 'react-router-dom';
import { mapsOpener } from '../../shared/utils';
import { REMOVE_ITEM } from '../../constants/actions';

const ActionsContainer = styled.div`
	display: flex;
	#view {
		color: inherit;
	}
`;

export default function Actions({ item }) {
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);
	const { pathname } = useLocation();
	const { user } = useSelector((state) => state);
	const dispatch = useDispatch();
	const handleDelete = (id) => {
		setModalOpen(false);
		dispatch(REMOVE_ITEM({ id, collection: pathname }));
	};
	const [setModalOpen, ConfirmModal] = useConfirmModal(() =>
		handleDelete(item)
	);
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
				{item?.coordinates && (
					<MenuItem
						onClick={() => mapsOpener(item?.coordinates, user?.location)}>
						<DirectionsOutlined />
					</MenuItem>
				)}
				{user?.role === ROLES.ADMIN && pathname !== '/tickets' && (
					<MenuItem onClick={() => setModalOpen(true)}>
						<DeleteOutline />
					</MenuItem>
				)}
				{/* <MenuItem>
					<Link
						alt='Link to edit panel'
						style={{ color: 'inherit' }}
						to={{
							pathname: `${pathname}/${item}`,
							state: { data: item, panel: 'Edit' },
						}}>
						<EditOutlined />
					</Link>
				</MenuItem> */}
				<MenuItem>
					<Link
						alt='Link to Info Panel'
						style={{ color: 'inherit' }}
						to={{
							pathname: `${pathname}/${item}`,
							state: { data: item, panel: 'Info' },
						}}>
						<VisibilityOutlined />
					</Link>
				</MenuItem>
			</Menu>
			<ConfirmModal>
				<p>Are you sure you want to delete this item?</p>
			</ConfirmModal>
		</ActionsContainer>
	);
}
