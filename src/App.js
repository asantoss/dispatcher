import React, { useEffect } from 'react';
import * as ROLES from './constants/roles';
import { Route, Switch } from 'react-router-dom';
import { AuthUserContextProvider } from './Components/Session';

import {
	SignUpPage,
	AccountPage,
	HomePage,
	AdminPage,
	LocationsPage,
	Location,
} from './Pages';

import SignInPage from './Components/Containers/SignInContainer';
import * as ROUTES from './constants/routes';
import ProtectedRoute from './Components/Session/ProtectedRoute';
import AuthController from './Pages/Authentication/AuthController';
import LocationController from './Pages/Locations/LocationController';
import { useDispatch } from 'react-redux';
import * as ACTIONS from './constants/actions';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				dispatch(ACTIONS.SET_USER_LOCATION({ latitude, longitude }));
			},
			null,
			options
		);
	}, [dispatch]);
	return (
		<AuthUserContextProvider>
			<AuthController>
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
					<LocationController>
						<ProtectedRoute
							exact
							path={ROUTES.LOCATIONS}
							role={ROLES.USER}
							component={LocationsPage}
						/>
						<ProtectedRoute
							exact
							path={ROUTES.LOCATION}
							role={ROLES.USER}
							component={Location}
						/>
					</LocationController>
				</Switch>
			</AuthController>
		</AuthUserContextProvider>
	);
};
export default App;
