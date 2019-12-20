import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { connect } from 'react-redux';

const mapToDispatch = dispatch => ({
	logIn: payload => dispatch({ type: 'LOGIN', payload }),
	logOut: () => dispatch({ type: 'LOGIN' })
});
const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				authUser: null
			};
		}
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
				if (authUser) {
					this.setState({ authUser: authUser });
					this.props.firebase.getUser(authUser.uid).then(user => {
						this.props.logIn(user);
					});
				} else {
					this.setState({ authUser: null });
					// this.props.firebase.doSignOut();
					this.props.logOut();
				}
			});
		}
		componentWillUnmount() {
			this.listener();
		}

		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}
	return connect(null, mapToDispatch)(withFirebase(WithAuthentication));
};

export default withAuthentication;
