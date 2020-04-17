import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LocationContext } from './LocationController';

export default function LocationPage() {
	const history = useHistory();
	const LocationInterface = useContext(LocationContext);
	const [state, setState] = useState(null);
	const { location, match } = history;
	useEffect(() => {
		if (location.state) {
			setState((s) => ({ ...location.state }));
		} else {
			if (match) {
				LocationInterface.getLocation(match.params.id).then((results) => {
					setState(...results);
				});
			}
		}
	}, [location, setState, match, LocationInterface]);
	return (
		<LocationPageContainer>
			<h3>{state?.address}</h3>
		</LocationPageContainer>
	);
}

const LocationPageContainer = styled.div``;
