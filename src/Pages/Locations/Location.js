import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocationForm from '../../Components/Forms/LocationForm';
import usePanelBar from '../../hooks/PanelBar';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import * as ACTIONS from '../../constants/actions';
import LocationTerminals from './LocationTerminals';

export default function LocationPage() {
	const tabs = ['Info', 'Terminals', 'Edit'];
	const [location, setLocation] = useState({});
	const { id } = useParams();
	const [value, PanelBar, Panel] = usePanelBar(tabs);
	const dispatch = useDispatch();

	const { locations, status } = useSelector((state) => state);
	useEffect(() => {
		if (locations?.entities[id]) {
			setLocation(locations?.entities[id]);
		} else {
			dispatch(ACTIONS.GET_ALL_LOCATIONS());
		}
	}, [locations, id, dispatch]);
	const formSubmit = (values) => {
		dispatch(ACTIONS.UPDATE_LOCATION({ id, values }));
	};

	if (status.loading) {
		return <div className='spinner' />;
	}
	return (
		<Container>
			<Breadcrumb {...{ name: location?.name }} />
			<PanelBar />
			<Panel value={value} index={0}>
				All Info
			</Panel>
			<Panel value={value} index={1}>
				<LocationTerminals location={location} id={id} />
			</Panel>
			<Panel value={value} index={2}>
				<LocationForm
					{...{
						onSubmit: formSubmit,
						docId: location?.docId,
						initialState: location && initialState(location),
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
