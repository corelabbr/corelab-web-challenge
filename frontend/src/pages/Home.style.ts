import styled from "styled-components";

export const TagContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    margin-left: 40px;
  }
`;

export const Tag = styled.p`
  font-size: 16px;
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 500px;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

export const Text = styled.p`
  font-size: 18px;
  color: #D9D9D9;
`;