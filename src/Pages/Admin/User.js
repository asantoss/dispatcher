import React from 'react';
import styled from '@emotion/styled';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export default function User({ user }) {
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
				<IconButton>
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
