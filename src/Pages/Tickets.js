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
	const handleComplete = (id) => {
		firebase.updateTicket(id, { complete: true });
	};
	if (isLoading) {
		return <div className='spinner'></div>;
	}
	return state.length ? (
		state.map((ticket, i) => (
			<Ticket {...{ ticket, key: i, handleDelete, handleComplete }} />
		))
	) : (
		<p>No data found</p>
	);
}
