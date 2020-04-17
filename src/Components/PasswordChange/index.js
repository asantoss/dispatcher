import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: null,
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: 1em auto;
	text-align: center;
	[type='submit'] {
		margin-top: 1em;
	}
`;

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}
	onSubmit = (event) => {
		const { passwordOne } = this.state;
		this.props.firebase
			.doPasswordUpdate(passwordOne)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
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
		const { passwordOne, passwordTwo, error } = this.state;
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
		return (
			<Form onSubmit={this.onSubmit}>
				<TextField
					name='passwordOne'
					value={passwordOne}
					onChange={this.onChange}
					type='password'
					placeholder='New Password'
				/>
				<TextField
					name='passwordTwo'
					value={passwordTwo}
					onChange={this.onChange}
					type='password'
					placeholder='Confirm New Password'
				/>
				<div>
					<Button
						variant='contained'
						color='primary'
						disabled={isInvalid}
						size='medium'
						type='submit'>
						Submit
					</Button>
				</div>
				{error && <p>{error.message}</p>}
			</Form>
		);
	}
}
export default withFirebase(PasswordChangeForm);
