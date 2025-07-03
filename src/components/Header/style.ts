import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.375rem 1.65rem 1.375rem 2.25rem;
  height: 57px;
  background-color: #FFF;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 579px) {
    padding: 1rem 1.5rem;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  gap: 1.75rem;
  align-items: center;
`

export const LogoContainer = styled.div`
  display: flex;
  gap: 1.125rem;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
  }

  h1 {
    color: #455A64;
    font-size: 0.875rem;
    font-weight: 400;
  }

  @media (max-width: 579px) {
    img {
    width: 29px;
    height: 29px;
  }

    h1 {
      font-size: 0.75rem;
    }
  }
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  padding: 0.5rem 0.75rem 0.5rem 0.625rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  width: 530px;

  input {
    
    border: none;
    flex: 1;

    &:focus {
      outline: none;
    }
  }

  svg {
    color: #9E9E9E;
  }

  @media (max-width: 579px) {
    width: 314px;
  }
`

export const ButtonClose = styled.button`
  display: flex;
  border: none;
  background: none;
`