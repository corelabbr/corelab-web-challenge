import { BiSearch } from "react-icons/bi";
import { styled } from "styled-components";

const laptop = '770px';
const mobile = '320px';
const tablet = '480px';
// About the media queries: https://styled-components.com/docs/advanced#media-templates

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
    color: #455A64;
    font-style: normal;
    font-family: 'Inter';
    font-size: 18px;
    font-weight: normal;
`;

export const Content = styled.div`
    align-items: center;
    gap: 10px;
    display: flex;
    height: 100%;
    @media (min-width: ${tablet}) {}
    @media (max-width: ${mobile}) {
        width: 320px;
        gap: 0;
    }
`;

export const Container = styled.div`
    @media(max-width: ${mobile}) {
        width: 320px;
    }
    box-shadow: 0px 1px 7px rgba(149, 149, 149, 0.25);
    height: 57px;
    background: #FFFFFF;
`

export const Input = styled.input`
    border: 1px solid #d9d9dd;
    border-radius: 3px;
    position: relative;
    width: 100%;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
    height: 28px;
    max-width: 50%;
    padding-left: 5px;
    padding-right: 20px;

    &::placeholder {
        font-style: normal;
        font-weight: normal;
        font-family: 'Inter';
        font-size: 14px;
        color: #9A9A9A;
    }

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

export const Hand = styled(BiSearch)`
    position: relative;
    margin-left: -30px;
`

export const Profile = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    border-radius: 50%;
    width: 32px;
    height: 32px;
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
