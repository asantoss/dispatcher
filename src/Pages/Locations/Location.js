import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocationForm from '../../Components/Forms/LocationForm';
import usePanelBar from '../../hooks/PanelBar';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import * as ACTIONS from '../../constants/actions';
import LocationTerminals from './LocationTerminals';
import { FirebaseContext } from '../../Firebase';

export default function LocationPage() {
	const tabs = ['Info', 'Edit'];
	const { id } = useParams();
	const { state } = useLocation();
	const [value, PanelBar, Panel] = usePanelBar(
		tabs,
		state?.panel && tabs.indexOf(state?.panel)
	);
	const firebase = useContext(FirebaseContext);
	const dispatch = useDispatch();

	const {
		locations: { loading, currentLocation },
		user: { currentMaster },
	} = useSelector((state) => state);

	const formSubmit = (values) => {
		firebase.updateLocation(currentLocation.docId, values).then(() => {
			alert('Successfuller updated location: ' + values?.name);
			dispatch(ACTIONS.SET_CURRENT_LOCATION({ ...currentLocation, ...values }));
		});
	};
	useEffect(() => {
		if (id) {
			firebase
				.getLocation(id)
				.then((results) => {
					return results;
				})
				.then((payload) => dispatch(ACTIONS.SET_CURRENT_LOCATION(payload)))
				.catch((e) => dispatch(ACTIONS.ERROR(e.message)));
		}
	}, [id, firebase, dispatch]);

	if (loading) {
		return <div className='spinner' />;
	}

	return (
		<Container>
			<Breadcrumb {...{ name: currentLocation?.name }} />
			<PanelBar />
			<Panel value={value} index={0}>
				<div className='information'>
					<h4>Name:</h4>

					<p>{currentLocation?.name}</p>
					<h4>Address:</h4>
					<p>
						{currentLocation?.address} {currentLocation?.city},
						{currentLocation?.state}, {currentLocation?.zipCode}
					</p>

					<h4>Terminals:</h4>
					<p>{currentLocation?.terminalsTotal}</p>
					<LocationTerminals
						location={currentLocation}
						currentMaster={currentMaster}
					/>
				</div>
			</Panel>
			<Panel value={value} index={1}>
				<LocationForm
					{...{
						onSubmit: formSubmit,
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
