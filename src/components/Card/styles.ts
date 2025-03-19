import { styled } from "styled-components";

export const Note = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #4f4f4b;
    height: 100%;
    margin-top: 10px;
    text-transform: capitalize;
`;

export const Container = styled.div`
    background-color: ${(props) => props.color};
    width: 390px;
    justify-content: space-between;
    border-radius: 25px;
    height: 437.59px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
`;

export const TopNote = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
    height: 44px;
    align-items: center;
    font-weight: bold;
`;

export const FooterCard = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 10px;
`;

export const Title = styled.h4`
    margin-left: 15px;
`;

export const Image = styled.img`
    margin-right: 10px;
    cursor: pointer;
`;

export const Icons = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`;
