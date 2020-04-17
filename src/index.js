import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './Firebase';
import Store from './Store';
import Layout from './Components/Layouts/Layout';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<Provider store={Store}>
			<Router>
				<Layout>
					<App />
				</Layout>
			</Router>
		</Provider>
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
