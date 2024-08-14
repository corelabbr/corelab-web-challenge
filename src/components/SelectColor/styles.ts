import styled from 'styled-components';

interface ContainerProps {
  $show: boolean;
}

interface StyledColorProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  z-index: 1000;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  top: 60px;
  right: 0;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const ContainerColor = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;

export const StyledColor = styled.div<StyledColorProps>`
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ color }) => color};
  border: 2px solid transparent;

  &:hover {
    border: 2px solid #333;
  }
`;
