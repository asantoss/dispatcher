import React, { createRef, useContext, useState, useEffect } from 'react';
import { TextField, Select, MenuItem } from '@material-ui/core';
import { LocationContext } from './LocationController';
import { debounce } from 'lodash';
export default function Filters({ setState }) {
	let debounced;
	const [filter, setFilter] = useState({
		search: '',
		sort: { key: 'name', type: 'ASC' },
	});
	const allLocations = createRef();
	const LocationController = useContext(LocationContext);
	const filterFunction = () => {
		const {
			search,
			sort: { type, key },
		} = filter;
		const { locations } = LocationController;
		const filtered = locations
			.filter((element) => {
				const elementValues = Object.values(element).map((e) =>
					e.toLowerCase()
				);
				return Boolean(elementValues.filter((e) => e.includes(search)).length);
			})
			.sort((a, b) => {
				if (type === 'ASC') {
					if (b[key] > a[key]) return 1;
					return -1;
				}
				if (type === 'DESC') {
					if (b[key] < a[key]) return 1;
					return -1;
				}
			});
		if (filtered.length) {
			setState((s) => ({ ...s, locations: filtered }));
		} else {
			setState((s) => ({ ...s, locations: allLocations.current }));
		}
	};
	const handleSort = (e) => {
		const input = e.target.name;
		const value = e.target.value;
		filterFunction();
		setFilter((s) => ({ ...s, sort: { ...s.sort, [input]: value } }));
	};
	const handleSearch = (e) => {
		setFilter({ ...filter, search: e.target.value.toLowerCase() });
		if (!debounced) {
			debounced = debounce(filterFunction, 1000);
		}
		debounced();
	};

	return (
		<div className='filter'>
			<TextField
				placeholder='Search...'
				variant='outlined'
				onChange={handleSearch}
			/>
			<Select
				name='key'
				variant='outlined'
				onChange={handleSort}
				defaultValue='name'
				label='Sort'>
				<MenuItem value='name'>Name</MenuItem>
				<MenuItem value='address'>addres</MenuItem>
			</Select>
			<Select
				onChange={handleSort}
				name='type'
				variant='outlined'
				defaultValue='ASC'
				label='Order'>
				<MenuItem value='ASC'>ASC</MenuItem>
				<MenuItem value='DESC'>DESC</MenuItem>
			</Select>
		</div>
	);
}
