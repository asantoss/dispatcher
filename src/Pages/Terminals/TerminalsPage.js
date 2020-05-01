import React, { useEffect, useContext, useState } from 'react';
import TableComponent from '../../Components/shared/Table';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';

export default function TerminalPage() {
	const [state, setState] = useState({
		isLoading: false,
		terminals: [],
	});
	const firebase = useContext(FirebaseContext);
	const { currentMaster } = useSelector((state) => state.user);
	useEffect(() => {
		if (currentMaster.path) {
			setState((s) => ({ ...s, isLoading: true }));
			firebase.getMasterTerminals(currentMaster.path).then((results) => {
				setState(() => ({ isLoading: false, terminals: results }));
			});
		}
	}, [firebase, currentMaster]);
	return (
		<div>
			<TableComponent
				{...{
					data: state.terminals,
					headers: ['serial', 'type', 'game', 'view'],
				}}
			/>
		</div>
	);
}
