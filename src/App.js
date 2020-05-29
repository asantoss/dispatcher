import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as ROLES from './constants/roles';
import { Route, Switch } from 'react-router-dom';
import { AuthUserContextProvider } from './Components/Session';
import 'react-toastify/dist/ReactToastify.css';
import {
	SignInPage,
	SignUpPage,
	AccountPage,
	HomePage,
	AdminPage,
	LocationsPage,
	Location,
} from './Pages';
import * as ROUTES from './constants/routes';
import ProtectedRoute from './Components/Session/ProtectedRoute';
import AuthController from './Pages/Authentication/AuthController';
import TerminalPage from './Pages/Terminals/TerminalsPage';
import Terminal from './Pages/Terminals/Terminal';
import BoardPage from './Pages/Boards/Boards';
import Board from './Pages/Boards/Board';
import NewItem from './Pages/NewItem';
import Tickets from './Pages/Tickets/Tickets';
import LandingPage from './Pages/LandingPage';
import { ToastContainer } from 'react-toastify';
import * as ACTIONS from './constants/actions';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 1000 * 60 * 60 * 24 * 5,
		};
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				console.log(
					`Got your location with ${pos.coords.accuracy} more or less meters of accuracy.`
				);
				dispatch(ACTIONS.SET_USER_LOCATION({ latitude, longitude }));
			},
			null,
			options
		);
	}, [dispatch]);
	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<AuthUserContextProvider>
				<AuthController>
					{/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
					<Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
					<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				</AuthController>
			</AuthUserContextProvider>
			<Switch>
				<Route exact path={ROUTES.LANDING} component={LandingPage} />
				<ProtectedRoute
					exact
					path={ROUTES.HOME}
					role={ROLES.USER}
					component={HomePage}
				/>
				<Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
				<ProtectedRoute
					exact
					path={ROUTES.ADMIN}
					role={ROLES.ADMIN}
					component={AdminPage}
				/>
				<ProtectedRoute
					exact
					path={ROUTES.BOARDS}
					role={ROLES.USER}
					component={BoardPage}
				/>
				<ProtectedRoute
					exact
					path={ROUTES.BOARD}
					role={ROLES.USER}
					component={Board}
				/>
				<ProtectedRoute
					exact
					path={ROUTES.TERMINALS}
					role={ROLES.USER}
					component={TerminalPage}
				/>
				<ProtectedRoute
					exact
					path={ROUTES.TERMINAL}
					role={ROLES.USER}
					component={Terminal}
				/>
				<ProtectedRoute
					exact
					path={ROUTES.TICKETS}
					role={ROLES.USER}
					component={Tickets}
				/>

				<ProtectedRoute
					exact
					path={ROUTES.NEW}
					role={ROLES.ADMIN}
					component={NewItem}
				/>
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
			</Switch>
		</>
	);
};
export default App;
