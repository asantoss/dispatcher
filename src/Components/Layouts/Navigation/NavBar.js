import React, { useContext, useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	SwipeableDrawer,
	Avatar,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { Menu } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { FirebaseContext } from '../../../Firebase';

const NavBarContainer = styled.div`
	width: 100%;
	color: white;
	header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.MenuButton {
		margin-left: 0em;
		color: inherit;
	}
	.title {
		flex-grow: 1;
	}
	a {
		text-decoration: none;
		color: white;
		&.current-page {
			color: darkgray;
		}
	}
	.drawer {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
`;

export default function NavBar() {
	const firebase = useContext(FirebaseContext);
	const { isLoggedIn, ...user } = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const [state, setState] = useState(false);

	const handleSignOut = () => {
		dispatch({ type: 'LOGOUT' });
		return firebase.doSignOut();
	};
	const toggleNav = (state) => (event) => {
		if (
			event?.type === 'keydown' &&
			(event?.key === 'Tab' || event?.key === 'Shift')
		) {
			return;
		}
		setState(state);
	};

	return (
		<NavBarContainer>
			<AppBar position='static'>
				<Toolbar>
					<IconButton onClick={toggleNav(true)} className='MenuButton'>
						<Menu />
					</IconButton>
				</Toolbar>
				<Typography variant='h6' className='title'>
					Dispatcher
				</Typography>
				{isLoggedIn ? (
					<IconButton onClick={handleSignOut}>
						<Avatar src={user?.photoURL} />
					</IconButton>
				) : (
					<Button color='inherit'>
						<Link to={ROUTES.SIGN_IN}>Sign In</Link>
					</Button>
				)}
			</AppBar>
			<SwipeableDrawer
				anchor='left'
				open={state}
				onClose={toggleNav(false)}
				onOpen={toggleNav(true)}>
				<Navigation
					{...{ isLoggedIn }}
					className='drawer'
					role='presentation'
					onClick={toggleNav(false)}
					onKeyDown={toggleNav(false)}
				/>
			</SwipeableDrawer>
		</NavBarContainer>
	);
}
