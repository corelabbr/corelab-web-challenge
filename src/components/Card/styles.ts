import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

export const Container = styled.div`
  width: 258px;
  height: 201px;

  display: flex;
  flex-direction: column;

  background-color: #f04f4f;

  padding-left: 8px;

  ${media.minlaptop} {
    width: 223px;
    height: 191px;
  }
`;
export const Header = styled.span`
  display: flex;
  justify-content: flex-end;

  align-items: center;

  gap: 12px;

  padding-top: 10px;
  padding-right: 10px;

  svg {
    cursor: pointer;
    color: rgba(2, 2, 2, 0.6);
    transition: 0.2s;

    &:hover {
      color: #ffffff;
    }
  }
`;

export const Topic = styled.p`
  font-size: 0.75rem;
  line-height: 0.938rem;

  color: #ffffff;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-top: 36px;
`;
