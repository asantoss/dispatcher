import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LocationContext } from './LocationController';
import LocationForm from '../../Components/Forms/LocationForm';
import usePanelBar from '../../hooks/PanelBar';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import * as ACTIONS from '../../constants/actions';
import LocationTerminals from './LocationTerminals';

export default function LocationPage() {
	const tabs = ['Info', 'Terminals', 'Edit'];
	const { id } = useParams();
	const { state } = useLocation();
	const [value, PanelBar, Panel] = usePanelBar(
		tabs,
		state?.panel && tabs.indexOf(state?.panel)
	);
	const [LocationInterface] = useContext(LocationContext);
	const dispatch = useDispatch();

	const {
		locations: { loading, currentLocation },
		user: { currentMaster },
	} = useSelector((state) => state);

	useEffect(() => {
		if (id) {
			LocationInterface.getLocation(id)
				.then((results) => {
					return results;
				})
				.then((payload) => dispatch(ACTIONS.SET_CURRENT_LOCATION(payload)))
				.catch((e) => dispatch(ACTIONS.ERROR(e.message)));
		}
	}, [id, LocationInterface, dispatch]);

	if (loading) {
		return <div className='spinner' />;
	}

	return (
		<Container>
			<Breadcrumb {...{ name: currentLocation?.name }} />
			<PanelBar />
			<Panel value={value} index={0}>
				All Info
			</Panel>
			<Panel value={value} index={1}>
				<LocationTerminals
					location={currentLocation}
					currentMaster={currentMaster}
				/>
			</Panel>
			<Panel value={value} index={2}>
				<LocationForm
					{...{
						docId: currentLocation?.docId,
						initialState: currentLocation && initialState(currentLocation),
					}}
				/>
			</Panel>
		</Container>
	);
}

const Container = styled.div`
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
		terminalsTotal: state?.terminalsTotal || 0,
		address: state?.address || '',
		city: state?.city || '',
		license: state?.license || '',
		zipCode: state?.zipCode || '',
	};
}
