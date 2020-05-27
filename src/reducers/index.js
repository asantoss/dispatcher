import { combineReducers } from 'redux';
import authentication from './authentication';
import locations from './locations';
import boards from './boards';
import terminals from './terminals';
import status from './status';

export default combineReducers({
	user: authentication,
	locations,
	status,
	boards,
	terminals,
});
