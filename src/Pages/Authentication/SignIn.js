import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { useDispatch } from 'react-redux';
import { PasswordForgetLink } from '../../Components/PasswordForget';
import { FirebaseContext } from '../../Firebase';
import * as ROUTES from '../../constants/routes';
import googleNormal from '../../assets/btn_google_signin_dark_normal_web.png';

const SignInPage = (props) => (
	<div>
		<h1>SignIn</h1>
		<SignInForm login={props.login} />
		<PasswordForgetLink />
		<SignUpLink />
	</div>
);
const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

const SignInFormBase = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState(INITIAL_STATE);
	const onChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const { email, password } = state;
		firebase
			.doSignInWithEmailAndPassword(email, password)
			.then((data) => {
				firebase.getUser(data.user.uid).then((user) => {
					setState({ ...INITIAL_STATE });
					history.push(ROUTES.HOME);
					dispatch({ type: 'LOGIN', payload: { ...user, isLoggedIn: true } });
				});
			})
			.catch((error) => {
				setState({ ...state, error: error.message });
			});
	};
	const { email, password, error } = state;
	const isInvalid = password === '' || email === '';
	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					name='email'
					value={email}
					onChange={onChange}
					type='text'
					placeholder='Email Address'
				/>
				<input
					name='password'
					value={password}
					onChange={onChange}
					type='password'
					placeholder='Password'
				/>
				<button disabled={isInvalid} type='submit'>
					Sign In
				</button>
				<SignInWithGoogle {...{ setState }} />
				{error && <p>{error}</p>}
			</form>
		</>
	);
};
const SignInForm = SignInFormBase;
export default SignInPage;
export { SignInForm };

function SignInWithGoogle({ setState }) {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();

	const SignInWithGoogle = () => {
		firebase
			.doSignInWithGoogle()
			.then((results) => {
				history.push(ROUTES.HOME);
			})
			.catch((e) => {
				firebase.doSignOut();
				setState((s) => ({ ...s, error: e.message }));
			});
	};
	return (
		<button type='button' className='google-btn' onClick={SignInWithGoogle}>
			<img src={googleNormal} alt='Google Sign in button' />
		</button>
	);
}
