import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';
import Table from '../../Components/shared/Table';

export default function BoardList() {
	const [state, setState] = useState({ isLoading: true, board: [] });

	const firebase = useContext(FirebaseContext);
	const { currentMaster } = useSelector(({ user }) => user);
	useEffect(() => {
		const listener = firebase.getMasterBoardsListener((boards) => {
			setState((s) => ({ isLoading: false, boards }));
		});
		return () => {
			listener();
		};
	}, [firebase, setState, currentMaster]);
	if (state.isLoading) {
		return <div className='spinner'></div>;
	}
	return (
		<Table data={state.boards} headers={['game', 'manufacturer', 'actions']} />
	);
}
