import { render } from '../../test-utils';
import React from 'react';
import Terminals from './Terminals';

test('should render No Terminals Set ', () => {
	const { getByText } = render(<Terminals />);

	expect(getByText(/^No Terminals/i)).toHaveTextContent('No Terminals Set');
});

test('Should render a list of terminals', () => {
	const terminals = [
		{
			game: '',
			board: {
				refrence: '20004657',
				docId: '20004657',
				game: 'Fusion 4',
				terminalId: null,
				type: 'Fusion',
				version: '5.3',
				manufacturer: 'Banilla Games',
			},
			type: 'Fusion',
			boardId: '20004657',
			location: '',
			serial: '2019-0367',
			manufacturer: 'Banilla Games',
			billAcceptor: 'JCM',
			locationId: 'eR9ZzRO02xggpzYA1Q4x',
			monitor: 'Goldfinger',
			docId: '2019-0367',
		},
		{
			type: 'Primero Single Screen',
			boardId: null,
			manufacturer: 'Banilla Games',
			serial: '2020-0375',
			location: '',
			billAcceptor: 'MEI Cash Flow',
			locationId: null,
			docId: '2020-0375',
			monitor: 'VSR',
		},
	];
	const { getByTestId } = render(<Terminals terminals={terminals} />);
	terminals.forEach((terminal, i) => {
		expect(getByTestId(`terminal${i}`)).toBeInTheDocument();
	});
});
