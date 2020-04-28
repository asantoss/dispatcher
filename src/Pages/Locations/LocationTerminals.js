import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
// import TerminalForm from '../Terminals/TerminalForm';
import TerminalsChecked from '../../Components/Terminals/TerminalListSelect';
import TerminalForm from '../../Components/Terminals/TerminalForm';
import Terminals from '../../Components/Terminals/Terminals';

export default function LocationTerminals({ location, currentMaster }) {
	const [isAdding, setIsAdding] = useState(false);
	const [isNew, setIsNew] = useState(false);
	return (
		<div>
			<Button
				variant='contained'
				color='default'
				onClick={() => setIsAdding(!isAdding)}
				startIcon={<Add />}>
				Add Terminal
			</Button>
			<Button
				variant='contained'
				color='default'
				onClick={() => setIsNew(!isNew)}
				startIcon={<Add />}>
				New Terminal
			</Button>
			{isAdding && <TerminalsChecked {...{ location }} />}
			{isNew && <TerminalForm {...{ currentMaster, location }} />}
			{!isAdding && !isNew && <Terminals terminals={location?.terminals} />}
		</div>
	);
}
