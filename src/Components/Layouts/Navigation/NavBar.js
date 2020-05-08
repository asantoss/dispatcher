import React, { useContext, useState, useRef } from 'react';

import { Link } from 'react-router-dom';
import { IconButton, Button, Avatar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { FirebaseContext } from '../../../Firebase';
import { useSelector, useDispatch } from 'react-redux';

import * as ROUTES from '../../../constants/routes';
import NavMenu from './NavMenu';
import styled from 'styled-components';
import Burger from './Burger';
import { CSSTransition } from 'react-transition-group';
export default function NavBar(props) {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState(false);
	const {
		user: { isLoggedIn, photoURL },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		dispatch({ type: 'LOGOUT' });
		return firebase.doSignOut();
	};
	const toggleNav = () => {
		setState(!state);
	};

	return (
		<AppBar>
			<div className='logo'>
				<Burger open={state} toggleNav={toggleNav} />
				<h2>Dispatcher</h2>
			</div>
			{isLoggedIn ? (
				<IconButton onClick={handleSignOut}>
					<Avatar src={photoURL} />
				</IconButton>
			) : (
				<Button color='inherit'>
					<Link style={{ fontSize: '1.2em' }} to={ROUTES.SIGN_IN}>
						Sign In
					</Link>
				</Button>
			)}

			{state && <NavMenu isOpen={state} {...{ isLoggedIn, toggleNav }} />}
		</AppBar>
	);
}

const AppBar = styled.nav`
	z-index: 1300;
	grid-area: a;
	display: flex;
	width: 100vw;
	height: var(--nav-size);
	border-bottom: var(--border);
	color: var(--text-color);
	align-items: center;
	padding: 0 1rem;
	justify-content: space-between;
	.logo {
		display: flex;
		justify-content: space-between;
	}
	a {
		color: var(--text-color);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}

	.open {
		transform: rotate(180deg);
	}
	background-color: var(--bg);
`;
