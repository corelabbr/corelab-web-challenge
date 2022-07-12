import styled from "styled-components";
import { FlexContainer } from "../style/FlexContainer";

export default function Input({ setValue, value, text, type, name, result = [] }) {
    const error = result && result.find(r => r.label === name)
    function setInput(value) {
        setValue(value);
    }
    return (
        <FlexContainer direction={"column"} >
            <StyledLabel>{text}:</StyledLabel>
            <StyledInput color={error && "red"} value={value} onChange={(e) => setInput(e.target.value)} type={type ? type : "text"} />
            {error && <ErrorSpan>{error.text}</ErrorSpan>}
        </FlexContainer>
    )
}

const StyledLabel = styled.label`
    width: 100%;
    text-align: left;
    margin-left: 35px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
`;

const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid ${({ color }) => color ? color : "black"};
    border-radius: 20px;
    padding: 15px;
    font-size: 18px;
`;

const ErrorSpan = styled.span`
    font-family: 'Inter', sans-serif;
    margin-top: 5px;
    color: red;
    font-size: 10px;
`;


