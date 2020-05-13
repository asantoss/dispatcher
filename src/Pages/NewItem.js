import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BoardForm from '../Components/Forms/BoardForm';
import LocationForm from '../Components/Forms/LocationForm';
import TerminalForm from '../Components/Forms/TerminalForm';
import TicketForm from '../Components/Forms/TicketForm';
import { FirebaseContext } from '../Firebase';

export default function NewItem() {
	const { item } = useParams();
	const firebase = useContext(FirebaseContext);

	const locationSubmit = (values) => {
		firebase
			.createLocation(values)
			.then(() => {
				// resetForm();
				alert('Successfully created location: ' + values?.name);
			})
			.catch((e) => alert('Error: ' + e.message));
	};

	const boardSubmit = (values) => {
		const { docId, ...boardInfo } = values;
		return firebase
			.addBoard({ ...boardInfo, terminalId: null })
			.then(() => alert('Successfuller added board: ' + values?.refrence))
			.catch((e) => {
				alert('Error ' + e.message);
			});
	};

	const terminalSubmit = async ({ board, ...values }) => {
		const docRef = await firebase.addTerminalToMaster(values).catch((e) => {
			alert('Error: ' + e.message);
		});
		if (values?.boardId) {
			await firebase.updateBoard(values.boardId, { terminalId: docRef.id });
			board.terminalId = docRef.id;
		} else {
			values.boardId = null;
			board = null;
		}
		return firebase
			.updateTerminal({ ...values, board }, docRef.id)
			.then(() => {
				alert('Successfuller added a terminal: ' + values?.serial);
			})
			.catch((e) => alert('Error: ' + e.message));
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
