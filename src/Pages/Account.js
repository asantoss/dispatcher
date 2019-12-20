import React from 'react';
import { AuthUserContext, withAuthorization } from '../Components/Session';
import { PasswordForgetForm } from '../Components/PasswordForget';
import PasswordChangeForm from '../Components/PasswordChange';
const Account = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<h1>Account: {authUser.email}</h1>
				<PasswordForgetForm />
				<PasswordChangeForm />
			</div>
		)}
	</AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);
