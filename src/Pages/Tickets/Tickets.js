import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import Ticket from '../../Components/Ticket';
import TicketStyled from './Tickets.styled';
import { Button } from '@material-ui/core';
import { useRef } from 'react';
export default function Tickets() {
	const [state, setstate] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const firebase = useContext(FirebaseContext);
	const allTicketsRef = useRef(null);
	useEffect(() => {
		const listener = firebase.getMasterTicketsListener((tickets) => {
			setLoading(false);
			setstate(tickets);
			allTicketsRef.current = tickets;
		});
		return () => {
			listener();
		};
	}, [firebase]);

	const handleDelete = (id) => {
		firebase.removeTicket(id);
	};

	const toggleComplete = (id, state) => {
		firebase.updateTicket(id, { complete: !state });
	};

	const filter = (key) => {
		switch (key) {
			case 'Open':
				return setstate(allTicketsRef.current.filter((e) => !e.complete));
			case 'Closed':
				return setstate(allTicketsRef.current.filter((e) => e.complete));
			default:
				return setstate(allTicketsRef.current);
		}
	};

	if (isLoading) {
		return <div className='spinner'></div>;
	}

	return (
		<TicketStyled>
			<div className='ticket_list'>
				<div className='controls'>
					<Button onClick={() => filter()} variant='outlined'>
						All
					</Button>
					<Button onClick={() => filter('Open')} variant='outlined'>
						Open
					</Button>
					<Button onClick={() => filter('Closed')} variant='outlined'>
						Closed
					</Button>
				</div>
				{state.length ? (
					state.map((ticket, i) => (
						<Ticket {...{ ticket, key: i, handleDelete, toggleComplete }} />
					))
				) : (
					<p>No data found</p>
				)}
			</div>
		</TicketStyled>
	);
}
