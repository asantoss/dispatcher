import React from 'react';
import { Global, css } from '@emotion/core';
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
						margin: 2rem auto;
						max-width: 600px;
					}
				`}
			/>
			<main>{children}</main>
		</>
	);
};

export default Layout;
