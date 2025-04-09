import React, { useState } from 'react';
import { createTodo } from '../../lib/api';
import './index.scss';

interface NoteInputProps {
  onCreate?: () => void;
}

export const NoteInput = ({onCreate}: NoteInputProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() && !content.trim()) return;

    try {
      await createTodo({
        title,
        description: content,
        is_favorite: isFavorite,
      });

      setTitle('');
      setContent('');
      setIsFavorite(false);
      onCreate?.()
    } catch (error) {
      console.error("Erro ao criar todo:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='note-card'>
      <div className='header'>
        <input
          type="text"
          className='title-input'
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={isFavorite ? "/icons/starred-icon.svg" : "/icons/star-icon.svg"}
          alt="Favoritar"
          className='star-icon'
          onClick={() => setIsFavorite((prev) => !prev)}
        />
      </div>
      <input
        className='content-input'
        placeholder="Criar nota..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
