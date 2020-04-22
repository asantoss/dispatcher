import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TablePagination,
	TableFooter,
	useTheme,
	IconButton,
} from '@material-ui/core';
import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

export function useTablePagination() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	function Pagination({ state }) {
		return (
			<TableRow>
				<TablePagination
					className='footer'
					rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
					count={state?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</TableRow>
		);
	}

	return [Pagination, rowsPerPage, page];
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
