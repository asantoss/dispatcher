import React from 'react';
import Ticket from '../../Components/Ticket';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_TICKET, REMOVE_TICKET } from '../../constants/actions';
import styled from 'styled-components';

export default function Tickets() {
	const { tickets, status } = useSelector((state) => state);
	const dispatch = useDispatch();
	const handleClose = (id) => {
		dispatch(REMOVE_TICKET({ id }));
	};

	const toggleComplete = (id, state) => {
		dispatch(UPDATE_TICKET({ id, values: { complete: !state } }));
	};
	const toggleList = (id, list) => {
		dispatch(UPDATE_TICKET({ id, values: { list } }));
	};

	if (status.loading) {
		return <div className='spinner'></div>;
	}
	if (!tickets.ids.length) {
		return (
			<div>
				<h3>Congrats there are no tickets.</h3>
			</div>
		);
	}

	return (
		<Board>
			<div className='backlog'>
				<h3>Backlog</h3>
				{tickets.ids.map((id) => {
					const ticket = tickets.entities[id];
					if (ticket.list === 'backLog' && !ticket.complete) {
						return (
							<Ticket
								{...{ id, key: id, handleClose, toggleComplete, toggleList }}
							/>
						);
					}
					return null;
				})}
			</div>
			<div className='inProgress'>
				<h3>In Progress</h3>
				{tickets.ids.map((id) => {
					const ticket = tickets.entities[id];
					if (ticket.list === 'inProgress' && !ticket.complete) {
						return (
							<Ticket
								{...{ id, key: id, handleClose, toggleComplete, toggleList }}
							/>
						);
					}
					return null;
				})}
			</div>
			<div className='done'>
				<h3>Done</h3>
				{tickets.ids.map((id) => {
					const ticket = tickets.entities[id];
					if (ticket.complete) {
						return (
							<Ticket
								{...{ id, key: id, handleClose, toggleComplete, toggleList }}
							/>
						);
					}
					return null;
				})}
			</div>
		</Board>
	);
}

const Board = styled.div`
	display: flex;
	height: 100vh;
	& > div {
		margin: 0 0.5rem;
		width: 40%;
		text-align: center;
		/* &:not(:last-child) {
			border-right: 1px solid grey;
		}
		&:not(:first-child) {
			border-left: 1px solid grey;
		} */
	}
`;
