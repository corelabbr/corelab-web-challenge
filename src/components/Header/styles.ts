import { BiSearch } from "react-icons/bi";
import { styled } from "styled-components";

const laptop = "770px";
const mobile = "320px";
const tablet = "480px";

export const Container = styled.div`
    box-shadow: 0px 1px 7px rgba(149, 149, 149, 0.25);
    height: 57px;
    background: #ffffff;

    @media (max-width: ${mobile}) {
        width: 320px;
    }
`;

export const Content = styled.div`
    align-items: center;
    gap: 10px;
    display: flex;
    height: 100%;

    @media (max-width: ${mobile}) {
        width: 320px;
        gap: 0;
    }
`;

export const Logo = styled.img`
    margin-left: 32px;
    width: 36px;
    height: 36px;

    @media (max-width: ${mobile}) {
        margin-left: 0;
    }
`;

export const Text = styled.p`
    display: flex;
    align-items: center;
    color: #455a64;
    font-family: "Inter";
    font-size: 18px;
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 50%;

    @media (max-width: ${mobile}) {
        width: 210px;
    }

    @media (max-width: ${tablet}) {
        width: 280px;
    }

    @media (max-width: ${laptop}) {
        width: 100%;
    }
`;

export const Input = styled.input`
    border: 1px solid #d9d9dd;
    border-radius: 3px;
    width: 100%;
    height: 28px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
    background: #ffffff;
    height: 28px;
    padding-left: 5px;
    padding-right: 30px;

    &::placeholder {
        font-family: "Inter";
        font-size: 14px;
        color: #9a9a9a;
    }
`;

export const SearchButton = styled.button`
    position: absolute;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

export const Hand = styled(BiSearch)`
    color: #9a9a9a;
    font-size: 18px;
`;

export const Profile = styled.div`
    position: absolute;
    top: 10px;
    right: 18px;
    cursor: pointer;
    border-radius: 50%;
    width: 15px;
    height: 15px;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    min-width: 120px;
    display: flex;
    flex-direction: column;
`;

export const DropdownContent = styled.div`
    display: flex;
    flex-direction: column;

    button {
        background: none;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        text-align: left;
        color: #333;
        font-size: 14px;

        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

export const ColorButton = styled.button`
    margin-left: 5px;
    border: none;
    background: none;
    cursor: pointer;
`;
