import React from 'react';
import usePanelBar from '../../hooks/PanelBar';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import BoardForm from '../../Components/Forms/BoardForm';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../constants/actions';

export default function Board() {
	const tabs = ['Info', 'Edit'];
	const { id } = useParams();

	const dispatch = useDispatch();
	const { boards, status } = useSelector((state) => state);

	const [value, PanelBar, Panel] = usePanelBar(tabs);

	const formSubmit = (values) => {
		dispatch(ACTIONS.UPDATE_BOARD({ id, values }));
	};

	if (status.loading) {
		return <div className='spinner'></div>;
	}

	const board = boards.entities[id];
	return (
		<Container>
			{status?.error && <p>{status?.error}</p>}
			<Breadcrumb name={board?.refrence} />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				{/* <p>{board.game}</p> */}
				<p>{board?.manufacturer}</p>
				<p>{board?.type}</p>
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
