import { createContext, ReactNode } from 'react';
import useNote from '../hooks/useNote';

interface ContextProps {
  newNote: any;
  getData: any;
  editNote: any;
  editColor: any;
  deleteNote: any;
  getDataSearch: any;
}

const Context = createContext<ContextProps>({ 
  newNote: null, 
  getData: null, 
  editNote: null, 
  editColor: null,
  deleteNote: null,
  getDataSearch: null
});

interface ProviderProps {
  children: ReactNode;
}

function NoteProvider({ children }: ProviderProps) {
  const { getData, newNote, editNote, editColor, deleteNote, getDataSearch } = useNote();

  return (
    <Context.Provider value={{ getData, newNote, editNote, editColor, deleteNote, getDataSearch }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
export { NoteProvider };