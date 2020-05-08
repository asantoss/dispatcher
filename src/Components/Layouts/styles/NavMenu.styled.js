import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
   transform: scale(0.2);
   top: 45px;
  }
  100% {
	transform: scale(1);
	top: 58px;
  }
`;

export const NavMenuContainer = styled.div`
	position: absolute;
	top: 58px;
	left: 0;
	width: 300px;
	background-color: var(--bg);
	border: var(--border);
	border-top: none;
	border-radius: 0 0 var(--border-radius) var(--border-radius);
	overflow: hidden;
	padding: 1em;
	transition: height var(--speed) ease;
	transform-origin: top left;
	&.enter {
		transform: scale(0);
	}
	&.enter-done {
		transform: scale(1);
		transition: all var(--speed) ease;
	}

	&.exit-active {
		transform: scale(0);
		transition: all var(--speed) ease;
	}
	.menu-primary-enter {
		position: absolute;
		transform: translateX(-110%);
	}
	.menu-primary-enter-done {
		transform: translateX(0%);
		transition: all var(--speed) ease;
	}
	/* .menu-primary-enter-done:not(.menu-primary-appear-done) {
		transform: scale(2);
	} */
	.menu-primary-exit {
		position: absolute;
	}
	.menu-primary-exit-active {
		transform: translateX(-110%);
		transition: all var(--speed) ease;
	}
	.menu-secondary-enter {
		transform: translateX(110%);
	}
	.menu-secondary-enter-active {
		transform: translateX(0%);
		transition: all var(--speed) ease;
	}
	.menu-secondary-exit {
	}
	.menu-secondary-exit-active {
		transform: translateX(110%);
		transition: all var(--speed) ease;
	}

	/* @media only screen and (min-width: 800px) {
		left: 0;
	} */
`;
