import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../Firebase';
import { TextField, Button } from '@material-ui/core';
import { Form } from './utils';

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
};
const SignUpPage = () => (
	<div style={{ textAlign: 'center' }}>
		<h3>Sign Up</h3>
		<SignUpForm />
	</div>
);
class SignUpFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}
	onSubmit = (event) => {
		const { username, email, passwordOne } = this.state;
		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				// Create a user in your Firebase realtime database
				return this.props.firebase.addUser(authUser.user.uid, {
					username,
					email,
					role: 'user',
				});
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				this.setState({ error });
			});

		event.preventDefault();
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;
		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			email === '' ||
			username === '';
		return (
			<Form onSubmit={this.onSubmit}>
				<TextField
					variant='outlined'
					name='username'
					value={username}
					onChange={this.onChange}
					type='text'
					placeholder='Full Name'
					label='Full Name'
				/>
				<TextField
					variant='outlined'
					name='email'
					label='Email'
					value={email}
					onChange={this.onChange}
					type='text'
					placeholder='Email Address'
				/>
				<TextField
					variant='outlined'
					name='passwordOne'
					label='Password'
					value={passwordOne}
					onChange={this.onChange}
					type='password'
					placeholder='Password'
				/>
				<TextField
					variant='outlined'
					name='passwordTwo'
					label='Confirm Password'
					value={passwordTwo}
					onChange={this.onChange}
					type='password'
					placeholder='Confirm Password'
				/>
				<Button disabled={isInvalid} type='submit'>
					Sign Up
				</Button>
				{error && <p>{error.message}</p>}
			</Form>
		);
	}
}
const SignUpLink = () => (
	<p>
		Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
	</p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };
