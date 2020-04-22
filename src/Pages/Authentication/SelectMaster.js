import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as ACTIONS from '../../constants/actions';

const MasterContainer = styled.div`
	font-size: 1.2em;
	padding: 1.2em;
	position: absolute;
	left: 50%;
	max-width: 400px;
	width: 100%;
	top: 50%;
	background-color: white;
	border-radius: 5px;
	transform: translate(-50%, -50%);
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
	.master {
		cursor: pointer;
		&:hover {
			opacity: 0.6;
		}
	}
`;

export default function SelectMaster() {
	const user = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const history = useHistory();
	const { masters } = user;
	const handleClick = (item) => {
		const { master, role } = item;
		dispatch(ACTIONS.SET_USER_MASTER({ ...master, role }));
		history.push('/home');
	};
	return (
		<MasterContainer>
			<List className='master'>
				{masters.length ? (
					masters.map((item, i) => {
						return (
							<ListItem
								className='master'
								key={item.master?.id}
								onClick={() => handleClick(item)}>
								<ListItemAvatar>
									<Avatar>{item.master.name[0]}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={item.master.name}
									secondary={item.master.license}
								/>
							</ListItem>
						);
					})
				) : (
					<h5>No masters found please check with your administrator.</h5>
				)}
			</List>
		</MasterContainer>
	);
}
