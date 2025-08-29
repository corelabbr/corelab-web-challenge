import { useEffect, useState } from 'react';
import { getTodos } from '../../lib/api';
import { TodoItem } from '../TodoItem/index';
import './index.scss';

interface Todo {
  id: number;
  title: string;
  description: string;
  is_favorite: boolean;
  color?: string | null;
}

type TodoListProps = {
    updateItems?: boolean;
    search?: string;
}

export const TodoList = ({updateItems, search}: TodoListProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
  
    const fetchTodos = async () => {
      const data = await getTodos(search);
      setTodos(data);
    };
  
    useEffect(() => {
      fetchTodos();
    }, [updateItems, search]);
  
    const favorites = todos.filter((todo) => todo.is_favorite);
    const others = todos.filter((todo) => !todo.is_favorite);
  
    return (
      <div className="todo-list">
        {favorites.length > 0 && (
          <>
            <p>Favoritas</p>
            <div className="todo-list__grid">
              {favorites.map((todo) => (
                <TodoItem onUpdate={fetchTodos} key={todo.id} {...todo} />
              ))}
            </div>
          </>
        )}
  
        {others.length > 0 && (
          <>
            <p>Outras</p>
            <div className="todo-list__grid">
              {others.map((todo) => (
                <TodoItem onUpdate={fetchTodos} key={todo.id} {...todo} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  

