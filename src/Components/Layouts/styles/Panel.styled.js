import styled from 'styled-components';

export default styled.div`
	display: flex;
	align-items: center;
	margin: 1em;
	text-align: center;
	.panel {
		font-size: 1.2em;
		cursor: pointer;
		flex-grow: 1;
		&.active {
			border-bottom: 1px solid var(--bg);
		}
	}
`;
