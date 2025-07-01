import styled from "styled-components";

export const TextAreaEdit = styled.textarea`
    border-radius: 25px;
    padding: 10px;
    color: #4f4f4d;
    resize: none;
    border: 1px solid #d9d9d9;
    height: 100%;
    width: 100%;
    margin-top: 10px;
`;

export const Button = styled.button`
    border-radius: 10px;
    padding: 10px 15px;
    color: #ffffff;
    background: #4a90e2;
    transition: all 0.3s;
    font-weight: bold;
    border: none;
    margin-top: 5px;
    cursor: pointer;

    &:hover {
        background: #357abd;
    }
`;

export const Form = styled.form`
    height: 85%;
`;
