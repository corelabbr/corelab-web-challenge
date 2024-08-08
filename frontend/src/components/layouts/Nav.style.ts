import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LogoSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 100%;
  width: 50%;
  gap: 10px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  gap: 12px;
`;

export const LogoImage = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 768px) {
    height: 20px;
    width: 20px;
  }
`;

export const LogoName = styled.h1`
  font-size: 20px;
  color: #8B989E;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;