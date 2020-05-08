import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardForm from '../Components/Forms/BoardForm';
import LocationForm from '../Components/Forms/LocationForm';
import TerminalForm from '../Components/Forms/TerminalForm';
import TicketForm from '../Components/Forms/TicketForm';

export default function NewItem() {
	const { item } = useParams();
	const [status, setStatus] = useState(null);

	return (
		<div style={{ padding: '1rem' }}>
			{status && <p>{status}</p>}
			{item && <h2>New {item}</h2>}
			{item === 'board' && <BoardForm setStatus={setStatus} isNew={true} />}
			{item === 'location' && (
				<LocationForm setStatus={setStatus} isNew={true} />
			)}
			{item === 'ticket' && <TicketForm setStatus={setStatus} isNew={true} />}
			{item === 'terminal' && (
				<TerminalForm isNew={true} setStatus={setStatus} />
			)}
		</div>
	);
}
