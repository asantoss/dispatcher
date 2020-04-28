import React, { useRef, useContext, useState } from 'react';
import { TextField, MenuItem } from '@material-ui/core';

import { debounce } from 'lodash';
import { TableContext } from './Table';

export default function Filters() {
	let debounced = useRef(null);
	const { dispatch, state, headers } = useContext(TableContext);
	const { data, isFiltered, filtered } = state;
	const [key, setKey] = useState('');

	const filterFunction = (search) => {
		if (search.length > 2) {
			const filtered = data.filter((element) => {
				const elementValues = Object.values(element).map((e) => {
					return e.toString().toLowerCase();
				});
				return Boolean(elementValues.filter((e) => e.includes(search)).length);
			});
			return dispatch({ type: 'FILTER', payload: filtered });
		} else {
			dispatch({ type: 'CANCEL' });
		}
	};

	const Sort = ({ type, key }) => {
		let sorted = [];
		if (isFiltered) {
			sorted = [...filtered].sort((a, b) => {
				if (type === 'ASC') {
					return b[key] > a[key] ? -1 : 1;
				}
				return b[key] < a[key] ? -1 : 1;
			});
			dispatch({ type: 'FILTER', payload: sorted });
		} else {
			sorted = [...data].sort((a, b) => {
				if (type === 'ASC') {
					return b[key] > a[key] ? -1 : 1;
				}

				return b[key] < a[key] ? -1 : 1;
			});
			dispatch({ type: 'SET_DATA', payload: data });
		}
	};

	const handleSort = (e) => {
		const target = e.target.value.split('_');
		const key = target[0];
		const type = target[1];
		Sort({ key, type });
		setKey(e.target.value);
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
			<TextField
				select
				className='sort'
				variant='outlined'
				label='Sort By'
				value={key}
				onChange={handleSort}>
				{headers.map((e, i) => {
					if (e === 'actions' || e === 'view') {
						return null;
					}
					return (
						<MenuItem className='sort_opt' key={i} value={`${e}_ASC`}>
							{e}
						</MenuItem>
					);
				})}
			</TextField>
		</div>
	);
}
