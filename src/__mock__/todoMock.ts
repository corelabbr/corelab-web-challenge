import { Todo } from "types/Todo";

export const todoMock: Todo = {
  description: 'Testando',
  title: 'titulo',
  color: '#fff',
  isFavorite: false,
  _id: '1'
}

export const todoMock2: Todo = {
  description: 'Testando 2',
  title: 'titulo 2',
  color: '#fff',
  isFavorite: true,
  _id: '2'
}

export const todoListMock = [todoMock, todoMock2]

