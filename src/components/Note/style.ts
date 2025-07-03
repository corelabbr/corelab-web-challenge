import styled from "styled-components";

export const NoteContainer = styled.div<{ color: string }>`
  width: 390px;
  height: 437px;
  border-radius: 25px;
  background-color: ${({ color }) => color};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #D9D9D9;
  padding: 1.125rem 1.5rem;

  svg {
    path {
      opacity: 1;
    }
  }
`

export const NoteTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: bold;
  color: #4F4F4D;
  flex: 1;
`

export const NoteContent = styled.p`
  flex: 1;
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #4F4F4D;
`

export const NoteFooter = styled.div`
  padding: 1.125rem 1.5rem 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #51646E;
`

export const Button = styled.button`
  border: none;
  display: flex;
  cursor: pointer;
  background-color: none;
`

export const EditCard = styled(Button)``

export const DeleteCard = styled(Button)``

export const ColorsContent = styled.div`
  position: absolute;
  z-index: 9999;
  background-color: #FFF;
  display: flex;
  gap: 0.25rem;
  padding: 5px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);

  display: flex;
  align-content: center;
  justify-content: space-between;

  @media (max-width: 579px) {
    max-width: 286px;
    flex-wrap: wrap;
  }
`