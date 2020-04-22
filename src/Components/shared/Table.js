import React, { useState } from 'react';
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
	TableFooter,
	IconButton,
	useTheme,
} from '@material-ui/core';
import Actions from './Actions';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

export default function TableComponent({ data, headers }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const { pathname } = useLocation();

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<StyledTable>
			<Table stickyHeader className='table'>
				<TableHead>
					<TableRow>
						<TablePagination
							className='footer'
							rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
							count={data.length}
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
						? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: data
					)?.map((item, index) => {
						return (
							<TableRow key={item?.docId}>
								{headers?.map((head, i) => {
									if (head === 'view') {
										return (
											<TableCell key={i}>
												<Link
													to={{
														state: item,
														pathname: `${pathname}/${item?.docId}`,
													}}>
													View
												</Link>
											</TableCell>
										);
									}
									if (head === 'actions') {
										return (
											<TableCell key={i}>
												<Actions {...{ item, index }} />
											</TableCell>
										);
									}
									return <TableCell key={i}>{item[head]}</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter></TableFooter>
			</Table>
		</StyledTable>
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
	overflow-x: scroll;
	width: 100%;
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
