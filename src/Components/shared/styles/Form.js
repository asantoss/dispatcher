import styled from 'styled-components';
export const Form = styled.form`
	margin: 1em;
	display: grid;
	grid-gap: 0.5em;
	& > button {
		grid-column: 1/3;
		justify-self: center;
	}
`;
