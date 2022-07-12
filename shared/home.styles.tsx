import styled from '@emotion/styled';
import { media } from './styles';

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  width: 100vw;

  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;

  ${media.minlaptop} {
    align-items: center;
  }
`;

export const Content = styled.section`
  background-color: #ffffff;

  min-height: 100vh;

  padding: 23px 16px;

  width: 414px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 66px;

  align-items: center;

  ${media.minlaptop} {
    width: 100%;
    max-width: 1024px;
  }
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  line-height: 0.938rem;
  font-weight: normal;

  color: #020202;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${media.minlaptop} {
    width: 100%;
    max-width: 1024px;

    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 30px;
  }
`;

export const ColumContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  max-width: 1024px;
`;
