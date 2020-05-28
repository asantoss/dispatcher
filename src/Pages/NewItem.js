import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BoardForm from '../Components/Forms/BoardForm';
import LocationForm from '../Components/Forms/LocationForm';
import TerminalForm from '../Components/Forms/TerminalForm';
import TicketForm from '../Components/Forms/TicketForm';
import { FirebaseContext } from '../Firebase';
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../constants/actions';
export default function NewItem() {
	const { item } = useParams();
	const firebase = useContext(FirebaseContext);
	const dispatch = useDispatch();

	const locationSubmit = (values) => {
		dispatch(ACTIONS.CREATE_LOCATION({ id: values.license, values }));
	};

	const boardSubmit = (values) => {
		debugger;
		dispatch(ACTIONS.CREATE_BOARD({ id: values.refrence, values }));
	};

	const terminalSubmit = (values) => {
		debugger;
		dispatch(ACTIONS.CREATE_TERMINAL({ id: values.serial, values }));
	};

	const ticketSubmit = (values) => {
		return firebase
			.addTicket(values)
			.then((res) => {
				alert('Success created a new ticket for: ' + values?.location?.name);
			})
			.catch((e) => {
				alert('Error: ' + e.message);
			});
	};

	return (
		<div style={{ padding: '1rem' }}>
			{item && <h2>New {item}</h2>}
			{item === 'board' && <BoardForm onSubmit={boardSubmit} />}
			{item === 'location' && <LocationForm onSubmit={locationSubmit} />}
			{item === 'ticket' && <TicketForm onSubmit={ticketSubmit} />}
			{item === 'terminal' && <TerminalForm onSubmit={terminalSubmit} />}
		</div>
	);
}
