export interface NoteProps {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

export interface NotesProps {
  notes: NoteProps[]
}