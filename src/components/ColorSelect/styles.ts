import styled from "styled-components"

interface ContainerProp {
    $show: boolean
}

export const Container = styled.div<ContainerProp>`
    display: ${(props) => (props.$show ? "block" : "none")};
    position: absolute;
    left: 30px;
    top: 42px;

    background: #FFFFFF;
    border-radius: 9px;
    border: 1px solid #D9D9D9;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);
    width: 100%;
    padding: 5px;
`

export const StyledColor = styled.div`
    border-radius: 36px;
    background-color: ${(props) => props.color};
    width: 36px;
    height: 36px;
`

export const ContainerColor = styled.div`
    display: flex;
    gap: 5px;
    justify-content: space-between;
    width: 100%;
`
