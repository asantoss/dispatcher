import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locationsReducer from './locationsReducer';

export default combineReducers({
	user: authReducer,
	locations: locationsReducer,
});
