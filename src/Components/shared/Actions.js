import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import {
	MoreVertOutlined,
	DeleteOutline,
	DirectionsOutlined,
	VisibilityOutlined,
	GamesOutlined,
	EditOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as ROLES from '../../constants/roles';
import { LocationContext } from '../../Pages/Locations/LocationController';
import { useConfirmModal } from '../../hooks/Modal';
import * as ACTIONS from '../../constants/actions';

const ActionsContainer = styled.div`
	display: flex;
	#view {
		color: inherit;
	}
`;

export default function Actions({ item }) {
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
				dispatch(
					ACTIONS.SET_ALL_LOCATIONS(
						locations.allLocations.filter((e) => e?.docId !== item?.docId)
					)
				);
			});
	};
	const [setModalOpen, ConfirmModal] = useConfirmModal(() =>
		handleDelete(item?.docId)
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
				{user?.currentMaster?.role === ROLES.ADMIN && (
					<MenuItem onClick={() => setModalOpen(true)}>
						<DeleteOutline />
					</MenuItem>
				)}
				<MenuItem>
					<Link
						alt='Link to edit panel'
						style={{ color: 'inherit' }}
						to={{
							pathname: `locations/${item?.docId}`,
							state: { location: item, panel: 'Edit' },
						}}>
						<EditOutlined />
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						alt='Link to terminals panel'
						style={{ color: 'inherit' }}
						to={{
							pathname: `locations/${item?.docId}`,
							state: { location: item, panel: 'Terminals' },
						}}>
						<GamesOutlined />
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						alt='Link to Info Panel'
						style={{ color: 'inherit' }}
						to={{
							pathname: `locations/${item?.docId}`,
							state: { location: item, panel: 'Info' },
						}}>
						<VisibilityOutlined />
					</Link>
				</MenuItem>
			</Menu>
			<ConfirmModal>
				<p>Are you sure you want to delete this location?</p>
			</ConfirmModal>
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
