import React, { useEffect } from 'react';

import Table from '../../Components/shared/Table';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from '../../constants/actions';

export default function Boards() {
	const dispatch = useDispatch();
	const { status, boards } = useSelector((state) => state);

	useEffect(() => {
		dispatch(ACTIONS.GET_ALL_BOARDS());
	}, [dispatch]);

	if (status.isLoading) {
		return <div className='spinner'></div>;
	}
	return (
		<>
			<Breadcrumb />
			<Table data={boards} headers={['game', 'manufacturer', 'view']} />
		</>
	);
}
