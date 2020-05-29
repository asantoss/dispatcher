import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 * {
	 box-sizing: border-box;
	 padding: 0;
	 margin: 0;
 }
  #root {
	display: grid;
	width: 100vw;
	height: 100vh;
	grid-template-areas:
		'a a a'
		'c c c'
		'c c c';
	grid-template-rows: 80px 1fr 30px;
	grid-template-columns: 150px 1fr;
	& > main {
		width: 100%;
		max-width: 800px;
		grid-area: c;
		justify-self: center;
			}
			@media only screen and (min-width: 800px) {
		& > main{
			width: 50%;
		}
	}
		}
		.information {
		display: flex;
		flex-direction: column;
		p {
			margin: 1rem 0;
		}
		& > div {
			margin: 2rem 0;
		}
	
	}		
`;
