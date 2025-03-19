import styled from "styled-components";

export const Container = styled.div<{ $show: boolean }>`
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: ${({ $show }) => ($show ? "flex" : "none")};
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

export const ContainerColor = styled.div`
    display: flex;
    gap: 8px;
`;

export const StyledColor = styled.div<{ color: string }>`
    width: 24px;
    height: 26px;
    border-radius: 50%;
    background: ${({ color }) => color};
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;
