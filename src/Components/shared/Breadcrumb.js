import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Breadcrumb({ name }) {
	const { path } = useRouteMatch();
	const location = path.split('/')[1] || null;
	return (
		<Breadcrumbs style={{ margin: '0.2em', textTransform: 'uppercase' }}>
			<Link to='/home' alt='Link back home'>
				Home
			</Link>
			{location && <Link to={`/${location}`}>{location}</Link>}
			{name && <p>{name}</p>}
		</Breadcrumbs>
	);
}
