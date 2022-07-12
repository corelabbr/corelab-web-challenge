import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

interface InputProps {
  variant?: 'minmax' | 'default';
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.063rem;

  color: #000000;

  padding-left: 16px;

  ${media.minlaptop} {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
`;

export const InputBase = styled.input<InputProps>`
  height: ${props => (props.variant === 'minmax' ? '21px' : '48px')};
  width: ${props => (props.variant === 'minmax' ? '112px' : '240px')};
  max-width: 240px;

  background: #ffff;

  border: 1px solid rgba(2, 2, 2, 0.8);
  border-radius: 100px;

  border-radius: 20px;

  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;

  display: flex;
  align-items: center;

  padding-left: 16px;

  &::placeholder {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.5rem;

    color: rgba(2, 2, 2, 0.6);
  }

  &:focus {
    background-color: rgba(2, 2, 2, 0.1);
  }

  ${media.minlaptop} {
    max-width: 459px;

    font-size: 1.563rem;
    line-height: 1.875rem;

    height: ${props => (props.variant === 'minmax' ? '50px' : '60px')};
    width: ${props => (props.variant === 'minmax' ? '247px' : '459px')};

    &::placeholder {
      font-size: 1.563rem;
      line-height: 1.875rem;
    }
  }
`;
