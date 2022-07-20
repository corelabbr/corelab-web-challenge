import styled from "styled-components";

interface ICardContainerProps {
	backgroundColor: string;
	darkFontColor?: boolean;
}

export const CardContainer = styled.div<ICardContainerProps>`
	width: 80%;
	padding: 1.5rem;

	color: ${({ darkFontColor }) => (darkFontColor ? "#020202" : "#ffffff")};
	text-align: left;
	text-decoration: none;

	background-color: ${(props) => props.backgroundColor};

	border: 1px solid #eaeaea;
	border-radius: 10px;

	transition: color 0.15s ease, border-color 0.15s ease;

	&:hover,
	&:focus,
	&:active {
		color: #0070f3;
		border-color: #0070f3;
	}

	h2 {
		margin: 0 0 1rem 0;
		font-size: 1.5rem;
	}

	p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5;
		word-break: break-all;
	}

	@media screen and (min-width: 420px) {
		max-width: 18rem;
	}
`;

export const IconsContainer = styled.div`
	display: flex;
	justify-content: space-between;

	width: 4rem;
	height: 2.5rem;
`;
