import React from 'react';
import { NavLink as Link, withRouter } from 'react-router-dom';
// import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import styled from '@emotion/styled';
import { compose } from 'recompose';
import withAuthentication from './Session/withAuthentication';
import { AuthUserContext } from './Session';
import withFirebase from './PasswordChange/index';

const NavLink = styled(Link)`
	color: #222;
	font-size: 1rem;
	font-weight: ${props => props.fontWeight || 'normal'};
	line-height: 1;
	margin: 0 0.5rem 0 0;
	padding: 0.25rem;
	text-decoration: none;
	&.current-page {
		border-bottom: 2px solid #222;
	}
	&:last-of-type {
		margin-right: 0;
	}
`;
const HeaderStyled = styled.header`
	background: #eee;
	border-bottom: 1px solid #ddd;
	display: flex;
	justify-content: space-between;
	a {
		text-decoration: none;
		color: #222;
	}
`;

const HeaderAuthed = props => {
	return (
		<HeaderStyled>
			<NavLink to={ROUTES.LANDING} fontWeight='bold'>
				Dispatcher
			</NavLink>
			<nav style={{ marginTop: 0 }}>
				<NavLink to={ROUTES.HOME} exact activeClassName='current-page'>
					Home
				</NavLink>
				<NavLink to={ROUTES.ACCOUNT} exact activeClassName='current-page'>
					Account
				</NavLink>
				<NavLink to={ROUTES.ADMIN} exact activeClassName='current-page'>
					Admin
				</NavLink>
				<NavLink to={ROUTES.LOCATIONS} exact activeClassName='current-page'>
					Locations
				</NavLink>
				{/* <SignOutButton /> */}
				<a
					href='/'
					onClick={e => {
						e.preventDefault();
						props.firebase.doSignOut();
						props.history.push('/');
					}}>
					SignOut
				</a>
			</nav>
		</HeaderStyled>
	);
};
const HeaderUnauthed = () => {
	return (
		<HeaderStyled>
			<NavLink to={ROUTES.LANDING} fontWeight='bold'>
				Dispatcher
			</NavLink>
			<nav style={{ marginTop: 0 }}>
				<NavLink to={ROUTES.HOME} exact activeClassName='current-page'>
					Home
				</NavLink>
				<NavLink to={ROUTES.SIGN_IN} exact activeClassName='current-page'>
					Login
				</NavLink>
			</nav>
		</HeaderStyled>
	);
};
const Navigation = props => {
	return (
		<AuthUserContext.Consumer>
			{authUser =>
				authUser ? <HeaderAuthed {...props} /> : <HeaderUnauthed {...props} />
			}
		</AuthUserContext.Consumer>
	);
};
export default compose(withRouter, withAuthentication)(Navigation);
