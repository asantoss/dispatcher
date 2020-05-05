import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';
import Table from '../../Components/shared/Table';

export default function BoardList() {
	const [state, setState] = useState([]);

	const firebase = useContext(FirebaseContext);
	const { currentMaster } = useSelector(({ user }) => user);
	useEffect(() => {
		firebase.getMasterBoards(currentMaster.path).then((res) => {
			setState(res);
		});
	}, [firebase, setState, currentMaster]);
	return (
		<div>
			<Table data={state} headers={['game', 'manufacturer', 'view']} />
			<pre>{JSON.stringify(state, null, 2)}</pre>
		</div>
	);
}
