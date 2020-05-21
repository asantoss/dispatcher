import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;

	@media only screen and (min-width: 800px) {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		.ticket_list {
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
			height: 800px;
		}
		.controls {
			display: flex;
			/* justify-content: space-around; */
			button {
				margin: 1rem;
			}
		}
	}
`;
