import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { AuthPageContext } from './AuthController';
import { PasswordForgetLink } from '../../Components/PasswordForget';
import * as ROUTES from '../../constants/routes';
import googleNormal from '../../assets/btn_google_signin_dark_normal_web.png';
import googlePressed from '../../assets/btn_google_signin_dark_pressed_web.png';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import { Form } from './utils';

const SignInPage = () => (
	<div style={{ textAlign: 'center' }}>
		<h3>Sign In</h3>
		<SignInForm />
		<PasswordForgetLink />
		<SignUpLink />
	</div>
);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

const GoogleButton = styled.button`
	background-color: transparent;
	border: none;
	height: 60px;
	background: url(${googleNormal}) no-repeat;
	width: 200px;
	&:hover {
		background: url(${googlePressed}) no-repeat;
	}
`;

const SignInFormBase = () => {
	const Auth = useContext(AuthPageContext);
	const [state, setState] = useState(INITIAL_STATE);
	const history = useHistory();

	const onChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const { email, password } = state;
		Auth.signInWithEmail(email, password)
			.then((user) => {
				if (user) {
					setState({ ...INITIAL_STATE });
					if (history.location?.state?.fromProtectedRoute) {
						history.goBack();
					} else {
						history.push(ROUTES.HOME);
					}
				}
			})
			.catch((error) => setState({ ...state, error: error?.message }));
	};

	const SignInWithGoogle = () => {
		Auth.signInWithGoogle()
			.then(() => history.push(ROUTES.HOME))
			.catch((e) => {
				setState((s) => ({ ...s, error: e.message }));
			});
	};

	const { email, password, error } = state;
	const isInvalid = password === '' || email === '';
	return (
		<Form onSubmit={onSubmit}>
			{error && <p>{error}</p>}
			<TextField
				variant='outlined'
				name='email'
				value={email}
				onChange={onChange}
				type='text'
				placeholder='Email Address'
				label='Email'
			/>
			<TextField
				variant='outlined'
				name='password'
				value={password}
				onChange={onChange}
				type='password'
				placeholder='Password'
				label='Password'
			/>
			<Button
				variant='contained'
				color='primary'
				disabled={isInvalid}
				type='submit'>
				Sign In
			</Button>
			<GoogleButton type='button' onClick={SignInWithGoogle} />
		</Form>
	);
};

const SignInForm = SignInFormBase;
export default SignInPage;
export { SignInForm };
