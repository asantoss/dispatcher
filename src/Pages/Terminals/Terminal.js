import React from 'react';
import usePanelBar from '../../hooks/PanelBar';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
export default function Terminal() {
	const tabs = ['Info', 'Edit'];
	const { state } = useLocation();
	const [value, PanelBar, Panel] = usePanelBar(tabs);
	return (
		<Container>
			<PanelBar>
				<Panel {...{ value }}>
					<p>{state.game}</p>
					<p>{state.manufacturer}</p>
					<p>{state.type}</p>
				</Panel>
			</PanelBar>
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
