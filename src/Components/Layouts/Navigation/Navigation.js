import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import styled from '@emotion/styled';
import { List, ListItem, ListItemIcon, Divider } from '@material-ui/core';
import {
	HomeOutlined,
	Storefront,
	AccountCircleOutlined,
	SupervisorAccountOutlined,
} from '@material-ui/icons';

const NavLink = styled(Link)`
	color: #222;
	font-size: 1rem;
	font-weight: ${(props) => props.fontWeight || 'normal'};
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

const Navigation = (props) => {
	return (
		<List {...props}>
			<ListItem button>
				<ListItemIcon>
					<HomeOutlined />
				</ListItemIcon>
				<NavLink to={ROUTES.HOME} exact activeClassName='current-page'>
					Home
				</NavLink>
			</ListItem>
			{props.isLoggedIn && (
				<>
					<ListItem button>
						<ListItemIcon>
							<Storefront />
						</ListItemIcon>
						<NavLink to={ROUTES.LOCATIONS} exact activeClassName='current-page'>
							Locations
						</NavLink>
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemIcon>
							<AccountCircleOutlined />
						</ListItemIcon>
						<NavLink to={ROUTES.ACCOUNT} exact activeClassName='current-page'>
							Account
						</NavLink>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<SupervisorAccountOutlined />
						</ListItemIcon>
						<NavLink to={ROUTES.ADMIN} exact activeClassName='current-page'>
							Admin
						</NavLink>
					</ListItem>
				</>
			)}
		</List>
	);
};
export default Navigation;
