import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const HomePage = () => {
	const state = useSelector((state) => state);

	return (
		<HomeStyled>
			<h2>{state?.master?.name}</h2>
			<div className='tickets'>
				<h4>Open tickets</h4>
				<p>{state.tickets.ids.length}</p>
			</div>
			<div className='locations'>
				<h4>Total Locations</h4>
				<p>{state.locations.ids.length}</p>
			</div>
		</HomeStyled>
	);
};

const HomeStyled = styled.div`
	display: flex;
	flex-direction: column;
`;

export default HomePage;
