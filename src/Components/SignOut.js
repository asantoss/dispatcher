import React from 'react';
import { withFirebase } from './Firebase';
import { connect } from 'react-redux';
import { LOGOUT } from '../constants/actions';
const SignOutButton = ({ logOut }) => (
	<button
		type='button'
		onClick={() => {
			logOut();
		}}>
		Sign Out
	</button>
);
const mapDispatch = (dispatch) => ({
	logOut: dispatch(LOGOUT()),
});
export default connect(null, mapDispatch)(SignOutButton);
