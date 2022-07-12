import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';
import { useIsLoadingContext } from "../../contexts/IsLoadingContext";


export default function ButtonForm({ text, isDisabled }) {
    const { isLoading } = useIsLoadingContext();

    return (
        <StyledButton disabled={isDisabled}>{isLoading ? <ThreeDots color={'white'} /> : text}</StyledButton>
    );
}

const StyledButton = styled.button`
    border: none;
    border-radius: 20px;
    color: white;
    background-color: var(--primary-color);
    width: 120px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    :disabled{
        opacity: 0.5;
    }
`;