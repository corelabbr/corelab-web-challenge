import styled from "styled-components";

export const DashboardContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 1.625rem;
  padding-bottom: 3.75rem;
  align-items: center;

  height: 100%;

  @media (max-width: 579px) {
    justify-content: center;
  }
`