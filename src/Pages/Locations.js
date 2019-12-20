import React from 'react';
import data from '../data/data.json';
import styled from '@emotion/styled';

export default function Locations() {
	return (
		<LocationList>
			{data.map((store, i) => {
				return (
					<li>
						<h3>{store.name}</h3>
						<span>{store.id}</span>
						<span>{store.address}</span>
						<div className='buttons'></div>
					</li>
				);
			})}
		</LocationList>
	);
}

const LocationList = styled.ul`
	list-style: none;
	li {
		display: flex;
		flex-wrap: wrap;
		margin: 5rem 0 0 0;
		h3 {
			flex-grow: 2;
		}
	}
`;
