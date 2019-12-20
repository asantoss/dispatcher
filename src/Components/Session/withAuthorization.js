import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './context';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';

const mapState = state => ({ ...state });
const withAuthorization = condition => Component => {
	class WithAuthorization extends React.Component {
		state = {};
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
				if (authUser) {
					this.props.firebase.getUser(authUser.uid).then(user => {
						this.setState({ ...user });
						if (!condition(user)) {
							this.props.history.push(ROUTES.SIGN_IN);
						}
					});
				}
			});
		}
		componentWillUnmount() {
			this.listener();
		}
		render() {
			return (
				<AuthUserContext.Consumer>
					{authUser =>
						condition(this.state) ? <Component {...this.props} /> : null
					}
				</AuthUserContext.Consumer>
			);
		}
	}
	return compose(
		withRouter,
		withFirebase
	)(connect(mapState, null)(WithAuthorization));
};
export default withAuthorization;
