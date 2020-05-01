import React, { useReducer } from 'react';
import { Button } from '@material-ui/core';
import { Add, ListAltOutlined, NewReleasesOutlined } from '@material-ui/icons';
import TerminalsChecked from '../../Components/Terminals/TerminalListSelect';
import TerminalForm from '../../Components/Terminals/TerminalForm';
import Terminals from '../../Components/Terminals/Terminals';

import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	.btn-group {
		display: flex;
		justify-content: space-around;
	}
`;

export default function LocationTerminals({ location, currentMaster }) {
	const [state, dispatch] = useReducer(reducer, {
		isAdding: false,
		isNew: false,
		all: true,
	});
	const { isNew, isAdding, all } = state;
	const handleClick = (type) => {
		dispatch({ type });
	};
	return (
		<Container>
			<div className='btn-group'>
				<Button
					variant='contained'
					color='default'
					name='isAdding'
					onClick={() => handleClick('IS_ADDING')}
					startIcon={<Add />}>
					Add
				</Button>
				<Button
					variant='contained'
					color='default'
					name='isNew'
					onClick={() => handleClick('IS_NEW')}
					startIcon={<NewReleasesOutlined />}>
					New
				</Button>
				<Button
					variant='contained'
					color='default'
					name='isNew'
					onClick={() => handleClick('ALL')}
					startIcon={<ListAltOutlined />}>
					All
				</Button>
			</div>
			{isAdding && <TerminalsChecked {...{ location }} />}
			{isNew && <TerminalForm {...{ currentMaster, location }} />}
			{all && <Terminals terminals={location?.terminals} />}
		</Container>
	);
}

function reducer(state, action) {
	switch (action.type) {
		case 'IS_ADDING':
			return {
				isAdding: true,
				isNew: false,
				all: false,
			};
		case 'IS_NEW':
			return {
				isAdding: false,
				isNew: true,
				all: false,
			};
		case 'ALL':
			return {
				isAdding: false,
				isNew: false,
				all: true,
			};
		default:
			return state;
	}
}
