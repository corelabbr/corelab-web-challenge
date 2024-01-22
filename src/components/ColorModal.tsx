import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

interface ColorModalProps {
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

const ColorModal: React.FC<ColorModalProps> = ({ onColorSelect, onClose }) => {
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const availableColors = [
    '#BAE2FF', '#B9FFDD', '#FFE8AC', '#FFCAB9', '#F99494','#9DD6FF', '#ECA1FF','#DAFF8B','#FFA285',     
    '#CDCDCD', '#979797', '#A99A7C'
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  






  const handleColorClick = (color: string) => {
    onColorSelect(color);
    onClose();
  };

  return (
    <StyledColorModal ref={modalRef} left={modalPosition.left}>
      {availableColors.map((color) => (
        <ColorButton
          key={color}
          backgroundColor={color}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </StyledColorModal>
  );
};

const StyledColorModal = styled.div<{ left: number }>`
  position: absolute;
  width: 574.61px;
  height: 46.46px;
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  border: 1px solid #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  z-index: 2000;
  top: 427px;
  left: -50px;

  @media screen and (max-width: 412px) {
    width: 100%;
    height: auto; 
    left: 0%;
    top: 75%;
  }
`;
const ColorButton = styled.button<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  
  @media screen and (max-width: 412px) {
    width: 10px;
    height: 18px;
    margin:0;
  }
`;

export default ColorModal;
