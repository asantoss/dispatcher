import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { LocationContext } from './LocationController';

// import * as ACTIONS from '../../constants/actions';
import TableComponent from '../../Components/shared/Table';

export default function LocationsList() {
	const LocationController = useContext(LocationContext);
	const [data, setState] = useState([]);
	const [{ error, loading }, setError] = useState({
		loading: false,
		error: null,
	});

	useEffect(() => {
		setError((s) => ({ ...s, loading: true }));
		LocationController.getMasterLocations()
			.then((payload) => {
				setError((s) => ({ ...s, loading: false }));
				setState(payload);
			})
			.catch((e) => {
				setError((s) => ({ ...s, error: e.message }));
				console.error(e);
			});
		return () => {
			setState(null);
		};
	}, [LocationController]);

	return (
		<div>
			{error && <p>{error}</p>}
			{loading && <div className='spinner' />}
			<TableComponent
				{...{
					data,
					headers: ['license', 'name', 'city', 'actions'],
				}}
			/>
		</div>
	);
}
