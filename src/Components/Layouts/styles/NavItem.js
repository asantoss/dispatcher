import styled from 'styled-components';

export const NavItem = styled.div`
	height: 50px;
	justify-content: space-between;
	display: flex;
	align-items: center;
	border-radius: var(--border-radius);
	transition: background var(--speed);
	padding: 0.5rem;
	cursor: pointer;
	&:hover {
		filter: brightness(1.2);
		background-color: #525357;
	}
	&.current-page {
		border-bottom: 2px solid #222;
	}
	&:last-of-type {
		margin-right: 0;
	}
	& > div {
		display: flex;
		svg {
			margin: 0 1em 0 0;
		}
	}
`;
