import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { TextField, Button } from '@material-ui/core';
import { Form } from './utils';
import { useDispatch } from 'react-redux';
import { CREATE_USER } from '../../constants/actions';

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
};
const SignUpPage = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState({ tab: 0 });
	const submitTab = () => {
		dispatch(CREATE_USER(state));
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<h3>Sign Up</h3>
			<div className='multi-step'>
				{state.tab === 0 && <SignUpForm {...{ setState }} />}
				{state.tab === 1 && <MasterForm {...{ setState, submitTab }} />}
			</div>
		</div>
	);
};
class SignUpFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.props.setState((s) => ({
			...s,
			user: { ...s.data, ...this.state },
			tab: 1,
		}));
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { username, email, passwordOne, passwordTwo } = this.state;
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
					Next
				</Button>
			</Form>
		);
	}
}
class MasterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			city: '',
			state: '',
			name: '',
			terminals: 0,
			zipCode: '',
		};
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.props.submitTab();
	};
	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
		this.props.setState((s) => ({
			...s,
			master: { ...s.master, [name]: value },
		}));
	};
	render() {
		const { address, city, state, name, terminals, zipcode } = this.state;
		return (
			<Form onSubmit={this.onSubmit}>
				<TextField
					variant='outlined'
					name='name'
					value={name}
					onChange={this.onChange}
					type='text'
					placeholder='Name'
					label='Name'
				/>
				<TextField
					variant='outlined'
					name='address'
					label='Adress'
					value={address}
					onChange={this.onChange}
					type='text'
					placeholder='Address'
				/>
				<TextField
					variant='outlined'
					name='city'
					label='City'
					value={city}
					onChange={this.onChange}
					type='text'
					placeholder='City'
				/>
				<TextField
					variant='outlined'
					name='state'
					label='State'
					value={state}
					onChange={this.onChange}
					type='password'
					placeholder='State'
				/>
				<TextField
					variant='outlined'
					name='zipcode'
					label='Zip Code'
					value={zipcode}
					onChange={this.onChange}
					type='text'
					placeholder='Zip Code'
				/>
				<TextField
					variant='outlined'
					name='terminals'
					label='Terminals'
					value={terminals}
					onChange={this.onChange}
					type='number'
					placeholder='Terminals'
				/>
				<Button type='submit'>Submit</Button>
			</Form>
		);
	}
}
const SignUpLink = () => (
	<p>
		Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
	</p>
);
const SignUpForm = withRouter(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };
