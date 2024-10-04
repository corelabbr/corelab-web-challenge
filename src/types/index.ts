export interface NotesBody {
  title?: string
  text: string
  color?: string;
  favorite: boolean
}

export interface NotesData {
  id: string
  title: string
  text: string
  color: string
  favorite: boolean
}
