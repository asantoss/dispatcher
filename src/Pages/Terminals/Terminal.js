import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FirebaseContext } from '../../Firebase';
import styled from 'styled-components';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import usePanelBar from '../../hooks/PanelBar';
import TerminalForm from '../../Components/Forms/TerminalForm';
export default function Terminal() {
	const firebase = useContext(FirebaseContext);
	const {
		params: { id },
	} = useRouteMatch();
	const [terminal, setTerminal] = useState({});
	const [isLoading, setisLoading] = useState(true);
	const [value, PanelBar, Panel] = usePanelBar(['Info', 'Edit']);

	useEffect(() => {
		if (id) {
			firebase.getTerminal(id).then((results) => {
				setTerminal({ ...results, location: null });
				if (results?.locationId) {
					firebase.getLocation(results.locationId).then((location) => {
						if (location) {
							setTerminal((s) => ({ ...s, location }));
						}
						setisLoading(false);
					});
				} else {
					setisLoading(false);
				}
			});
		}
	}, [id, firebase]);

	if (isLoading) {
		return <div className='spinner' />;
	}
	const {
		monitor,
		type,
		manufacturer,
		billAcceptor,
		board,
		docId,
		serial,
	} = terminal;

	const formSubmit = async ({ docId, ...values }) => {
		if (values?.boardId) {
			await firebase.updateBoard(values.boardId, { terminalId: docId });
			values.board.terminalId = docId;
		} else {
			// values.boardId = null;
			// values.board.terminalId = null;
			if (board?.docId) {
				await firebase.updateBoard(board.boardId, { terminalId: null });
			}
		}
		return firebase
			.updateTerminal({ ...values }, docId)
			.then(() => {
				alert('Successfuller updated terminal: ' + values?.serial);
			})
			.catch((e) => alert('Error: ' + e.message));
	};
	return (
		<Container>
			<Breadcrumb name={terminal?.serial} />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				<p>{type}</p>
				<p>{manufacturer}</p>
				<p>{monitor}</p>
				<p>{billAcceptor}</p>
			</Panel>
			<Panel {...{ value, index: 1 }}>
				<TerminalForm
					initialState={{
						monitor,
						type,
						manufacturer,
						billAcceptor,
						board,
						docId,
						serial,
					}}
					onSubmit={formSubmit}
				/>
			</Panel>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	[role='tablist'] {
		justify-content: space-between;
	}
`;
