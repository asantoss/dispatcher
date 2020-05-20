import React, { useState, useEffect } from 'react';

import PanelStyled from '../Components/Layouts/styles/Panel.styled';

export default function usePanelBar(list, initialPanel) {
	const [value, setValue] = useState(0);
	const handleChange = (newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		if (initialPanel) {
			setValue(initialPanel);
		}
	}, [setValue, initialPanel]);
	function PanelBar() {
		return (
			<PanelStyled>
				{/* <Tabs onChange={handleChange} value={value}> */}
				{list.map((item, i) => (
					<div
						className={i === value ? 'panel active' : 'panel'}
						key={i}
						onClick={() => handleChange(i)}>
						<p>{item}</p>
					</div>
				))}
				{/* </Tabs> */}
			</PanelStyled>
		);
	}

	function Panel({ children, value, index }) {
		return value === index && children;
	}
	return [value, PanelBar, Panel];
}
