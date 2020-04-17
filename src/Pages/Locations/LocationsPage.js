import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import LocationsList from './LocationsList';
import LocationForm from './Location';
import { Add } from '@material-ui/icons';
const LocationsPageContainer = styled.div`
	padding: 1em 0;
	display: flex;
	flex-direction: column;
`;

export default function LocationsPage({}) {
	const [state, setState] = useState(true);
	return (
		<LocationsPageContainer>
			<div className='btn-group'>
				<Button
					variant='outlined'
					disabled={!state}
					onClick={() => setState(false)}>
					<Add /> Add
				</Button>
				<Button
					variant='outlined'
					disabled={state}
					onClick={() => setState(true)}>
					All
				</Button>
			</div>
			{state ? <LocationsList /> : <LocationForm />}
		</LocationsPageContainer>
	);
}
