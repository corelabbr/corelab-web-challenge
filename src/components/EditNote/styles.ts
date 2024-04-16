import styled from "styled-components";

export const TextAreaEdit = styled.textarea`
    border-radius: 25px;
    padding: 10px;
    color: #4F4F4D;
    resize: none;
    border: 1px solid #D9D9D9;
    height: 100%;
    width: 100%;
    margin-top: 10px;
`

export const Button = styled.button`
    border-radius: 10px;
    padding: 10px 15px;
    color: #FFFFFF;
    background: #2ECC71;
    transition: all .3s;
    font-weight: bold;
    border: none;
    margin-top: 5px;
    cursor: pointer;

    &:hover{
        background: #1ABC9C;
    }
`

export const Form = styled.form`
    height: 85%;
`
