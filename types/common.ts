import { Session } from 'next-auth';

export type SignUpDataType = {
  fullName: string;
  email: string;
  password: string;
};

export type TodoType = {
  id?: number;
  taskTitle: string;
  description: string;
  dueDate: Date;
  isCompleted?: boolean;
  isFavorite?: boolean;
  color?: string;
};

export type SessionType = {
  session: Session;
};
