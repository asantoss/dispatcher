import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Components/Containers/NavbarContainer';
import { withAuthentication } from './Components/Session';
import {
	SignUpPage,
	AccountPage,
	HomePage,
	AdminPage,
	LocationsPage
} from './Pages';

import SignInPage from './Components/Containers/SignInContainer';
import * as ROUTES from './constants/routes';
const App = () => {
	return (
		<Router>
			<div>
				<Navigation />
				<hr />
				{/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				{/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.ACCOUNT} component={AccountPage} />
				<Route path={ROUTES.ADMIN} component={AdminPage} />
				<Route path={ROUTES.LOCATIONS} component={LocationsPage} />
			</div>
		</Router>
	);
};
export default withAuthentication(App);
