import React from 'react';
import { Global, css } from '@emotion/core';
import NavBar from './Navigation/NavBar';
const Layout = ({ children }) => {
	return (
		<>
			<Global
				styles={css`
					* {
						box-sizing: border-box;
						margin: 0;
					}
					main {
						margin: 1em auto;
						max-width: 600px;
						width: 100%;
					}
				`}
			/>
			<NavBar />
			<main>{children}</main>
		</>
	);
};

export default Layout;
