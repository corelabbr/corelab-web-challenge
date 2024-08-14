export interface Note {
  id: string;
  title: string;
  description: string;
  fav: boolean;
  color: number;
  file: string | null;
  user_id: string;
}

export interface User {
  session_id: string;
  user_id: string;
}

export interface FileUploadResponse {
  filename: string;
}
export interface NotesResponseAPI {
  _id: string;
  props: {
    color: number;
    description: string;
    fav: boolean;
    file: string;
    title: string;
    user_id: string;
  };
}
