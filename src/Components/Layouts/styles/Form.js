import styled from 'styled-components';
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-wrap: wrap;
	& > button {
		margin-bottom: 1rem;
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
