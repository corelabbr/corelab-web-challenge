import React from 'react'
import styled from 'styled-components'
import { Button } from '../form/Button'

const ConfirmDeleteContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: #0000006e;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
const BoxConfirmDelete = styled.div`
  width: 80%;
  height: 110px;
  border-radius: 15px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    width: 440px;
  }
`

const Text = styled.h3`
  text-align: center;
  font-weight: 600;
  width: 90%;
  font-size: 16px;
  color: rgba(79, 79, 77, 1);
  font-family: sans-serif;
  padding: 15px;
`
const ButtonDeleter = styled(Button)`
  background: red;
  :hover {
    background: #790000;
  }
`
export default function ConfirmDelete({ onClickClose, onClickDelete, isFile, ...props }) {
  return (
    <ConfirmDeleteContainer {...props}>
      <BoxConfirmDelete>
        <Text>
          {isFile
            ? 'Tem certeza que deseja excluir esse arquivo ?'
            : 'Tem certeza que deseja excluir essa tarefa ?'}
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Button onClick={onClickClose}>Cancelar</Button>
          <ButtonDeleter onClick={onClickDelete}>Excluir </ButtonDeleter>
        </div>
      </BoxConfirmDelete>
    </ConfirmDeleteContainer>
  )
}
