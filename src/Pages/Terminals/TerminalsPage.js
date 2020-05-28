import React from 'react';
import TableComponent from '../../Components/shared/Table';

import { useSelector } from 'react-redux';

export default function Terminals() {
	const { status, terminals } = useSelector((state) => state);
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
