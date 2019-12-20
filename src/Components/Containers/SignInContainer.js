import { connect } from 'react-redux';
import SignInPage from '../../Pages/SignIn';

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	login: payload => dispatch({ type: 'LOGIN', payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
