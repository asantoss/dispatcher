import React, { useState } from 'react';
import * as ROUTES from '../../../constants/routes';
import { NavMenuContainer } from '../styles/NavMenu.styled';
import { Divider } from '@material-ui/core';
import {
	BugReportOutlined,
	ArrowBackOutlined,
	HomeOutlined,
	Storefront,
	KitchenOutlined,
	AccountCircleOutlined,
	SupervisorAccountOutlined,
	VideogameAssetOutlined,
	Add,
	ListAltOutlined,
	ArrowRightAltOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NavItem } from '../styles/NavItem';
import Menus from '../../../constants/menus';

import { CSSTransition } from 'react-transition-group';

const NavMenu = ({ isLoggedIn, toggleNav }) => {
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height + 25);
	}

	return (
		<NavMenuContainer style={{ height: menuHeight }}>
			<CSSTransition
				in={activeMenu === 'main'}
				timeout={200}
				classNames='menu-primary'
				onEnter={calcHeight}
				// onEntering={calcHeight}
				mountOnEnter={true}
				unmountOnExit>
				<div className='menu'>
					<Link to={ROUTES.HOME} onClick={toggleNav}>
						<NavItem>
							<div>
								<HomeOutlined />
								<p>Home</p>
							</div>
						</NavItem>
					</Link>
					{isLoggedIn && (
						<>
							<NavItem onClick={() => setActiveMenu('ticket')}>
								<div>
									<BugReportOutlined />
									<p>Tickets</p>
								</div>
								<ArrowRightAltOutlined />
							</NavItem>
							<NavItem onClick={() => setActiveMenu('board')}>
								<div>
									<VideogameAssetOutlined />
									<p>Boards</p>
								</div>
								<ArrowRightAltOutlined />
							</NavItem>
							<NavItem onClick={() => setActiveMenu('terminal')}>
								<div>
									<KitchenOutlined />
									<p>Terminals</p>
								</div>
								<ArrowRightAltOutlined />
							</NavItem>
							<NavItem onClick={() => setActiveMenu('location')}>
								<div>
									<Storefront />
									<p>Locations</p>
								</div>
								<ArrowRightAltOutlined />
							</NavItem>
							<Divider />
							<NavItem to={ROUTES.ACCOUNT}>
								<div>
									<AccountCircleOutlined />
									<p>Account</p>
								</div>
							</NavItem>
							<NavItem to={ROUTES.ADMIN}>
								<div>
									<SupervisorAccountOutlined />
									<p>Admin</p>
								</div>
							</NavItem>
						</>
					)}
				</div>
			</CSSTransition>

			{Menus.map((menu, i) => (
				<SubMenu
					key={i}
					{...{ menu, setActiveMenu, activeMenu, calcHeight, toggleNav }}
				/>
			))}
		</NavMenuContainer>
	);
};
export default NavMenu;

const SubMenu = ({
	menu,
	setActiveMenu,
	activeMenu,
	calcHeight,
	toggleNav,
}) => (
	<CSSTransition
		in={activeMenu === menu}
		timeout={500}
		classNames='menu-secondary'
		onEnter={calcHeight}
		unmountOnExit>
		<div className='menu'>
			<NavItem onClick={() => setActiveMenu('main')}>
				<div>
					<ArrowBackOutlined />
					<p>Go back</p>
				</div>
			</NavItem>
			<Link to={`/new/${menu}`} onClick={toggleNav}>
				<NavItem>
					<div>
						<Add />
						<p>
							Add a <span className='menu-name'>{menu}</span>
						</p>
					</div>
				</NavItem>
			</Link>
			<Link to={`/${menu}s`} onClick={toggleNav}>
				<NavItem>
					<div>
						<ListAltOutlined />
						<p>
							View all <span className='menu-name'>{menu}s</span>
						</p>
					</div>
				</NavItem>
			</Link>
		</div>
	</CSSTransition>
);
