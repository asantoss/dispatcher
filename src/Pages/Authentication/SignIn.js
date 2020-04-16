import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { AuthPageContext } from './AuthController';
import { PasswordForgetLink } from '../../Components/PasswordForget';
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
					history.push(ROUTES.HOME);
				}
			})
			.catch((error) => setState({ ...state, error: error?.message }));
	};
	const { email, password, error } = state;
	const isInvalid = password === '' || email === '';
	return (
		<>
			<form onSubmit={onSubmit}>
				{error && <p>{error}</p>}
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
			</form>
		</>
	);
};

const SignInForm = SignInFormBase;
export default SignInPage;
export { SignInForm };

function SignInWithGoogle({ setState }) {
	const Auth = useContext(AuthPageContext);
	const history = useHistory();

	const SignInWithGoogle = () => {
		Auth.signInWithGoogle()
			.then(() => history.push(ROUTES.HOME))
			.catch((e) => {
				setState((s) => ({ ...s, error: e.message }));
			});
	};
	return (
		<button type='button' className='google-btn' onClick={SignInWithGoogle}>
			<img src={googleNormal} alt='Google Sign in button' />
		</button>
	);
}
