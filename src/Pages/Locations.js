import React, { useEffect, useContext } from 'react';
// import data from '../data/data.json';
import styled from '@emotion/styled';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Components/Session';
import { useState } from 'react';

export default function Locations() {
	const firebase = useContext(FirebaseContext);
	const authUser = useContext(AuthUserContext);
	const [state, setState] = useState({ loading: false, locations: [] });
	useEffect(() => {
		if (authUser && authUser.master) {
			setState((s) => ({ ...s, loading: true }));
			firebase
				.doGetMasterLocations(authUser.master)
				.then((data) => setState({ loading: false, locations: [...data] }));
		}
	}, [authUser, firebase]);
	const { loading, locations } = state;
	return (
		<LocationList>
			{loading ? (
				<p>Loading....</p>
			) : (
				<>
					{locations.length ? (
						locations.map((location) => {
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
