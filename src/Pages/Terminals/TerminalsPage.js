import React, { useEffect } from 'react';
import TableComponent from '../../Components/shared/Table';

import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_TERMINALS } from '../../constants/actions';

export default function Terminals() {
	const dispatch = useDispatch();
	const { status, terminals } = useSelector((state) => state);
	useEffect(() => {
		dispatch(GET_ALL_TERMINALS());
	}, [dispatch]);
	if (status.loading) {
		return <div alt='loader' className='spinner'></div>;
	}
	return (
		<TableComponent
			{...{
				data: terminals,
				headers: ['serial', 'type', 'view'],
			}}
		/>
	);
}
