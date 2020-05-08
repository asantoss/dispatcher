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
	const [status, setStatus] = useState(null);
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
		location,
		billAcceptor,
		board,
		docId,
		serial,
	} = terminal;
	return (
		<Container>
			<Breadcrumb name={terminal?.serial} />
			{status && <p>{status}</p>}
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
					setStatus={setStatus}
					location={location}
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
