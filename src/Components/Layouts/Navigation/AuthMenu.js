import React, { useEffect, useRef } from 'react';
import { Menu, MenuItem, Avatar, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import SelectMaster from '../../../Pages/Authentication/SelectMaster';
import { useModal } from '../../../hooks/Modal';

const UserMenu = styled.div`
	display: flex;
	.paper {
		margin-right: 2em;
	}
`;

export default function AuthMenu({ user, handleSignOut }) {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [MasterModal, setMasterModal] = useModal();
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<UserMenu>
			<IconButton onClick={handleToggle} ref={anchorRef}>
				<Avatar src={user?.photoURL} />
			</IconButton>
			<Menu open={open} onClose={handleClose} anchorEl={anchorRef.current}>
				<MenuItem onClick={() => setMasterModal(true)}>Masters</MenuItem>
				<MenuItem>Profile</MenuItem>
				<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
			</Menu>
			<MasterModal>
				<SelectMaster />
			</MasterModal>
		</UserMenu>
	);
}
