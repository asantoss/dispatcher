import styled from 'styled-components';
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	& > button {
		margin-bottom: 1rem;
	}
	#main_info,
	#secondary_info {
		display: flex;
		flex-wrap: wrap;
		margin: 2em 0;
		flex-direction: column;
		& > div {
			flex-grow: 1;
			margin: 1rem 0;
		}
	}

	@media only screen and (min-width: 800px) {
		#main_info,
		#secondary_info {
			flex-direction: column;
			width: 100%;
		}
	}
`;
