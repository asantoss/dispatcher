import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import Ticket from '../Components/Ticket';

export default function Tickets() {
	const [state, setstate] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const firebase = useContext(FirebaseContext);
	useEffect(() => {
		const listener = firebase.getMasterTicketsListener((tickets) => {
			setLoading(false);
			setstate(tickets);
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

	if (isLoading) {
		return <div className='spinner'></div>;
	}

	return state.length ? (
		state.map((ticket) => (
			<Ticket {...{ ticket, key: ticket.id, handleDelete, toggleComplete }} />
		))
	) : (
		<p>No data found</p>
	);
}
