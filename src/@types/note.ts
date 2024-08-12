export type User = {
  id: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  color: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Notes = Array<Note>;
