import React, { useState, useRef } from 'react';

import { Link } from 'react-router-dom';
import { IconButton, Button, Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useOnClickOutside } from '../../../hooks';
import * as ROUTES from '../../../constants/routes';
import NavMenu from './NavMenu';
import styled from 'styled-components';
import Burger from './Burger';
import { CSSTransition } from 'react-transition-group';
import { LOGOUT } from '../../../constants/actions';
export default function NavBar(props) {
	const node = useRef();
	const [state, setState] = useState(false);
	useOnClickOutside(node, () => setState(false));
	const {
		user: { isLoggedIn, photoURL },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		dispatch(LOGOUT());
	};
	const toggleNav = () => {
		setState(!state);
	};

	return (
		<AppBar ref={node}>
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
			<CSSTransition in={state} timeout={100} appear={true} unmountOnExit>
				{/* <div> */}
				<NavMenu isOpen={state} {...{ isLoggedIn, toggleNav }} />
				{/* </div> */}
			</CSSTransition>
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
