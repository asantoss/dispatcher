import React, { useState } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

export default function usePanelBar(list) {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	function PanelBar() {
		return (
			<AppBar
				className='appBar'
				position='static'
				color='default'
				style={{ marginBottom: '1em' }}>
				<Tabs onChange={handleChange} value={value}>
					{list.map((item, i) => (
						<Tab label={item} key={i} {...a11yProps(i)} />
					))}
				</Tabs>
			</AppBar>
		);
	}

	function Panel({ children, value, index }) {
		return value === index && children;
	}
	return [value, PanelBar, Panel];
}
