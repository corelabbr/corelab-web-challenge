import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
  const favorites = todos.filter((todo) => todo.isFavorite);
  const others = todos.filter((todo) => !todo.isFavorite);

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          Start adding your first task using the form above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {favorites.length > 0 && (
        <div>
          <h2 className="text-gray-900 mb-6">Favorites</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {favorites.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <h2 className="text-gray-900 mb-6">Others</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {others.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
