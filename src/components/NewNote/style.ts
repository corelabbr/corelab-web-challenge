import styled from "styled-components";

export const NewNoteContainer = styled.form`
  width: 530px;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100px;
  background-color: #FFF;

  @media (max-width: 579px) {
    width: 390px;
    border-radius: 25px;

    textarea {
      border-radius: 0 0 25px 25px;
      border: 0 0 25px 25px solid #D9D9D9;
    }
  }
`

export const NewNoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #D9D9D9;
  padding: 0.875rem 1.125rem 0.875rem 1.25rem;

  input {
    flex: 1;
    border: none;

    &::placeholder {
      font-size: 0.875rem;
      font-weight: bold;
      color: #333333;
    }
  }

  @media (max-width: 579px) {
    padding: 0.875rem 1.5rem;

    input {
      font-size: 0.875rem;
    }
  }
`

export const InputContentNewNote = styled.textarea`
  border: none;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  resize: none;
  padding: 0.875rem 1.25rem;
  outline: none;
  overflow-y: none;
  overflow: none;
  font-family: "Inter", sans-serif;
  border-radius: 3px;
`

export const FavoriteButton = styled.button`
  display: flex;
  border: none;
  background-color: none;
  cursor: pointer;

  svg {
    path {
      opacity: 1;
    }
  }
`