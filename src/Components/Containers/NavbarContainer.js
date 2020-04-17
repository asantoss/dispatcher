import { connect } from 'react-redux';
import Navigation from '../Layouts/Navigation/Navigation';

const mapStateToProps = (state) => ({
	...state,
});
const mapDispatchToProps = (dispatch) => ({
	logOut: (payload) => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
