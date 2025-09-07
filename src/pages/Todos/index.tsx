import { useEffect, useState, ChangeEvent } from "react";
import {
  getTodosFavorited,
  getTodosNoFavorited,
  updateTodos,
} from "../../lib/api";
import { Card, CreateTodo, Header } from "../../components";
import styles from "./Todos.module.scss";
import { ITodo } from "../../types/Todo";

// Componente principal da página de todos
const TodosPage: React.FC = () => {
  // Estado para todos não favoritados
  const [todosNoFavorited, setTodosNoFavorited] = useState<ITodo[]>([]);
  // Estado para todos favoritados
  const [todosFavorited, setFavoritedTodos] = useState<ITodo[]>([]);
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtra todos favoritados baseado no searchTerm (título ou descrição)
  const filteredFavorited: ITodo[] = todosFavorited.filter(
    (todo: ITodo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtra todos não favoritados baseado no searchTerm (título ou descrição)
  const filteredNoFavorited: ITodo[] = todosNoFavorited.filter(
    (todo: ITodo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para buscar todos os dados do backend
  const fetchTodos = async (): Promise<void> => {
    try {
      const noFavorited: ITodo[] = await getTodosNoFavorited();
      const favorited: ITodo[] = await getTodosFavorited();
      setFavoritedTodos(favorited);
      setTodosNoFavorited(noFavorited);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  // Função para alternar o status de favorito de um todo
  const handleToggleFavorite = async (
    todoId: number,
    newFavoritedStatus: boolean
  ): Promise<void> => {
    try {
      await updateTodos(todoId, { favorited: newFavoritedStatus });
      // Atualiza os dados após alteração
      await fetchTodos();
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
    }
  };

  // Função para atualizar título, descrição ou cor de um todo
  const handleUpdateTodo = async (
    id: number,
    data: Partial<ITodo>
  ): Promise<void> => {
    try {
      await updateTodos(id, data);
      // Atualiza os dados após alteração
      await fetchTodos();
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  // Função para deletar um todo do estado local
  const handleDelete = (todoId: number): void => {
    setFavoritedTodos((prev: ITodo[]) =>
      prev.filter((todo: ITodo) => todo.id !== todoId)
    );
    setTodosNoFavorited((prev: ITodo[]) =>
      prev.filter((todo: ITodo) => todo.id !== todoId)
    );
  };

  // Busca os dados quando o componente monta
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={styles.Todos}>
      <main className={styles.main}>
        {/* Cabeçalho com campo de busca */}
        <Header
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />

        {/* Componente de criação de novos todos */}
        <CreateTodo
          onCreate={async (newTodo: ITodo) => {
            await fetchTodos(); // Atualiza os dados após criação
          }}
        />

        {/* Seção de todos favoritados */}
        {filteredFavorited.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Favorited</h2>
            <div className={styles.gridContainer}>
              {filteredFavorited.map((todo: ITodo) => (
                <Card
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  favorited={todo.favorited}
                  color={todo.color}
                  onToggleFavorite={handleToggleFavorite}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}

        {/* Seção de todos não favoritados */}
        {filteredNoFavorited.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Others</h2>
            <div className={styles.gridContainer}>
              {filteredNoFavorited.map((todo: ITodo) => (
                <Card
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  favorited={todo.favorited}
                  color={todo.color}
                  onToggleFavorite={handleToggleFavorite}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TodosPage;
