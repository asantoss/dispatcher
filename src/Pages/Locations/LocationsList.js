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
import { useTablePagination } from '../../hooks/useTable';

import Filters from './Filters';
import * as ACTIONS from '../../constants/actions';

export default function LocationsList() {
	const { allLocations, loading, error, filtered } = useSelector(
		({ locations }) => locations
	);
	const dispatch = useDispatch();
	const LocationController = useContext(LocationContext);

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

	const [Pagination, rowsPerPage, page] = useTablePagination();
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
							<Pagination {...{ state }} />
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
			max-width: 25%;
		}
	}
`;
