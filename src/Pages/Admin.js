import React, { Component } from 'react';
import * as ROLES from '../constants/roles';
import { withAuthorization } from '../Components/Session';

class AdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			users: []
		};
	}
	componentDidMount() {
		this.setState({ loading: true });
		this.props.firebase.users().then(users => {
			this.setState({
				users: users,
				loading: false
			});
		});
	}
	render() {
		const { users, loading } = this.state;
		return (
			<div>
				<h1>Admin</h1>
				{loading && <div>Loading ...</div>}
				<UserList users={users} />
			</div>
		);
	}
}
const UserList = ({ users }) => (
	<ul>
		{users.map(user => (
			<li key={user.uid}>
				<span>
					<strong>ID:</strong> {user.uid}
				</span>
				<span>
					<strong>E-Mail:</strong> {user.email}
				</span>
				<span>
					<strong>Username:</strong> {user.username}
				</span>
			</li>
		))}
	</ul>
);
const condition = authUser => {
	console.log(authUser && authUser.role === ROLES.ADMIN);
	return authUser && authUser.role === ROLES.ADMIN;
};
export default withAuthorization(condition)(AdminPage);
