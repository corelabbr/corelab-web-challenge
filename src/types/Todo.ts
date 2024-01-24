export interface ICreateTodo {
  title: string;
  content: string;
  color?: string;
  is_favorite: boolean;
}

export interface ITodo extends ICreateTodo {
  id: number;
}
