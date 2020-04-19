import React, { useContext, useState } from 'react';
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
import { LocationContext } from './LocationController';
import { useConfirmModal } from '../../shared/Modal';
import * as ACTIONS from '../../constants/actions';

const ActionsContainer = styled.div`
	display: flex;
	#view {
		color: inherit;
	}
`;

export default function Actions({ location, index }) {
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);

	const { user, locations } = useSelector((state) => state);
	const dispatch = useDispatch();
	const LocationController = useContext(LocationContext);

	const handleDelete = (id, index) => {
		setModalOpen(false);
		dispatch(ACTIONS.FIRED());
		LocationController.deleteLocation(id)
			.then(() => dispatch(ACTIONS.FULFILLED()))
			.then(() => {
				if (locations.filtered?.length) {
					dispatch(
						ACTIONS.FILTER_LOCATIONS(
							locations.filtered.filter((e) => e?.docId !== location?.docId)
						)
					);
				} else {
					dispatch(
						ACTIONS.SET_ALL_LOCATIONS(
							locations.allLocations.filter((e) => e?.docId !== location?.docId)
						)
					);
				}
			});
	};
	const [setModalOpen, ConfirmModal] = useConfirmModal(() =>
		handleDelete(location?.docId)
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
				{location?.coordinates && (
					<MenuItem
						onClick={() => mapsOpener(location?.coordinates, user?.location)}>
						<DirectionsOutlined />
					</MenuItem>
				)}
				{user.role === ROLES.ADMIN && (
					<MenuItem onClick={() => setModalOpen(true)}>
						<DeleteOutline />
					</MenuItem>
				)}
				<MenuItem>
					<Link
						style={{ color: 'inherit' }}
						to={{
							pathname: `location/${location?.docId}`,
							state: location,
						}}>
						<VisibilityOutlined />
					</Link>
				</MenuItem>
			</Menu>
			<ConfirmModal />
		</ActionsContainer>
	);
}

function mapsOpener(coordinates, origin) {
	const { lat, lng } = coordinates;
	const directions = origin
		? origin.latitude + ',' + origin.longitude
		: 'My+Location';
	if (navigator.platform.indexOf('Iphone') !== -1) {
		window.open(
			`maps://maps.google.com/maps/?saddr=${directions}&daddr=${lat},${lng}&amp;ll=`
		);
	} else {
		window.open(
			`https://maps.google.com/maps?saddr=${directions}&daddr=${lat},${lng}&amp;ll=`
		);
	}
}