import styled from 'styled-components';
export const Form = styled.form`
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-wrap: wrap;
	& > button {
		grid-column: 1/3;
		justify-self: center;
	}
	#main_info,
	#secondary_info {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		margin: 2em 0;
		& > .MuiTextField-root {
			margin: 0 1rem 1rem;
		}
	}
`;
