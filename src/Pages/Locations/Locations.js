import React, { useEffect, useContext } from 'react';
// import data from '../data/data.json';
import styled from '@emotion/styled';
import { useState } from 'react';
import { LocationContext } from './LocationController';
import Actions from './Actions';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TablePagination,
	TableFooter,
	Paper,
	useTheme,
	IconButton,
} from '@material-ui/core';
import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Locations() {
	const LocationController = useContext(LocationContext);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [state, setState] = useState({
		loading: false,
		locations: [],
		error: null,
	});

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, state.locations.length - page * rowsPerPage);

	useEffect(() => {
		LocationController.getMasterLocations()
			.then((locations) => {
				setState((s) => ({ loading: false, locations, error: null }));
			})
			.catch((e) => setState((s) => ({ ...s, error: e.message })));
	}, [setState, LocationController]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const { loading, locations, error } = state;
	return (
		<LocationList>
			<Table stickyHeader>
				{error && error}
				{loading ? (
					<p>Loading....</p>
				) : (
					<>
						<TableHead>
							<TableRow>
								<TableCell component='th'>View</TableCell>
								<TableCell component='th'>Name</TableCell>
								{/* <TableCell component='th'>Address</TableCell> */}
								<TableCell component='th'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{locations?.length ? (
								<>
									{(rowsPerPage > 0
										? locations?.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
										: locations
									)?.map((location) => {
										return (
											<TableRow key={location?.docId}>
												<TableCell>
													<Link
														to={{
															pathname: `location/${location?.docId}`,
															state: location,
														}}>
														View
													</Link>
												</TableCell>
												<TableCell>{location?.name}</TableCell>
												{/* <TableCell>
													<p>
														{location?.address},{location?.city}
													</p>
												</TableCell> */}
												<TableCell>
													<Actions {...location} />
												</TableCell>
											</TableRow>
										);
									})}
								</>
							) : (
								<p>You don't have locations yet</p>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									className='footer'
									rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
									count={locations.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</>
				)}
			</Table>
		</LocationList>
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
			{/* <IconButton
				onClick={handleFirstPageButtonClick}
				style={{ display: page === 0 ? 'none' : 'inline-flex' }}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
			</IconButton> */}
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
			{/* <IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
			</IconButton> */}
		</div>
	);
}

const LocationList = styled(TableContainer)`
	overflow-x: scroll;
	width: 100%;
	.status {
		border-radius: 50%;
		height: 10px;
		width: 10px;
		margin: auto;
		background-color: green;
	}
`;
