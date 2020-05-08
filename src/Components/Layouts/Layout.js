import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import NavBar from './Navigation/NavBar';

const Layout = ({ children, user }) => {
	return (
		<>
			<GlobalStyle />
			<NavBar />
			<main>{children}</main>
		</>
	);
};

export default Layout;
