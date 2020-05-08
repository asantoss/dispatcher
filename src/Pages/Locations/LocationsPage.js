import React from 'react';
import styled from 'styled-components';
// import { Button } from '@material-ui/core';
import LocationsList from './LocationsList';
import LocationForm from './LocationForm';
// import { Add } from '@material-ui/icons';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import usePanelBar from '../../hooks/PanelBar';

const LocationsPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	.filter {
		display: flex;
		padding: 0 0.5em;
		justify-content: space-between;
	}
`;

export default function LocationsPage() {
	const tabs = ['All', 'New'];
	const [value, PanelBar, Panel] = usePanelBar(tabs);
	return (
		<LocationsPageContainer>
			<Breadcrumb />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				<LocationsList />
			</Panel>
			<Panel {...{ value, index: 1 }}>
				<LocationForm isNew={true} />
			</Panel>
		</LocationsPageContainer>
	);
}
