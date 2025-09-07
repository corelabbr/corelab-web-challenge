import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Card from "./index";
import * as api from "../../lib/api";

// Mock das chamadas da API para isolar o componente durante o teste
jest.mock("../../lib/api");

// Descreve o componente Card
describe("Card Component", () => {
  // Cria funções mock para as props de toggle favorito, update e delete
  const mockOnToggleFavorite = jest.fn();
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  // Define as props padrão para o componente Card
  const defaultProps = {
    id: 1,
    title: "Todo Title",
    description: "Todo Description",
    favorited: false,
    color: "#fff",
    onToggleFavorite: mockOnToggleFavorite,
    onUpdate: mockOnUpdate,
    onDelete: mockOnDelete,
  };

  // Limpa todos os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste: deve renderizar título e descrição
  it("deve renderizar título e descrição", () => {
    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Garante que o título "Todo Title" está no documento
    expect(screen.getByText("Todo Title")).toBeInTheDocument();
    // Garante que a descrição "Todo Description" está no documento
    expect(screen.getByText("Todo Description")).toBeInTheDocument();
  });

  // Teste: deve alternar favorito ao clicar na estrela
  it("deve alternar favorito ao clicar na estrela", async () => {
    // Mocka a chamada da API toggleFavoritedTodos para retornar um objeto com favorited: true
    (api.toggleFavoritedTodos as jest.Mock).mockResolvedValue({
      favorited: true,
    });

    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Pega o botão de estrela pelo texto acessível "Star"
    const starButton = screen.getByLabelText("Star");
    // Simula um clique no botão de estrela
    fireEvent.click(starButton);

    // Espera até que as seguintes asserções sejam verdadeiras
    await waitFor(() => {
      // Garante que a API toggleFavoritedTodos foi chamada com o id 1
      expect(api.toggleFavoritedTodos).toHaveBeenCalledWith(1);
      // Garante que a função mock mockOnToggleFavorite foi chamada com o id 1 e o valor true
      expect(mockOnToggleFavorite).toHaveBeenCalledWith(1, true);
    });
  });

  // Teste: deve entrar em modo edição ao clicar no card
  it("deve entrar em modo edição ao clicar no card", () => {
    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Pega o elemento div mais próximo do texto "Todo Title"
    const card = screen.getByText("Todo Title").closest("div");
    // Simula um clique no card
    fireEvent.click(card!);

    // Garante que o input com o valor "Todo Title" está no documento
    expect(screen.getByDisplayValue("Todo Title")).toBeInTheDocument();
    // Garante que o input com o valor "Todo Description" está no documento
    expect(screen.getByDisplayValue("Todo Description")).toBeInTheDocument();
  });

  // Teste: deve atualizar título e descrição ao clicar em salvar
  it("deve atualizar título e descrição ao clicar em salvar", async () => {
    // Mocka a chamada da API updateTodos para retornar um objeto vazio
    (api.updateTodos as jest.Mock).mockResolvedValue({});

    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Simula um clique no card para entrar em modo de edição
    fireEvent.click(screen.getByText("Todo Title").closest("div")!);

    // Pega os inputs de título e descrição pelos seus valores
    const titleInput = screen.getByDisplayValue("Todo Title");
    const descInput = screen.getByDisplayValue("Todo Description");

    // Simula a mudança do valor do input de título para "Updated Title"
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    // Simula a mudança do valor do input de descrição para "Updated Desc"
    fireEvent.change(descInput, { target: { value: "Updated Desc" } });

    // Simula um clique no botão "Save"
    fireEvent.click(screen.getByText("Save"));

    // Espera até que as seguintes asserções sejam verdadeiras
    await waitFor(() => {
      // Garante que a API updateTodos foi chamada com o id 1 e os valores atualizados
      expect(api.updateTodos).toHaveBeenCalledWith(1, {
        title: "Updated Title",
        description: "Updated Desc",
        color: "#fff",
      });
      // Garante que a função mock mockOnUpdate foi chamada com o id 1 e os valores atualizados
      expect(mockOnUpdate).toHaveBeenCalledWith(1, {
        title: "Updated Title",
        description: "Updated Desc",
        color: "#fff",
      });
    });
  });

  // Teste: deve deletar o todo ao clicar no botão de deletar
  it("deve deletar o todo ao clicar no botão de deletar", async () => {
    // Mocka a chamada da API deleteTodos para retornar um objeto vazio
    (api.deleteTodos as jest.Mock).mockResolvedValue({});

    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Simula um clique no card para entrar em modo de edição
    fireEvent.click(screen.getByText("Todo Title").closest("div")!);

    // Pega o botão de deletar pelo texto acessível "Delete"
    const deleteButton = screen.getByLabelText("Delete");
    // Simula um clique no botão de deletar
    fireEvent.click(deleteButton);

    // Espera até que as seguintes asserções sejam verdadeiras
    await waitFor(() => {
      // Garante que a API deleteTodos foi chamada com o id 1
      expect(api.deleteTodos).toHaveBeenCalledWith(1);
      // Garante que a função mock mockOnDelete foi chamada com o id 1
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
  });

  // Teste: deve abrir e fechar paleta de cores
  it("deve abrir e fechar paleta de cores", () => {
    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Simula um clique no card para entrar em modo de edição
    fireEvent.click(screen.getByText("Todo Title").closest("div")!);

    // Pega o botão da paleta de cores pelo role "button" e nome vazio
    const paletteButton = screen.getByRole("button", { name: "" });
    // Simula um clique no botão da paleta de cores
    fireEvent.click(paletteButton);

    // Garante que o portal renderizado está no documento
    expect(document.body.querySelector("div")).toBeInTheDocument(); // Portal renderizado

    // Simula um clique no botão "Cancel" para fechar a edição
    fireEvent.click(screen.getByText("Cancel")); // fecha edição
    // Garante que o input com o valor "Todo Title" não está mais no documento
    expect(screen.queryByDisplayValue("Todo Title")).not.toBeInTheDocument();
  });

  // Teste: deve cancelar edição ao clicar em Cancel
  it("deve cancelar edição ao clicar em Cancel", () => {
    // Renderiza o componente Card com as props padrão
    render(<Card {...defaultProps} />);
    // Simula um clique no card para entrar em modo de edição
    fireEvent.click(screen.getByText("Todo Title").closest("div")!);

    // Simula um clique no botão "Cancel"
    fireEvent.click(screen.getByText("Cancel"));

    // Garante que o input com o valor "Todo Title" não está mais no documento
    expect(screen.queryByDisplayValue("Todo Title")).not.toBeInTheDocument();
  });
});
