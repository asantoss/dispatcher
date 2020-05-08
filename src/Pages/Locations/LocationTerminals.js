import React, { useReducer } from 'react';
import { Button } from '@material-ui/core';
import { Add, ListAltOutlined } from '@material-ui/icons';
import TerminalsChecked from '../../Components/Terminals/TerminalListSelect';
import Terminals from '../../Components/Terminals/Terminals';

import styled from 'styled-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	.btn-group {
		display: flex;
		justify-content: space-around;
	}

	.slide-in-enter {
		opacity: 0;
		&-done {
			opacity: 1;
			transition: all var(--speed) ease;
		}
	}
	.slide-in-exit {
		opacity: 1;
		&-active {
			opacity: 0;
			transition: all var(--speed) ease;
		}
	}
`;

export default function LocationTerminals({ location, currentMaster }) {
	const [state, dispatch] = useReducer(reducer, {
		isAdding: false,
		all: true,
	});
	const { isAdding, all } = state;
	const handleClick = (type) => {
		dispatch({ type });
	};
	return (
		<Container>
			{location?.terminals.length <= parseInt(location?.terminalsTotal) && (
				<div className='btn-group'>
					{isAdding ? (
						<Button
							variant='contained'
							color='default'
							name='isNew'
							style={{ filter: all && 'brightness(0.5)' }}
							onClick={() => handleClick('ALL')}
							startIcon={<ListAltOutlined />}>
							All
						</Button>
					) : (
						<Button
							variant='contained'
							color='default'
							name='isAdding'
							style={{ filter: isAdding && 'brightness(0.5)' }}
							onClick={() => handleClick('IS_ADDING')}
							startIcon={<Add />}>
							Select From Inventory
						</Button>
					)}
				</div>
			)}
			<SwitchTransition mode='out-in'>
				<CSSTransition
					key={isAdding}
					classNames='slide-in'
					addEndListener={(node, done) => {
						node.addEventListener('transitionend', done, false);
					}}
					timeout={200}
					appear={true}
					unmountOnExit>
					<div>
						{isAdding ? (
							<TerminalsChecked {...{ location }} />
						) : (
							<Terminals terminals={location?.terminals} />
						)}
					</div>
				</CSSTransition>
			</SwitchTransition>
		</Container>
	);
}

function reducer(state, action) {
	switch (action.type) {
		case 'IS_ADDING':
			return {
				isAdding: true,
				all: false,
			};
		case 'ALL':
			return {
				isAdding: false,
				all: true,
			};
		default:
			return state;
	}
}
