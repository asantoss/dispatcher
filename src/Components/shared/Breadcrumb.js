import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
export default function Breadcrumb({ name }) {
	return (
		<Breadcrumbs style={{ margin: '0.2em' }}>
			<Link to='/home' alt='Link back home'>
				Home
			</Link>
			<Link to='/locations' alt='Link back to all locations'>
				Locations
			</Link>
			{name && <p>{name}</p>}
		</Breadcrumbs>
	);
}
