import styled from "styled-components";

export const SearchInputContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;

	height: 100%;
	width: 100%;

	input {
		width: 100%;
		height: 100%;
		min-height: 3rem;
		border-radius: 2.5rem;
		padding-left: 3.5rem;
		border: none;

		font-size: 1.125rem;
		background-color: rgba(101, 220, 199, 0.3);
	}

	img {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		left: 1.5rem;
	}
`;
