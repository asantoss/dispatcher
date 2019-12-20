import React from 'react';
import { withAuthorization } from '../Components/Session';
const HomePage = () => (
	<div>
		<h1>Home Page</h1>
		<p>The Home Page is accessible by every signed in user.</p>
	</div>
);
const condition = authUser => {
	console.log(!!authUser);
	return authUser != null;
};
export default withAuthorization(condition)(HomePage);
