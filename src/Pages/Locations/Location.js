import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LocationContext } from './LocationController';
import LocationForm from './LocationForm';
import usePanelBar from '../../Components/shared/PanelBar';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Components/shared/Breadcrumb';

export default function LocationPage() {
	const { id } = useParams();
	const [value, PanelBar, PanelTab] = usePanelBar(['Info', 'Terminal', 'Edit']);

	const LocationInterface = useContext(LocationContext);
	const location = useLocation();
	const dispatch = useDispatch();
	const { loading, currentLocation } = useSelector((state) => state.locations);

	useEffect(() => {
		if (id) {
			dispatch({ type: 'FIRED' });
			LocationInterface.getLocation(id)
				.then((results) => {
					dispatch({ type: 'FUFILLED' });
					return results;
				})
				.then((payload) => dispatch({ type: 'SET_CURRENT_LOCATION', payload }))
				.catch((e) => dispatch({ type: 'ERROR', payload: e.message }));
		}
	}, [location, id, LocationInterface, dispatch]);
	return (
		<LocationPageContainer>
			<Breadcrumb {...{ name: currentLocation?.name }} />
			{loading ? (
				<div className='spinner'></div>
			) : (
				<>
					<PanelBar />
					<PanelTab value={value} index={0}>
						All Info
					</PanelTab>
					<PanelTab value={value} index={1}>
						"Terminals"
					</PanelTab>
					<PanelTab value={value} index={2}>
						<LocationForm
							{...{
								docId: currentLocation?.docId,
								initialState: currentLocation && initialState(currentLocation),
							}}
						/>
					</PanelTab>
				</>
			)}
		</LocationPageContainer>
	);
}

const LocationPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	[role='tablist'] {
		justify-content: space-between;
	}
`;

function initialState(state) {
	return {
		name: state?.name || '',
		state: state?.state || '',
		terminals: state?.terminals || ``,
		address: state?.address || '',
		city: state?.city || '',
		id: state?.id || '',
		zipCode: state?.zipCode || '',
	};
}
