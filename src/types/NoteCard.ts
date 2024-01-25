export interface NoteCardProps {
  noteId: number
  title: string;
  description: string;
  disabled?: boolean;
  background: string;
  isFavorite?: boolean;
}