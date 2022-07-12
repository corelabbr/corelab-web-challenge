import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

interface ContainerProps {
  isOpen: boolean;
}
export const Container = styled.section<ContainerProps>`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;

  backdrop-filter: blur(8px);
`;

export const Content = styled.form`
  min-width: 306px;
  min-height: 622px;

  background: rgba(255, 255, 255, 1);

  display: flex;
  flex-direction: column;
  gap: 21px;

  padding: 51px 35px;

  transition: 0.2s;

  svg {
    &:hover {
      color: #515151;
      cursor: pointer;
    }
  }
  ${media.minlaptop} {
    background-color: #ececec;
  }
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${media.minlaptop} {
    gap: 57px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;

  align-self: flex-end;
`;
