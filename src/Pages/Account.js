import React, { useState } from 'react';
import PasswordChangeForm from '../Components/PasswordChange';
import { Divider, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const AccountPage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 600px;
	.btn-group {
		text-align: center;
	}
`;

const Account = () => {
	const [state, setState] = useState(false);
	const authUser = useSelector(({ user }) => user);
	return (
		<AccountPage>
			<h3>Account: {authUser.email}</h3>
			<div className='btn-group'>
				<Divider />
				<Button
					variant='contained'
					color='primary'
					onClick={() => setState(true)}>
					Manage Password
				</Button>
				<Divider />
			</div>
			{state && <PasswordChangeForm />}
		</AccountPage>
	);
};
export default Account;
