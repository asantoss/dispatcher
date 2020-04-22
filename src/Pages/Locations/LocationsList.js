import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { LocationContext } from './LocationController';
import { useSelector, useDispatch } from 'react-redux';
import Filters from './Filters';
import * as ACTIONS from '../../constants/actions';
import TableComponent from '../../Components/shared/Table';

export default function LocationsList() {
	const { allLocations, loading, error, filtered } = useSelector(
		({ locations }) => locations
	);
	const dispatch = useDispatch();
	const LocationController = useContext(LocationContext);

	const [state, setState] = useState([]);

	useEffect(() => {
		if (!allLocations.length) {
			dispatch(ACTIONS.FIRED());
			LocationController.getMasterLocations()
				.then((locations) => {
					dispatch(ACTIONS.FULFILLED());
					return locations;
				})
				.then((payload) => {
					dispatch(ACTIONS.SET_ALL_LOCATIONS(payload));
				})
				.catch((e) => dispatch(ACTIONS.ERROR(e.message)));
		}
		if (filtered?.length) {
			setState(filtered);
		} else {
			setState(allLocations);
		}
		return () => {
			setState(null);
		};
	}, [dispatch, LocationController, allLocations, setState, filtered]);

	return (
		<div>
			{error && <p>{error}</p>}
			{loading ? (
				<div className='spinner' />
			) : state?.length ? (
				<>
					<Filters />
					<TableComponent
						{...{
							data: state,
							headers: ['license', 'name', 'city', 'actions'],
						}}
					/>
				</>
			) : (
				<p>No Locations Found</p>
			)}
		</div>
	);
}
