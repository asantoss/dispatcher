import React, { useEffect, useContext } from 'react';
// import data from '../data/data.json';
import styled from '@emotion/styled';
import { useState } from 'react';
import { LocationContext } from './LocationController';

export default function Locations() {
	const LocationController = useContext(LocationContext);
	const [state, setState] = useState({
		loading: false,
		locations: [],
		error: null,
	});

	useEffect(() => {
		LocationController.getMasterLocations()
			.then((locations) => {
				debugger;
				setState((s) => ({ loading: false, locations, error: null }));
			})
			.catch((e) => setState((s) => ({ ...s, error: e.message })));
	}, [setState, LocationController]);
	const { loading, locations, error } = state;
	return (
		<LocationList>
			{error && error}
			{loading ? (
				<p>Loading....</p>
			) : (
				<>
					{locations?.length ? (
						locations?.map((location) => {
							return <pre>{JSON.stringify(location, null, 2)}</pre>;
						})
					) : (
						<p>You don't have locations yet</p>
					)}
				</>
			)}
		</LocationList>
	);
}

const LocationList = styled.ul`
	list-style: none;
	li {
		display: flex;
		flex-wrap: wrap;
		margin: 5rem 0 0 0;
		h3 {
			flex-grow: 2;
		}
	}
`;
