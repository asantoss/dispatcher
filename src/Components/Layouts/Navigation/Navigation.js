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
import { useModal } from '../../../hooks/Modal';

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

const Navigation = ({ isLoggedIn, ...rest }) => {
	return (
		<List {...rest}>
			<ListItem button>
				<ListItemIcon>
					<HomeOutlined />
				</ListItemIcon>
				<NavLink to={ROUTES.HOME} exact activeClassName='current-page'>
					Home
				</NavLink>
			</ListItem>
			{isLoggedIn && (
				<>
					<NavLink to={ROUTES.BOARDS} exact activeClassName='current-page'>
						<ListItem button>
							<ListItemIcon>
								<Storefront />
							</ListItemIcon>
							Boards
						</ListItem>
					</NavLink>
					<NavLink to={ROUTES.TERMINALS} exact activeClassName='current-page'>
						<ListItem button>
							<ListItemIcon>
								<Storefront />
							</ListItemIcon>
							Terminals
						</ListItem>
					</NavLink>
					<NavLink to={ROUTES.LOCATIONS} exact activeClassName='current-page'>
						<ListItem button>
							<ListItemIcon>
								<Storefront />
							</ListItemIcon>
							Locations
						</ListItem>
					</NavLink>
					<Divider />
					<NavLink to={ROUTES.ACCOUNT} exact activeClassName='current-page'>
						<ListItem button>
							<ListItemIcon>
								<AccountCircleOutlined />
							</ListItemIcon>
							Account
						</ListItem>
					</NavLink>
					<NavLink to={ROUTES.ADMIN} exact activeClassName='current-page'>
						<ListItem button>
							<ListItemIcon>
								<SupervisorAccountOutlined />
							</ListItemIcon>
							Admin
						</ListItem>
					</NavLink>
				</>
			)}
		</List>
	);
};
export default Navigation;
