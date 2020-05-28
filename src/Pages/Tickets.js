import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import Ticket from '../Components/Ticket';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_TICKET } from '../constants/actions';

export default function Tickets() {
	const { tickets, status } = useSelector((state) => state);
	const dispatch = useDispatch();
	const handleClose = (id) => {
		dispatch(UPDATE_TICKET({ id, values: { complete: true, closed: true } }));
	};

	const toggleComplete = (id, state) => {
		dispatch(UPDATE_TICKET({ id, values: { complete: !state } }));
	};

	if (status.loading) {
		return <div className='spinner'></div>;
	}

	return tickets.ids.length ? (
		tickets.ids.map((id) => {
			return (
				<Ticket
					{...{
						key: id,
						handleClose,
						toggleComplete,
						id,
					}}
				/>
			);
		})
	) : (
		<p>No data found</p>
	);
}
