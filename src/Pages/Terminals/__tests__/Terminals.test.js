import React from 'react';
import Terminals from '../TerminalsPage';
import { render } from '@testing-library/react';

test('should render the loader since the firebase instance is not available', () => {
	const { container } = render(<Terminals />);

	expect(container.querySelector('.spinner')).toBeInTheDocument();
});
