import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodosPage from "./index";
import * as api from "../../lib/api";
import { ITodo } from "../../types/Todo";

// Mock das APIs - Isso é crucial para isolar o componente durante o teste.
jest.mock("../../lib/api");

// Mock data para todos que não são favoritados
const mockTodosNoFavorited: ITodo[] = [
  {
    id: 1,
    title: "Todo 1",
    description: "Desc 1",
    favorited: false,
    color: "#fff",
    createdAt: new Date(),
  },
];
// Mock data para todos que são favoritados
const mockTodosFavorited: ITodo[] = [
  {
    id: 2,
    title: "Fav Todo",
    description: "Fav Desc",
    favorited: true,
    color: "#f0f0f0",
    createdAt: new Date(),
  },
];

// Bloco de descrição para o componente TodosPage
describe("TodosPage", () => {
  // Hook beforeEach para configurar os mocks antes de cada teste
  beforeEach(() => {
    // Mockando a chamada da API getTodosNoFavorited
    (api.getTodosNoFavorited as jest.Mock).mockResolvedValue(
      mockTodosNoFavorited
    );
    // Mockando a chamada da API getTodosFavorited
    (api.getTodosFavorited as jest.Mock).mockResolvedValue(mockTodosFavorited);
    // Mockando a chamada da API updateTodos
    (api.updateTodos as jest.Mock).mockResolvedValue({});
    // Mockando a chamada da API toggleFavoritedTodos
    (api.toggleFavoritedTodos as jest.Mock).mockImplementation((id: number) => {
      // Encontra o todo pelo id na lista combinada de todos favoritados e não favoritados
      const todo = [...mockTodosNoFavorited, ...mockTodosFavorited].find(
        (t) => t.id === id
      );
      // Se o todo for encontrado, alterna o status de favoritado
      if (todo) {
        todo.favorited = !todo.favorited;
        return Promise.resolve({ ...todo });
      }
      // Se o todo não for encontrado, retorna null
      return Promise.resolve(null);
    });
    // Mockando a chamada da API deleteTodos
    (api.deleteTodos as jest.Mock).mockResolvedValue({});
  });

  // Teste: deve renderizar todos ao montar
  it("deve renderizar todos ao montar", async () => {
    // Renderiza o componente TodosPage
    render(<TodosPage />);
    // Garante que "Todo 1" está no documento
    expect(await screen.findByText("Todo 1")).toBeInTheDocument();
    // Garante que "Fav Todo" está no documento
    expect(await screen.findByText("Fav Todo")).toBeInTheDocument();
  });

  // Teste: deve filtrar todos pelo searchTerm
  it("deve filtrar todos pelo searchTerm", async () => {
    // Renderiza o componente TodosPage
    render(<TodosPage />);
    // Pega o elemento de input de busca pelo texto do placeholder
    const input = screen.getByPlaceholderText("Search notes...");
    // Simula a digitação de "Fav" no input de busca
    fireEvent.change(input, { target: { value: "Fav" } });

    // Espera o componente atualizar baseado no termo de busca
    await waitFor(() => {
      // Garante que "Todo 1" não está no documento
      expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
      // Garante que "Fav Todo" está no documento
      expect(screen.getByText("Fav Todo")).toBeInTheDocument();
    });
  });

  // Teste: deve atualizar o status de favorito de um todo
  it("deve atualizar favorito de um todo", async () => {
    // Renderiza o componente TodosPage
    render(<TodosPage />);

    // Espera todos os botões de estrela renderizarem
    const starButtons = await screen.findAllByLabelText("Star");

    // Clica no segundo botão (não favoritado) para alternar
    fireEvent.click(starButtons[1]);

    // Espera a chamada da API ser feita
    await waitFor(() => {
      // Garante que a API toggleFavoritedTodos foi chamada com o id 1
      expect(api.toggleFavoritedTodos).toHaveBeenCalledWith(1);
    });
  });

  // Teste: deve deletar um todo do estado local
  it("deve deletar um todo do estado local", async () => {
    // Renderiza o componente TodosPage
    render(<TodosPage />);

    // Espera os todos aparecerem
    const todoCard = await screen.findByText("Todo 1");

    // Simula clique para entrar em modo edição
    fireEvent.click(todoCard.closest("div")!);

    // Agora o botão Delete deve existir
    const deleteButton = await screen.findByLabelText("Delete");

    // Clica no botão de deletar
    fireEvent.click(deleteButton);

    // Espera o componente atualizar após a deleção
    await waitFor(() => {
      // Garante que "Todo 1" não está mais no documento
      expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
    });

    // Também checa se a API foi chamada
    expect(api.deleteTodos).toHaveBeenCalledWith(1);
  });
});
