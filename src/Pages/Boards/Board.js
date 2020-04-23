import React from 'react';
import usePanelBar from '../../hooks/PanelBar';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../Components/shared/Breadcrumb';

export default function Terminal() {
	const tabs = ['Info', 'Edit'];
	const { state } = useLocation();
	const [value, PanelBar, Panel] = usePanelBar(tabs);
	return (
		<Container>
			<Breadcrumb name={state?.game} />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				<p>{state.game}</p>
				<p>{state.manufacturer}</p>
				<p>{state.type}</p>
			</Panel>
			<Panel {...{ value, index: 1 }}>"Board"</Panel>
			<Panel {...{ value, index: 2 }}>"Edit"</Panel>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	[role='tablist'] {
		justify-content: space-between;
	}
`;
