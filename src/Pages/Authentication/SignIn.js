import React, { useState } from 'react';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from '../../Components/PasswordForget';
import googleNormal from '../../assets/btn_google_signin_dark_normal_web.png';
import googlePressed from '../../assets/btn_google_signin_dark_pressed_web.png';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import { Form } from './utils';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../constants/actions';

const SignInPage = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h3>Sign In</h3>
			<SignInForm />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

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

const SignInForm = () => {
	const [state, setState] = useState(INITIAL_STATE);
	const dispatch = useDispatch();
	const onChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(LOGIN({ strategy: 'LOCAL', values: state }));
	};

	const SignInWithGoogle = () => {
		dispatch(LOGIN({ strategy: 'GOOGLE', values: state }));
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

export default SignInPage;
export { SignInForm };
