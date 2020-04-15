import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './Firebase';
import Store from './Store';
import Layout from './Components/Layouts/Layout';
import './index.css';
ReactDOM.render(
	<Layout>
		<FirebaseContext.Provider value={new Firebase()}>
			<Provider store={Store}>
				<App />
			</Provider>
		</FirebaseContext.Provider>
	</Layout>,
	document.getElementById('root')
);
serviceWorker.unregister();
