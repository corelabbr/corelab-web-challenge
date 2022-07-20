import styled from "styled-components";

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 80%;

	max-width: 25rem;
	padding: 2.5rem;

	background-color: #ececec;
	border: 1px solid #eaeaea;
	border-radius: 10px;

	p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5;
	}

	label {
		font-size: 0.8125rem;
		font-weight: 500;
		margin-top: 1rem;
		margin-left: 0.5rem;
	}

	button {
		margin-top: 2.5rem;

		align-self: flex-end;
	}
`;
