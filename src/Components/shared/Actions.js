import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import {
	MoreVertOutlined,
	DeleteOutline,
	DirectionsOutlined,
	VisibilityOutlined,
	EditOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as ROLES from '../../constants/roles';
import { useConfirmModal } from '../../hooks/Modal';
import { useLocation } from 'react-router-dom';
import { FirebaseContext } from '../../Firebase';

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
	const firebase = useContext(FirebaseContext);
	const handleDelete = (id, index) => {
		setModalOpen(false);
		firebase.db
			.doc(`${firebase.master}${pathname}/${id}`)
			.get()
			.then((element) => {
				if (element.exists) {
					return element.ref.delete();
				}
			})
			.then((e) => alert('Success'))
			.catch((e) => alert('Error ' + e.message));
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
							pathname: `${pathname}/${item?.docId}`,
							state: { data: item, panel: 'Edit' },
						}}>
						<EditOutlined />
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						alt='Link to Info Panel'
						style={{ color: 'inherit' }}
						to={{
							pathname: `${pathname}/${item?.docId}`,
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

const urlRegEx = /http[s]+:\/\//g;
const location = /[mMyY]+\+[Ll]ocation/g;
function mapsOpener(url, origin) {
	const browserLocation = origin?.latitude + ',' + origin?.longitude ?? null;

	const isIphone = navigator.platform.indexOf('Iphone') !== -1;
	if (isIphone) {
		url = url.replace(urlRegEx, 'maps');
	}
	if (browserLocation) {
		url = url.replace(location, browserLocation);
	}
	console.log({ isIphone, browserLocation, url });
	return window.open(url);
}
