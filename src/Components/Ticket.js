import React, { useState } from 'react';
import styled from 'styled-components';

import { useConfirmModal } from '../hooks/Modal';
import { mapsOpener } from '../shared/utils';
import { useSelector } from 'react-redux';
import { DirectionsOutlined } from '@material-ui/icons';
import { TextField } from '@material-ui/core';

export default function Ticket({
	toggleComplete,
	handleClose,
	id,
	toggleList,
}) {
	const [expanded, setExpanded] = useState(false);
	const [height, setHeight] = useState(null);
	const { user, tickets, locations, terminals } = useSelector((state) => state);
	const [OpenModal, Modal] = useConfirmModal(() => handleClose(id));
	const handleExpand = (e) => {
		const element = e.currentTarget.nextSibling;
		if (!expanded) {
			const height = element.scrollHeight;
			setHeight(height);
		} else {
			setHeight(0);
		}
		setExpanded(!expanded);
	};
	const handleChange = (e) => {
		toggleList(id, e.target.value);
	};
	const ticket = tickets.entities[id];
	const location = locations.entities[ticket?.locationId] ?? null;
	const terminal = terminals.entities[ticket?.terminalId] ?? null;
	const created = new Date(parseInt(ticket.created));
	const completed = new Date(parseInt(ticket?.completedAt));
	return (
		<TicketContainer isComplete={ticket?.complete}>
			<div className='header'>
				<p className='title'>{location?.name}</p>
				<p className='sub-title'>License {location?.license}</p>
				<span className='status'></span>
				{location?.url && (
					<span
						className='directions-btn'
						onClick={() => mapsOpener(location?.url, user?.location)}>
						<DirectionsOutlined />
					</span>
				)}
			</div>
			<div className='content'>
				<p className={'message'}>
					<span className='message_title'>Message: </span>
					{ticket?.message}
				</p>

				{terminal && (
					<>
						<span onClick={handleExpand} className='showMore'>
							{expanded ? '- Show Less' : '+ Show More'}
						</span>
						<div style={{ maxHeight: height }} className='terminal-info'>
							<p>Terminal Game: {terminal?.game ?? 'N/A'}</p>
							<p>Terminal Serial: {terminal?.serial}</p>
							<p>Terminal B/A: {terminal?.billAcceptor}</p>
							<p>Terminal Monitor: {terminal?.monitor}</p>
							<p>Terminal Type: {terminal?.type}</p>
						</div>
					</>
				)}

				<br />
				<div className='time'>
					<p>Created:</p>
					<br />
					<time dateTime={created}>
						<span>{created?.toLocaleDateString('en-US')}</span>
						<span>@</span>
						<span>{created?.toLocaleTimeString('en-US')}</span>
					</time>
				</div>
				{ticket?.complete && ticket?.completedAt && (
					<div className='time'>
						<p>Closed:</p>
						<br />
						<time dateTime={completed}>
							<span>{completed.toLocaleDateString('en-US')}</span>
							<span>@</span>
							<span>{completed.toLocaleTimeString('en-US')}</span>
						</time>
					</div>
				)}
			</div>
			{!ticket?.complete && (
				<TextField
					className='input'
					variant='outlined'
					onChange={handleChange}
					value={ticket.list}
					select
					SelectProps={{ native: true }}>
					<option value='inProgress'>In Progress</option>
					<option value='backLog'>Back Log</option>
				</TextField>
			)}
			<div className='footer'>
				<button
					className='item'
					onClick={() => toggleComplete(id, ticket?.complete)}>
					{ticket?.complete ? 'Mark Open' : 'Mark Closed'}
				</button>

				<button className='item' onClick={OpenModal}>
					Delete
				</button>
			</div>
			<Modal>
				<p>Are you sure you want to continue?</p>
			</Modal>
		</TicketContainer>
	);
}
const TicketContainer = styled.div`
	padding: 0.75rem 1rem;
	width: calc(100% - 16px);
	max-width: 400px;
	margin: 0.5em auto;
	background-color: #fff;
	box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
		0 0 0 1px rgba(10, 10, 10, 0.02);
	color: #4a4a4a;

	.directions-btn {
		cursor: pointer;
		&:hover {
			filter: brightness(1.5);
		}
	}
	.status {
		margin: 0 1rem;
		margin-left: auto;
		height: 1rem;
		width: 1rem;
		border-radius: 50%;
		background-color: ${({ isComplete }) =>
			isComplete ? 'var(--success)' : 'var(--warning)'};
	}
	.input {
		width: 100%;
		margin: 0.5rem 0;
	}

	.terminal-info {
		margin-top: 1em;
		max-height: 0;
		transition: max-height 0.2s ease-out;
		overflow: hidden;
	}
	.header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.title {
			font-size: 1rem;
			display: flex;
			align-items: center;
			flex-grow: 1;
			font-weight: 700;
		}
	}
	.showMore {
		position: relative;
		right: 1.25rem;
		&:hover {
			font-size: 1.2rem;
		}
	}

	/* .message {
		&::after {
			content: '+ Show More';
			font-size: 1.2rem;
			float: right;
			margin-left: 5px;
		}
		&.active::after {
			content: '- Show Less';
		}
	} */
	.content {
		margin: 1rem 0;
	}
	.footer {
		display: flex;
		align-items: stretch;
		border-top: 1px solid #ededed;
		.item {
			cursor: pointer;
			background-color: transparent;
			font-size: 0.8rem;
			color: #3273dc;
			align-items: center;
			display: flex;
			flex-basis: 0;
			flex-grow: 1;
			flex-shrink: 0;
			justify-content: center;
			padding: 0.75rem;
			&:not(:last-child) {
				border-right: 1px solid #ededed;
			}
			:hover {
				color: black;
				text-decoration: underline;
			}
		}
	}
	.time {
		font-size: 0.75rem;
		margin: 0.5rem 0;
		display: flex;
		justify-content: flex-start;
		span {
			margin-right: 0.5rem;
		}
		align-items: flex-start;
	}
`;
