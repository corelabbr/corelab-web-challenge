import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 30px 80px;
  background-color: #F0F2F5;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;