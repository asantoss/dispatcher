import React from 'react';

import Table from '../../Components/shared/Table';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import { useSelector } from 'react-redux';

export default function Boards() {
	const { status, boards } = useSelector((state) => state);

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
