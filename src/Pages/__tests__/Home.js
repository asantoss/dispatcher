import React from 'react';
import Home from '../Home';
import { render } from '@testing-library/react';

test('Should show homepage to any user', () => {
	const { getByText } = render(<Home />);
	// expect(getByText('Home Page')).toBeInTheDocument();
	expect(getByText(/^Home/i)).toHaveTextContent('Home Page');
});
