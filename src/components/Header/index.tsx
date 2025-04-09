import { useEffect, useState } from 'react';
import './index.scss';

interface SearchBarProps {
    value?: string;
    onChange?: (value: string) => void;
    onClear?: () => void;
}

export const Header = ({ onChange, onClear, value }: SearchBarProps) => {
    const [input, setInput] = useState(value || '');
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange?.(input);
      }, 300);
  
      return () => clearTimeout(timeout);
    }, [input]);
  
    return (
      <div className='search-bar'>
        <div className='search-bar-content'>
          <div className="logo-section">
            <img src="/icons/header-icon.svg" alt="Logo" className="logo-icon" />
            <span className="title">CoreNotes</span>
          </div>
  
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Pesquisar notas"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <img src="/icons/search-icon.svg" alt="Buscar" className="search-icon" />
          </div>
        </div>
  
        {input && (
          <button className="close-button" onClick={() => {
            setInput('');
            onClear?.();
          }}>
            <img src="/icons/close-icon.svg" alt="Fechar" />
          </button>
        )}
      </div>
    );
};