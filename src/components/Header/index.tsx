import styled from "styled-components";
import { ReturnIcon } from "..";

interface IHeaderProps {
	onClick: () => void;
	displayButton?: boolean;
}

export default function Header({ onClick, displayButton = true }: IHeaderProps) {
	return (
		<HeaderContainer>{displayButton && <ReturnIcon onClick={onClick} />}</HeaderContainer>
	);
}

export const HeaderContainer = styled.header`
	width: 100%;
	height: 2.5rem;
`;
