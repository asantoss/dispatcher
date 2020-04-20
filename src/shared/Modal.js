import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

const ModalDiv = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 100000;
	width: 100vw;
	height: 100vh;
	#container {
		width: 100%;
		height: 100%;
	}
	.confirm {
		font-size: 1.2em;
		padding: 1.2em;
		position: absolute;
		left: 50%;
		width: 80%;
		max-width: 250px;
		top: 50%;
		background-color: white;
		border-radius: 5px;
		height: 180px;
		transform: translate(-50%, -50%);
		text-align: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.buttons {
			width: 70%;
			margin: 1em 0;
			align-self: center;
			display: flex;
			justify-content: space-between;
			button {
				color: white;
				background-color: green;
				&#yes {
					background-color: orangered;
				}
			}
		}
	}
`;
export default function Modal({ children }) {
	const ref = useRef(null);
	if (!ref.current) {
		const container = document.createElement('div');
		ref.current = container;
	}
	useEffect(() => {
		const root = document.getElementById('modal');
		root.appendChild(ref.current);
		return () => root?.removeChild(ref.current);
	}, []);
	return createPortal(<ModalDiv>{children}</ModalDiv>, ref.current);
}

export function useConfirmModal(successCB) {
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => setModalOpen(true);
	function ConfirmModal({ children }) {
		return (
			isModalOpen && (
				<Modal>
					<div
						id='container'
						onClick={(e) => {
							if (e.currentTarget.id === 'container') {
								setModalOpen(false);
							}
						}}>
						<div className='confirm'>
							{children}
							<div className='buttons'>
								<Button
									variant='contained'
									onClick={successCB}
									id='yes'
									type='submit'>
									Yes
								</Button>
								<Button onClick={() => setModalOpen(false)} variant='contained'>
									No
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			)
		);
	}
	return [openModal, ConfirmModal];
}
