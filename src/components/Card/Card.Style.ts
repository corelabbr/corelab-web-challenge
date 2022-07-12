import styled from "styled-components";

interface IContainerProps {
  colorItem: string;
}

export const Container = styled.div<IContainerProps>`
  padding: 1.5rem;
  margin: 10px;
  text-align: left;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  background-color: ${({ colorItem }) =>
    colorItem !== "white" ? colorItem : "#000;"};
  color: ${({ colorItem }) => (colorItem === "black" ? "white" : "black")};

  .top {
    display: flex;
    align-items: baseline;

    h2 {
      margin-right: 10px;
    }

    i {
      font-size: 1rem;
      margin: 5px;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
`;
