import React from 'react';
import * as ROLES from './constants/roles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Components/Containers/NavbarContainer';
import { AuthUserContextProvider } from './Components/Session';

import {
	SignUpPage,
	AccountPage,
	HomePage,
	AdminPage,
	LocationsPage,
} from './Pages';

import SignInPage from './Components/Containers/SignInContainer';
import * as ROUTES from './constants/routes';
import ProtectedRoute from './Components/Session/ProtectedRoute';
const App = () => {
	return (
		<AuthUserContextProvider>
			<Router>
				<Navigation />
				<hr />
				<Switch>
					{/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
					<Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
					<Route path={ROUTES.SIGN_IN} component={SignInPage} />
					{/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
					<Route exact path={ROUTES.HOME} component={HomePage} />
					<ProtectedRoute
						exact
						role={ROLES.USER}
						path={ROUTES.ACCOUNT}
						component={AccountPage}
					/>
					<ProtectedRoute
						exact
						path={ROUTES.ADMIN}
						role={ROLES.ADMIN}
						component={AdminPage}
					/>
					<ProtectedRoute
						exact
						path={ROUTES.LOCATIONS}
						role={ROLES.USER}
						component={LocationsPage}
					/>
				</Switch>
			</Router>
		</AuthUserContextProvider>
	);
};
export default App;
