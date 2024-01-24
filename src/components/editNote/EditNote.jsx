import React, { useState } from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`

const EditNote = ({ onClose, onSave, title, note }) => {
  const [editedTitle, setEditedTitle] = useState(title || '')
  const [editedNote, setEditedNote] = useState(note || '')

  const handleSave = () => {
    onSave(editedTitle, editedNote);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <label htmlFor="editedTitle">Title:</label>
        <input
          type="text"
          id="editedTitle"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />

        <label htmlFor="editedNote">Note:</label>
        <textarea
          id="editedNote"
          value={editedNote}
          onChange={(e) => setEditedNote(e.target.value)}
        />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </ModalContent>
    </ModalOverlay>
  )
}

export default EditNote