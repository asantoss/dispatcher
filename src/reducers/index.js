import { combineReducers } from 'redux';
import authentication from './authentication';
import locations from './locations';
import errorReducer from './error';

export default combineReducers({
	user: authentication,
	locations: locations,
	error: errorReducer,
});
