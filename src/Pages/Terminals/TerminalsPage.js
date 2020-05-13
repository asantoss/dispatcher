import React, { useEffect, useContext, useState } from 'react';
import TableComponent from '../../Components/shared/Table';
import { FirebaseContext } from '../../Firebase';

export default function Terminals() {
	const [state, setState] = useState({
		isLoading: true,
		terminals: [],
	});

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		let listener = () => {};
		if (firebase) {
			listener = firebase.getMasterTerminalsListener((terminals) => {
				setState(() => ({ isLoading: false, terminals }));
			});
		}
		return () => {
			if (listener) {
				listener();
			}
		};
	}, [firebase]);
	if (state.isLoading) {
		return <div alt='loader' className='spinner'></div>;
	}
	return (
		<TableComponent
			{...{
				data: state.terminals.map((e) => {
					return { ...e, game: e?.board?.game ?? 'N/A' };
				}),
				headers: ['serial', 'type', 'game', 'actions'],
			}}
		/>
	);
}
