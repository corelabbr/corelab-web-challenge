import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const LeftSide = styled.div`
    flex: 1;
    background-color: #4a90e2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 20px;

    @media (min-width: 768px) {
        padding: 0;
    }
`;

export const LogoContainer = styled.div`
    margin-bottom: 20px;
`;

export const Logo = styled.img`
    max-width: 100px;

    @media (min-width: 768px) {
        max-width: 150px;
    }
`;

export const WelcomeText = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;

    @media (min-width: 768px) {
        font-size: 2rem;
    }
`;

export const RightSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
    padding: 20px;
`;

export const FormContainer = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 4px #4a90e2;
    }

    /* Esconde o botão nativo "mostrar senha" do Edge */
    &::-ms-reveal {
        display: none;
    }

    &::-ms-clear {
        display: none;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #357abd;
    }

    &:disabled {
        background-color: #a4c3e8;
        cursor: not-allowed;
    }
`;

export const Loading = styled.span`
    color: "#FFF";
`;

export const AlertBox = styled.div`
    background-color: #ffdddd;
    color: #d8000c;
    padding: 10px;
    margin-bottom: 20px;
    border-left: 5px solid #f44336;
    border-radius: 5px;
`;

export const RegisterLink = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 0.9rem;

    a {
        color: #4a90e2;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .divider {
        display: flex;
        justify-content: center;
        margin: 0 10px;
        position: relative;
        top: -1px;
    }
`;

export const InfoText = styled.h3`
    font-size: 1rem;
    color: #fff;
    margin-bottom: 20px;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
`;

export const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-58%);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 100%;

    svg {
        color: #555;
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;
