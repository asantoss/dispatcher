import React from 'react';
import styled from 'styled-components';
import { useConfirmModal } from '../hooks/Modal';
import { mapsOpener } from '../shared/utils';
import { useSelector } from 'react-redux';
import { DirectionsOutlined } from '@material-ui/icons';

export default function Ticket({ ticket, handleComplete, handleDelete }) {
	const date = ticket?.created.toDate();
	const { user } = useSelector((state) => state);
	const [OpenModal, Modal] = useConfirmModal(() => handleDelete(ticket?.docId));
	return (
		<TicketContainer isComplete={ticket?.complete}>
			<div className='header'>
				<p className='title'>{ticket?.location.name}</p>
				<p className='sub-title'>License {ticket?.location?.license}</p>
				<span className='status'></span>
				{ticket?.location?.coordinates && (
					<span
						className='directions-btn'
						onClick={() =>
							mapsOpener(ticket.location.coordinates, user?.location)
						}>
						<DirectionsOutlined />
					</span>
				)}
			</div>
			<div className='content'>
				{ticket?.message}
				{ticket?.terminal && (
					<div className='terminal-info'>
						<p>Terminal Game: {ticket?.terminal?.game ?? 'N/A'}</p>
						<p>Terminal Serial: {ticket?.terminal?.serial}</p>
						<p>Terminal B/A: {ticket?.terminal?.billAcceptor}</p>
						<p>Terminal Monitor: {ticket?.terminal?.monitor}</p>
						<p>Terminal Type: {ticket?.terminal?.type}</p>
					</div>
				)}
				<br />
				<p>
					Submitted on:{' '}
					<time dateTime={date}>
						{' '}
						{date.toLocaleDateString('en-US')} -{' '}
						{date.toLocaleTimeString('en-US')}
					</time>
				</p>
				{ticket?.completedAt && (
					<p>
						Completed on:{' '}
						<time dateTime={date}>
							{' '}
							{ticket.completedAt.toDate().toLocaleDateString('en-US')} -{' '}
							{ticket.completedAt.toDate().toLocaleTimeString('en-US')}
						</time>
					</p>
				)}
			</div>
			<div className='footer'>
				{' '}
				{!ticket?.complete && (
					<button className='item' onClick={() => handleComplete(ticket.docId)}>
						Mark Complete
					</button>
				)}
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
		height: 1rem;
		width: 1rem;
		border-radius: 50%;
		background-color: ${({ isComplete }) =>
			isComplete ? 'var(--success)' : 'var(--warning)'};
	}
	.terminal-info {
		margin-top: 1em;
	}
	.header {
		display: flex;
		align-items: center;
		.title {
			font-size: 1rem;
			display: flex;
			align-items: center;
			flex-grow: 1;
			font-weight: 700;
			padding: 0.75rem 1rem;
		}
	}
	.content {
		padding: 1.5rem;
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
	time {
		margin: 0.5rem 0;
	}
`;
