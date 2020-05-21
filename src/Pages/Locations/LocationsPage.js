import React, { useState, useEffect, useContext } from 'react';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import TableComponent from '../../Components/shared/Table';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';

export default function LocationsPage() {
	const locations = useSelector((state) => state.locations);
	const firebase = useContext(FirebaseContext);
	const [data, setState] = useState([]);
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	const listener = firebase.getMasterLocationsListener((payload) => {
	// 		setLoading(false);
	// 		setState(payload);
	// 	});
	// 	return () => {
	// 		listener();
	// 		setState(null);
	// 	};
	// }, [firebase]);

	if (loading) {
		return <div className='spinner' />;
	}
	return (
		<>
			<Breadcrumb />
			<TableComponent
				{...{
					data: locations.entities,
					headers: ['name', 'city', 'actions'],
				}}
			/>
		</>
	);
}
