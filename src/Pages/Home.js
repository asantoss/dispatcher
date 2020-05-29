import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../Firebase';
import styled from 'styled-components';
const HomePage = () => {
	const { user } = useSelector((state) => state);
	const [state, setState] = useState({
		tickets: [],
		locations: 0,
		terminals: 0,
	});
	const firebase = useContext(FirebaseContext);
	useEffect(() => {
		const ticketsListener = firebase.getMasterTicketsListener((tickets) => {
			setState((s) => ({ ...s, tickets }));
		});

		firebase.db
			.collection(`${firebase.master}/locations`)
			.get()
			.then((snap) => {
				setState((s) => ({ ...s, locations: snap.size }));
			});
		return () => {
			ticketsListener();
		};
	}, [firebase]);
	return (
		<HomeStyled>
			<h2>{user?.currentMaster?.name}</h2>
			<div className='tickets'>
				<h4>Open tickets</h4>
				<p>{state.tickets.length}</p>
			</div>
			<div className='locations'>
				<h4>Total Locations</h4>
				<p>{state.locations.length}</p>
			</div>
		</HomeStyled>
	);
};

const HomeStyled = styled.div`
	display: flex;
	flex-direction: column;
`;

export default HomePage;
