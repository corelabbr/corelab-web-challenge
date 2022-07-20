import styled from "styled-components";

export const Button = styled.button`
	width: 100%;

	border: none;
	border-radius: 2rem;

	cursor: pointer;
	color: #020202;
	background-color: rgba(101, 220, 199, 0.8);

	font-size: 1rem;
	font-weight: 500;
	text-transform: uppercase;
`;

export const SubmitButton = styled(Button)`
	max-width: 8rem;
	height: 2rem;
`;

export const SearchButton = styled(Button)`
	max-width: 30rem;
	height: 3rem;
`;
