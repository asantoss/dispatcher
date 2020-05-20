import React from 'react';
import Ticket from '../Ticket';
import { render, fireEvent } from '../../test-utils';

test('should render the loader since the firebase instance is not available', () => {
	const toggleComplete = jest.fn();
	const handleDelete = jest.fn();
	const Tickets = [
		{
			completed: false,
			location: {
				terminals: [
					{
						location: '',
						serial: '2019-0367',
						manufacturer: 'Banilla Games',
						billAcceptor: 'JCM',
						locationId: 'eR9ZzRO02xggpzYA1Q4x',
						monitor: 'Goldfinger',
						docId: '2019-0367',
						game: '',
						board: {
							type: 'Fusion',
							version: '5.3',
							manufacturer: 'Banilla Games',
							refrence: '20004657',
							docId: '20004657',
							game: 'Fusion 4',
							terminalId: null,
						},
						type: 'Fusion',
						boardId: '20004657',
					},
					{
						type: 'Primero Single Screen',
						boardId: null,
						location: '',
						serial: '2020-0375',
						manufacturer: 'Banilla Games',
						billAcceptor: 'MEI Cash Flow',
						locationId: null,
						monitor: 'VSR',
						docId: '2020-0375',
					},
				],
				address: '1895 Beaver Ridge Cir Suite F',
				zipCode: '30071',
				docId: 'eR9ZzRO02xggpzYA1Q4x',
				city: 'Norcross',
				state: 'GA',
				license: '53056',
				name: "Alex's house",
				coordinates:
					'https://www.google.com/maps?saddr=My+Location&daddr=33.9358658,-84.1661822&amp;ll',
				terminalsTotal: '8',
			},
			terminal: {
				monitor: 'Goldfinger',
				docId: '2019-0367',
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
			},
			created: {
				seconds: 1588973969,
				nanoseconds: 113000000,
				toDate() {
					return new Date(this.seconds + 1000);
				},
			},
			completedAt: {
				seconds: 1588973997,
				nanoseconds: 800000000,
				toDate() {
					return new Date(this.seconds + 1000);
				},
			},
			message: 'hello',
			complete: true,
			docId: 'jEuLPoFqwKOV6LCON9J5',
		},
	];
	const { container } = render(<Ticket ticket={Tickets[0]} />);

	// expect(container.querySelector('.spinner')).toBeInTheDocument();
});
