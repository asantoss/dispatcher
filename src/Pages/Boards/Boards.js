import React, { useState, useContext, useEffect } from 'react';

import Table from '../../Components/shared/Table';
import { FirebaseContext } from '../../Firebase';
import Breadcrumb from '../../Components/shared/Breadcrumb';
export default function Boards() {
	const [state, setState] = useState({ isLoading: true, board: [] });
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.getMasterBoardsListener((boards) => {
			setState((s) => ({ isLoading: false, boards }));
		});
		return () => {
			listener();
		};
	}, [firebase, setState]);

	if (state.isLoading) {
		return <div className='spinner'></div>;
	}
	return (
		<>
			<Breadcrumb />
			<Table
				data={state.boards}
				headers={['game', 'manufacturer', 'actions']}
			/>
		</>
	);
}
