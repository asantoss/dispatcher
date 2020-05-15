import styled from 'styled-components';
export const Form = styled.form`
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	& > button {
		grid-column: 1/3;
		justify-self: center;
	}
	#main_info,
	#secondary_info {
		display: flex;
		flex-wrap: wrap;
		margin: 2em 0;
	}
`;
