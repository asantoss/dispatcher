import React, { useState, useEffect, useContext } from 'react';
import { LocationContext } from './LocationController';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import TableComponent from '../../Components/shared/Table';

export default function LocationsPage() {
	const [LocationController] = useContext(LocationContext);
	const [data, setState] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const listener = LocationController.getMasterLocations((payload) => {
			setLoading(false);
			setState(payload);
		});
		return () => {
			listener();
			setState(null);
		};
	}, [LocationController]);

	if (loading) {
		return <div className='spinner' />;
	}
	return (
		<>
			<Breadcrumb />
			<TableComponent
				{...{
					data,
					headers: ['license', 'name', 'city', 'actions'],
				}}
			/>
		</>
	);
}
