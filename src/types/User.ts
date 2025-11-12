import { INote } from "./Note";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdDate: Date;
  listNotes: INote[];
}
