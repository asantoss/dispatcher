import React from 'react';
import styled from 'styled-components';
// import { Button } from '@material-ui/core';
import LocationsList from './LocationsList';
// import LocationForm from './Location';
// import { Add } from '@material-ui/icons';
import Breadcrumb from '../../Components/shared/Breadcrumb';

const LocationsPageContainer = styled.div`
	padding: 1em 0;
	display: flex;
	flex-direction: column;
	.filter {
		display: flex;
		padding: 0 0.5em;
		justify-content: space-between;
	}
`;

export default function LocationsPage() {
	return (
		<LocationsPageContainer>
			<Breadcrumb />
			<LocationsList />
		</LocationsPageContainer>
	);
}
