import React, { useEffect, useContext, useState } from 'react';
import TableComponent from '../../Components/shared/Table';
import TerminalForm from '../../Components/Terminals/TerminalForm';
import { FirebaseContext } from '../../Firebase';

import usePanelBar from '../../hooks/PanelBar';

export default function TerminalPage() {
	const [state, setState] = useState({
		isLoading: true,
		terminals: [],
	});
	const tabs = ['All', 'New'];
	const [value, PanelBar, Panel] = usePanelBar(tabs);
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.getMasterTerminalsListener((terminals) => {
			setState(() => ({ isLoading: false, terminals }));
		});
		return () => {
			listener();
		};
	}, [firebase]);
	return (
		<div>
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				<TableComponent
					{...{
						data: state.terminals.map((e) => {
							return { ...e, game: e?.board?.game ?? 'N/A' };
						}),
						headers: ['serial', 'type', 'game', 'actions'],
					}}
				/>
			</Panel>
			<Panel {...{ value, index: 1 }}>
				<TerminalForm />
			</Panel>
		</div>
	);
}
