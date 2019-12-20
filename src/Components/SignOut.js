import React from 'react';
import { withFirebase } from './Firebase';
import { connect } from 'react-redux';
const SignOutButton = ({ firebase, logOut }) => (
	<button
		type='button'
		onClick={() => {
			firebase.doSignOut();
			logOut();
		}}>
		Sign Out
	</button>
);
const mapDispatch = dispatch => ({
	logOut: dispatch({ type: 'LOGOUT' })
});
export default connect(null, mapDispatch)(withFirebase(SignOutButton));
