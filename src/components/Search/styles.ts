import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Content = styled.div`
  width: 323px;
  height: 60px;

  border-radius: 100px;
  padding: 20px 37px;
  background-color: rgba(101, 220, 199, 0.3);

  display: flex;
  gap: 19px;
  align-items: center;

  svg {
    min-width: 30px;
  }

  ${media.minlaptop} {
    width: 740px;
    height: 60px;
  }
`;
export const InputBase = styled.input`
  all: unset;

  width: 323px;
  height: 50px;

  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #000000;

  &::placeholder {
    color: rgba(2, 2, 2, 0.6);
  }
  ${media.minlaptop} {
    width: 740px;
    height: 60px;

    font-size: 1.875rem;
    line-height: 2.25rem;
  }
`;
export const Filter = styled.img`
  width: 100%;

  cursor: pointer;

  transition: 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;
