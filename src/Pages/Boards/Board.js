import React, { useEffect, useState, useContext } from 'react';
import usePanelBar from '../../hooks/PanelBar';
import styled from 'styled-components';
import { useLocation, useRouteMatch, Link } from 'react-router-dom';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import BoardForm from '../../Components/Forms/BoardForm';

import { FirebaseContext } from '../../Firebase';

export default function Board() {
	const tabs = ['Info', 'Edit'];
	const { state } = useLocation();
	const firebase = useContext(FirebaseContext);
	const {
		params: { id },
	} = useRouteMatch();

	const [isLoading, setLoading] = useState(true);
	const [status, setStatus] = useState(null);
	const [board, setBoard] = useState(null);
	useEffect(() => {
		if (id) {
			firebase
				.getBoard(id)
				.then((board) => {
					setLoading(false);
					setBoard(board);
				})
				.catch((e) => console.log(e));
		} else {
			setBoard(state?.data);
			setLoading(false);
		}
	}, [id, firebase, state]);

	const [value, PanelBar, Panel] = usePanelBar(
		tabs,
		state?.panel && tabs.indexOf(state.panel)
	);
	const formSubmit = (values) => {
		const { docId, ...boardInfo } = values;
		return firebase
			.updateBoard(docId, boardInfo)
			.then(() => setStatus('Successfuller added board: ' + values?.refrence));
	};
	if (isLoading) {
		return <div className='spinner'></div>;
	}
	return (
		<Container>
			{status && <p>{status}</p>}
			<Breadcrumb name={board?.refrence} />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				{/* <p>{board.game}</p> */}
				<div className='information'>
					<h4>Game</h4>
					<p>{board?.game}</p>
					<h4>Manufacturer</h4>
					<p>{board?.manufacturer}</p>
					<h4>Type</h4>
					<p>{board?.type}</p>
					<h4>Terminal</h4>
					{board?.terminalId ? (
						<>
							<p>{board.terminalId}</p>
							<Link to={`/terminals/${board.terminalId}`}>View</Link>
						</>
					) : (
						<p>No terminal set.</p>
					)}
				</div>
			</Panel>
			<Panel {...{ value, index: 1 }}>
				<BoardForm onSubmit={formSubmit} initialState={board} />
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
