import React, { useContext } from 'react';
import { AuthUserContext } from '../Components/Session';
import { PasswordForgetForm } from '../Components/PasswordForget';
import PasswordChangeForm from '../Components/PasswordChange';

const Account = () => {
	const authUser = useContext(AuthUserContext);
	return (
		<div>
			<h1>Account: {authUser.email}</h1>
			<PasswordForgetForm />
			<PasswordChangeForm />
		</div>
	);
};
export default Account;
