import React from 'react';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import TableComponent from '../../Components/shared/Table';
import { useSelector } from 'react-redux';
export default function LocationsPage() {
	const { locations, status } = useSelector((state) => state);

	if (status.loading) {
		return <div className='spinner' />;
	}
	return (
		<>
			<Breadcrumb />
			<TableComponent
				{...{
					data: locations,
					headers: ['name', 'city', 'view'],
				}}
			/>
		</>
	);
}
