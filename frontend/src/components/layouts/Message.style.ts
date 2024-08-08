import styled, { css } from "styled-components";

interface MessageContainerProps {
  type: string;
  $visible?: boolean;
}

export const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  text-align: center;
  width: 80%;
  background-color: ${({ type }) =>
    type === "success"
      ? "#d4edda"
      : type === "error"
      ? "#f8d7da"
      : "transparent"};
  border: 1px solid;
  border-color: ${({ type }) =>
    type === "success"
      ? "#c3e6cb"
      : type === "error"
      ? "#f5c6cb"
      : "transparent"};
  border-radius: 4px;
  z-index: 110;
  overflow: hidden;
  transition: height 300ms ease-in-out, padding 300ms ease-in-out;

  ${({ $visible }) =>
    $visible
      ? css`
          height: fit-content;
          padding: 16px 20px;
        `
      : css`
          height: 0;
          padding: 0px;
        `}
`;

export const MessageText = styled.p<MessageContainerProps>`
  font-size: 18px;
  color: ${({ type }) =>
    type === "success" ? "#155724" : type === "error" ? "#721c24" : "#929292"};
`;
