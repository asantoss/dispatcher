import React, { useEffect, useContext } from 'react';
// import data from '../data/data.json';
import styled from '@emotion/styled';
import { useState } from 'react';
import { LocationContext } from './LocationController';
import { useSelector, useDispatch } from 'react-redux';
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
import Filters from './Filters';
import * as ACTIONS from '../../constants/actions';

export default function LocationsList() {
	const { allLocations, loading, error, filtered } = useSelector(
		({ locations }) => locations
	);
	const dispatch = useDispatch();
	const LocationController = useContext(LocationContext);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [state, setState] = useState([]);

	useEffect(() => {
		if (!allLocations.length) {
			dispatch(ACTIONS.FIRED());
			LocationController.getMasterLocations()
				.then((locations) => {
					dispatch(ACTIONS.FULFILLED());
					return locations;
				})
				.then((payload) => {
					dispatch(ACTIONS.SET_ALL_LOCATIONS(payload));
				})
				.catch((e) => dispatch(ACTIONS.ERROR(e.message)));
		}
		if (filtered?.length) {
			setState(filtered);
		} else {
			setState(allLocations);
		}
		return () => {
			setState(null);
		};
	}, [dispatch, LocationController, allLocations, setState, filtered]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<LocationList>
			{error && <p>{error}</p>}
			{loading ? (
				<div className='spinner' />
			) : state?.length ? (
				<>
					<Filters {...{ setState }} />
					<Table stickyHeader className='table'>
						<TableHead>
							<TableRow>
								<TablePagination
									className='footer'
									rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
									count={state.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
							<TableRow>
								<TableCell component='th'>License</TableCell>
								<TableCell component='th'>Name</TableCell>
								<TableCell component='th'>City</TableCell>
								<TableCell component='th'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? state?.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: state
							)?.map((location, index) => {
								return (
									<TableRow key={location?.docId}>
										<TableCell>{location?.id}</TableCell>
										<TableCell>{location?.name}</TableCell>
										<TableCell>{location?.city}</TableCell>
										<TableCell>
											<Actions {...{ location, index }} />
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
						<TableFooter></TableFooter>
					</Table>
				</>
			) : (
				<p>No Locations Found</p>
			)}
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
	.table {
		td {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			max-width: 75px;
		}
	}
`;
