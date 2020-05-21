import { value as firebase } from '../index';

export const LOGIN = (payload) => {
	return { type: 'LOGIN', payload };
};
export const LOGOUT = () => {
	return { type: 'LOGOUT' };
};
export const SET_USER_LOCATION = (payload) => {
	return { type: 'SET_USER_LOCATION', payload };
};
export const SET_USER_MASTER = (payload) => {
	return { type: 'SET_USER_MASTER', payload };
};
export const SET_USER_MASTERS = (payload) => {
	return { type: 'SET_USER_MASTERS', payload };
};
export const SORT_LOCATIONS = (payload) => {
	return { type: 'SORT_LOCATIONS', payload };
};
export const SET_CURRENT_LOCATION = (payload) => {
	return { type: 'SET_CURRENT_LOCATION', payload };
};
export const UPDATE_LOCATION = (payload) => {
	return { type: 'UPDATE_LOCATION', payload };
};
export const SET_ALL_LOCATIONS = (payload) => {
	return { type: 'SET_ALL_LOCATIONS', payload };
};
export const CANCEL_FILTERS = () => {
	return { type: 'CANCEL_FILTERS' };
};
export const FILTER_LOCATIONS = (payload) => {
	return { type: 'FILTER_LOCATIONS', payload };
};
export const FIRED = () => {
	return { type: 'FIRED' };
};
export const FULFILLED = () => {
	return { type: 'FULFILLED' };
};
export const ERROR = (payload) => {
	return { type: 'ERROR', payload };
};

export const GET_ALL_LOCATIONS = () => {
	return (dispatch) => {
		firebase.getMasterLocations();
	};
};
