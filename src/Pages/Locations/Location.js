import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LocationContext } from './LocationController';
import LocationForm from './LocationForm';
import usePanelBar from '../../Components/shared/PanelBar';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import * as ACTIONS from '../../constants/actions';

export default function LocationPage() {
	const tabs = ['Info', 'Terminals', 'Edit'];
	const { id } = useParams();
	const { state } = useLocation();
	const [value, PanelBar, Panel] = usePanelBar(
		tabs,
		state?.panel && tabs.indexOf(state?.panel)
	);
	const LocationInterface = useContext(LocationContext);
	const dispatch = useDispatch();

	const { loading, currentLocation } = useSelector((state) => state.locations);

	useEffect(() => {
		if (state) {
			dispatch(ACTIONS.SET_CURRENT_LOCATION(state.location));
		} else if (id) {
			dispatch(ACTIONS.FIRED());
			LocationInterface.getLocation(id)
				.then((results) => {
					dispatch(ACTIONS.FULFILLED());
					return results;
				})
				.then((payload) => dispatch(ACTIONS.SET_CURRENT_LOCATION(payload)))
				.catch((e) => dispatch(ACTIONS.ERROR(e.message)));
		}
	}, [state, id, LocationInterface, dispatch]);

	return (
		<LocationPageContainer>
			<Breadcrumb {...{ name: currentLocation?.name }} />
			{loading ? (
				<div className='spinner'></div>
			) : (
				<>
					<PanelBar />
					<Panel value={value} index={0}>
						All Info
					</Panel>
					<Panel value={value} index={1}>
						"Terminals"
					</Panel>
					<Panel value={value} index={2}>
						<LocationForm
							{...{
								docId: currentLocation?.docId,
								initialState: currentLocation && initialState(currentLocation),
							}}
						/>
					</Panel>
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
		terminals: state?.terminals || 0,
		address: state?.address || '',
		city: state?.city || '',
		id: state?.id || '',
		zipCode: state?.zipCode || '',
	};
}
