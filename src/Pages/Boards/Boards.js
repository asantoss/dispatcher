import React from 'react';
import BoardList from './BoardList';
import usePanelBar from '../../hooks/PanelBar';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import BoardForm from './BoardForm';

export default function Boards() {
	const tabs = ['All', 'New'];
	const [value, PanelBar, Panel] = usePanelBar(tabs);
	return (
		<div>
			<Breadcrumb />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				<BoardList />
			</Panel>
			<Panel {...{ value, index: 1 }}>
				<BoardForm isNew={true} />
			</Panel>
		</div>
	);
}
