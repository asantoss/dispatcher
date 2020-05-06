import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { LocationContext } from './LocationController';

// import * as ACTIONS from '../../constants/actions';
import TableComponent from '../../Components/shared/Table';

export default function LocationsList() {
	const [LocationController] = useContext(LocationContext);
	const [data, setState] = useState([]);
	const [loading, setLoading] = useState(false);

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
			<TableComponent
				{...{
					data,
					headers: ['license', 'name', 'city', 'actions'],
				}}
			/>
		</>
	);
}
