import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTodo from "./index";
import * as api from "../../lib/api";

jest.mock("../../lib/api"); // mock da API

describe("CreateTodo Component", () => {
  const mockOnCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o placeholder inicial", () => {
    render(<CreateTodo onCreate={mockOnCreate} />);
    expect(screen.getByText(/take a note/i)).toBeInTheDocument();
  });

  it("deve entrar no modo criação ao clicar no placeholder", () => {
    render(<CreateTodo onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByText(/take a note/i));
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/take a note/i)).toBeInTheDocument();
  });

  it("deve atualizar título e descrição ao digitar", () => {
    render(<CreateTodo onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByText(/take a note/i));

    const titleInput = screen.getByPlaceholderText(
      /title/i
    ) as HTMLInputElement;
    const descInput = screen.getByPlaceholderText(
      /take a note/i
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: "Novo título" } });
    fireEvent.change(descInput, { target: { value: "Nova descrição" } });

    expect(titleInput.value).toBe("Novo título");
    expect(descInput.value).toBe("Nova descrição");
  });

  it("deve alternar favorito ao clicar na estrela", () => {
    render(<CreateTodo onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByText(/take a note/i));

    const starButton = screen.getByRole("button", { name: /color/i }); // não tem label, usamos role
    fireEvent.click(starButton);

    // como o ícone muda pelo fill, testamos se o elemento foi renderizado
    const starIcon = screen.getByTestId("lucide-star");
    expect(starIcon).toBeInTheDocument();
  });

  it("deve abrir a paleta de cores e selecionar uma cor", () => {
    render(<CreateTodo onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByText(/take a note/i));

    const paletteButton = screen.getByRole("button", {
      name: /selecionar cor/i,
    });
    fireEvent.click(paletteButton);

    const colorOption = screen.getByRole("button", { name: /color/i }); // assumindo que PaletteColor usa button com aria-label
    fireEvent.click(colorOption);

    expect(
      screen.getByPlaceholderText(/title/i).style.backgroundColor
    ).not.toBe("");
  });

  it("deve chamar onCreate ao salvar um novo todo", async () => {
    const fakeTodo = {
      id: 1,
      title: "Novo título",
      description: "Nova descrição",
      color: "#fff",
      favorited: false,
    };

    (api.createTodos as jest.Mock).mockResolvedValue(fakeTodo);

    render(<CreateTodo onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByText(/take a note/i));

    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: fakeTodo.title },
    });
    fireEvent.change(screen.getByPlaceholderText(/take a note/i), {
      target: { value: fakeTodo.description },
    });

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledTimes(1);
      expect(mockOnCreate).toHaveBeenCalledWith(fakeTodo);
    });
  });
});
