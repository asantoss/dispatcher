import React from 'react';
import Table from '../Table';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('should render no data if props are not passed', () => {
	const history = createMemoryHistory();
	const { getByText } = render(
		<Router history={history}>
			<Table />
		</Router>
	);
	expect(getByText(/^No/i)).toHaveTextContent('No data found.');
});
