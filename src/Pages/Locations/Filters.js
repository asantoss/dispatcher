import React, { useRef, useState } from 'react';
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core';
import * as ACTIONS from '../../constants/actions';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

export default function Filters() {
	let debounced = useRef(null);
	const [filter, setFilter] = useState({
		key: 'name',
		type: 'ASC',
	});

	const dispatch = useDispatch();

	const { allLocations, filtered } = useSelector(({ locations }) => locations);

	const filterFunction = (search) => {
		if (search) {
			const filtered = allLocations.filter((element) => {
				const elementValues = Object.values(element).map((e) => {
					return e.toString().toLowerCase();
				});
				return Boolean(elementValues.filter((e) => e.includes(search)).length);
			});
			return dispatch(ACTIONS.FILTER_LOCATIONS(filtered));
		} else {
			dispatch(ACTIONS.CANCEL_FILTERS());
		}
	};

	const dispatchSort = ({ type, key }) => {
		let sorted = [];
		if (filtered) {
			sorted = [...filtered].sort((a, b) => {
				if (type === 'ASC') {
					if (b[key] > a[key]) return -1;
					return 1;
				} else {
					if (b[key] < a[key]) return -1;
					return 1;
				}
			});
			dispatch(ACTIONS.SORT_LOCATIONS(sorted));
		} else {
			sorted = [...allLocations].sort((a, b) => {
				if (type === 'ASC') {
					if (b[key] > a[key]) return -1;
					return 1;
				}
				if (type === 'DESC') {
					if (b[key] < a[key]) return -1;
					return 1;
				}
			});
			dispatch(ACTIONS.SORT_LOCATIONS(sorted));
		}
	};

	const handleSort = (e) => {
		const input = e.target.name;
		const value = e.target.value;
		setFilter((s) => ({ ...s, [input]: value }));
		dispatchSort({ ...filter, [input]: value });
	};

	const handleSearch = (e) => {
		const search = e.target.value.toLowerCase();
		if (!debounced.current) {
			debounced.current = debounce(filterFunction, 500);
		}
		debounced.current(search);
	};

	return (
		<div className='filter'>
			<TextField
				placeholder='Search...'
				variant='outlined'
				onChange={handleSearch}
			/>
			<FormControl>
				<InputLabel htmlFor='key'>Sort by</InputLabel>
				<Select
					name='key'
					id='key'
					variant='outlined'
					onChange={handleSort}
					defaultValue='name'>
					<MenuItem value='name'>Name</MenuItem>
					<MenuItem value='city'>City</MenuItem>
					<MenuItem value='terminals'>Terminals</MenuItem>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='order'>Order</InputLabel>
				<Select
					onChange={handleSort}
					id='order'
					name='type'
					variant='outlined'
					defaultValue='ASC'>
					<MenuItem value='ASC'>ASC</MenuItem>
					<MenuItem value='DESC'>DESC</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
