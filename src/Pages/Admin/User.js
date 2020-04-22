import React from 'react';
import styled from '@emotion/styled';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useSelector } from 'react-redux';

export default function User({ user, idx, setState }) {
	const Admin = useContext(FirebaseContext);
	const { currentMaster } = useSelector(({ user }) => user);
	const handleClick = (id, role) => {
		Admin.deleteUserFromMaster(id, role, currentMaster.id).then((res) => {
			console.log(res);
			setState((s) => ({ ...s, users: s.users.filter((e) => e.id !== id) }));
		});
	};
	return (
		<UserDiv>
			<span>
				<strong>Full Name:</strong> {`${user?.firstName} ${user?.lastName}`}
			</span>
			<span>
				<strong>E-Mail:</strong> {user.email}
			</span>
			<span id='role'>
				<strong>Role:</strong> {user?.role}
			</span>
			<div className='button-group'>
				<IconButton onClick={() => handleClick(user?.id, user?.role)}>
					<Delete />
				</IconButton>
			</div>
		</UserDiv>
	);
}

const UserDiv = styled.div`
	margin: 0.5em;
	display: grid;
	height: 100px;
	grid-template-columns: 1fr 1fr 1fr;
	#role {
		grid-row: 2;
	}
`;
