import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { Todo } from "../types/todo";
import { getUserId } from "../utils/user";

type CreateTodoData = Omit<Todo, "id">;
type UpdateTodoData = Todo;

const QUERY_KEYS = {
  todos: (userId: string) => ["todos", userId] as const,
} as const;

const todosApi = {
  getTodos: async (userId: string): Promise<Todo[]> => {
    const response = await api.get(`todos/${userId}`);
    return response.data;
  },

  createTodo: async (todo: CreateTodoData): Promise<Todo> => {
    const response = await api.post("todos", todo);
    return response.data;
  },

  updateTodo: async (todo: UpdateTodoData): Promise<Todo> => {
    const response = await api.patch(`todos/${todo.id}`, todo);
    return response.data;
  },

  deleteTodo: async (todoId: string): Promise<void> => {
    await api.delete(`todos/${todoId}`);
  },
};

export function useTodos() {
  const userId = getUserId();
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.todos(userId),
    queryFn: () => todosApi.getTodos(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const createTodo = useMutation({
    mutationFn: todosApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos(userId) });
    },
    onError: (error) => {
      console.error("Erro ao criar todo:", error);
    },
  });

  const updateTodo = useMutation({
    mutationFn: todosApi.updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todos(userId) });

      const previousTodos = queryClient.getQueryData(QUERY_KEYS.todos(userId));

      queryClient.setQueryData(
        QUERY_KEYS.todos(userId),
        (oldTodos: Todo[] = []) =>
          oldTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
      );

      return { previousTodos };
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          QUERY_KEYS.todos(userId),
          context.previousTodos
        );
      }
      console.error("Error updating todo:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos(userId) });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: todosApi.deleteTodo,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todos(userId) });

      const previousTodos = queryClient.getQueryData(QUERY_KEYS.todos(userId));

      queryClient.setQueryData(
        QUERY_KEYS.todos(userId),
        (oldTodos: Todo[] = []) => oldTodos.filter((todo) => todo.id !== todoId)
      );

      return { previousTodos };
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          QUERY_KEYS.todos(userId),
          context.previousTodos
        );
      }
      console.error("Erro ao deletar todo:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos(userId) });
    },
  });

  return {
    todos,
    isLoading,
    error,

    createTodo: createTodo.mutate,
    updateTodo: updateTodo.mutate,
    deleteTodo: deleteTodo.mutate,
    refetch,

    isCreating: createTodo.isPending,
    isUpdating: updateTodo.isPending,
    isDeleting: deleteTodo.isPending,
  };
}
