import styled from "styled-components";

export const FlexContainer = styled.div`
    width: ${({width})=> width ? width : "100%"};
    height: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    flex-direction: ${({direction}) => direction ? direction : "row"};
    justify-content: ${({justify}) => justify ? justify : "start"};
    align-items: ${({align}) => align ? align : "center"};
`;