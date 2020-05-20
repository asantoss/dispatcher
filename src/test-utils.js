// test-utils.js
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './Store';
const history = createMemoryHistory();

const AllTheProviders = ({ children }) => {
	return (
		<Provider store={store}>
			<Router history={history}>{children}</Router>
		</Provider>
	);
};

const customRender = (ui, options) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
