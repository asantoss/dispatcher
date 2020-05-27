import React, { useState, createContext, useReducer, useEffect } from 'react';
import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
} from '@material-ui/icons';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TablePagination,
	IconButton,
	useTheme,
} from '@material-ui/core';

import Filters from './Filters';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

export const TableContext = createContext(null);

function reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case 'INITIAL':
			return { ...state, originalData: payload, data: payload };
		case 'SET_DATA':
			return { ...state, data: payload };
		case 'FILTER':
			return { ...state, isFiltered: true, data: payload };
		case 'CANCEL':
			return { ...state, isFiltered: false, data: state.originalData };
		default:
			return state;
	}
}

export default function TableComponent({ data, headers }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [state, dispatch] = useReducer(reducer, {
		isFiltered: false,
		originalData: [],
		data: [],
		filtered: [],
	});

	useEffect(() => {
		if (data) {
			dispatch({ type: 'INITIAL', payload: data?.ids });
		}
		return () => {
			dispatch({ type: 'INITIAL', payload: [] });
		};
	}, [data]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const { pathname } = useLocation();

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return state.data?.length ? (
		<TableContext.Provider value={{ dispatch, state, headers }}>
			<StyledTable>
				<Filters />
				<Table stickyHeader className='table'>
					<TableHead>
						<TableRow>
							<TablePagination
								className='footer'
								rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
								count={
									state.isFiltered ? state.filtered.length : state.data.length
								}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
						<TableRow>
							{headers.map((head, i) => (
								<TableCell
									key={i}
									component='th'
									style={{ textTransform: 'uppercase' }}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? state.data.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
							  )
							: state.data
						).map((item, index) => {
							return (
								<TableRow key={item}>
									{headers?.map((head, i) => {
										if (head === 'view') {
											return (
												<TableCell key={i}>
													<Link
														to={{
															state: data?.entities[item],
															pathname: `${pathname}/${item}`,
														}}>
														View
													</Link>
												</TableCell>
											);
										}
										// if (head === 'actions') {
										// 	return (
										// 		<TableCell key={i}>
										// 			<Actions {...{ item: data?.entities[item], index }} />
										// 		</TableCell>
										// 	);
										// }
										return (
											<TableCell key={i}>{data.entities[item][head]}</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</StyledTable>
		</TableContext.Provider>
	) : (
		<p>No data found.</p>
	);
}

function TablePaginationActions({ count, page, rowsPerPage, onChangePage }) {
	const theme = useTheme();
	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div style={{ display: 'flex', flexGrow: 1 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				style={{ display: page === 0 ? 'none' : 'inline-flex' }}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				// style={{ display: page === 0 ? 'none' : 'inline-flex' }}
				aria-label='previous page'>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
			</IconButton>
		</div>
	);
}

const StyledTable = styled(TableContainer)`
	width: 100%;
	.filter {
		display: flex;
		justify-content: space-between;
		.sort {
			text-transform: capitalize;
			width: 120px;
		}
		.sort_opt {
			& > * {
				text-transform: capitalize;
			}
		}
	}
	.status {
		border-radius: 50%;
		height: 10px;
		width: 10px;
		margin: auto;
		background-color: green;
	}
	.table {
		td {
			text-transform: capitalize;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			max-width: 25%;
		}
	}
`;
