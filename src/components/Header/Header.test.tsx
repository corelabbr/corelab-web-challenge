import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";

// Descreve o componente Header
describe("Header Component", () => {
  // Teste: deve renderizar o input com placeholder
  it("deve renderizar o input com placeholder", () => {
    // Cria uma função mock para simular a função onChange
    const mockOnChange = jest.fn();
    // Renderiza o componente Header com o placeholder "Pesquisar...", valor inicial vazio e a função onChange mockada
    render(
      <Header placeholder="Pesquisar..." value="" onChange={mockOnChange} />
    );

    // Pega o elemento input pelo texto do placeholder (case-insensitive)
    const input = screen.getByPlaceholderText(/pesquisar/i);
    // Garante que o input está no documento
    expect(input).toBeInTheDocument();
  });

  // Teste: deve chamar onChange ao digitar
  it("deve chamar onChange ao digitar", () => {
    // Cria uma função mock para simular a função onChange
    const mockOnChange = jest.fn();
    // Renderiza o componente Header com o placeholder "Pesquisar...", valor inicial vazio e a função onChange mockada
    render(
      <Header placeholder="Pesquisar..." value="" onChange={mockOnChange} />
    );

    // Pega o elemento input pelo texto do placeholder (case-insensitive)
    const input = screen.getByPlaceholderText(/pesquisar/i);
    // Simula a digitação de "teste" no input
    fireEvent.change(input, { target: { value: "teste" } });
    // Garante que a função mock onChange foi chamada uma vez
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
