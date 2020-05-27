import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import Breadcrumb from '../../Components/shared/Breadcrumb';
import usePanelBar from '../../hooks/PanelBar';
import TerminalForm from '../../Components/Forms/TerminalForm';
import { useSelector, useDispatch } from 'react-redux';
import {
	GET_ALL_TERMINALS,
	UPDATE_BOARD,
	UPDATE_TERMINAL,
} from '../../constants/actions';
export default function Terminal() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [value, PanelBar, Panel] = usePanelBar(['Info', 'Edit']);
	const { status, terminals } = useSelector((state) => state);
	useEffect(() => {
		dispatch(GET_ALL_TERMINALS());
	}, [dispatch]);

	if (status.loading) {
		return <div className='spinner' />;
	}
	const terminal = terminals.entities[id];

	const formSubmit = async (values) => {
		if (values?.boardId) {
			dispatch(
				UPDATE_BOARD({ id: values.boardId, values: { terminalId: id } })
			);
		} else {
			if (!values.boardId) {
				dispatch(
					UPDATE_BOARD({ id: values.boardId, values: { terminalId: id } })
				);
			}
		}
		return dispatch(UPDATE_TERMINAL({ id, values }));
	};
	return (
		<Container>
			<Breadcrumb name={terminal?.serial} />
			<PanelBar />
			<Panel {...{ value, index: 0 }}>
				<p>{terminal?.type}</p>
				<p>{terminal?.manufacturer}</p>
				<p>{terminal?.monitor}</p>
				<p>{terminal?.billAcceptor}</p>
			</Panel>
			<Panel {...{ value, index: 1 }}>
				<TerminalForm initialState={terminal} onSubmit={formSubmit} />
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
