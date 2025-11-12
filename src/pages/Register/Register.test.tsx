import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register";
import { useFeedback } from "../../providers/FeedbackProvider";
import { register as mockRegister } from "../../api/users";

// Mocks
const mockShowToast = jest.fn();
const mockShowLoading = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../providers/FeedbackProvider", () => ({
  useFeedback: jest.fn(),
}));

jest.mock("../../api/users", () => ({
  register: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Register Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFeedback as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
      showLoading: mockShowLoading,
    });
  });

  it("renders register form correctly", () => {
    render(<Register />);
    expect(screen.getByText("Bem-vindo ao CoreNotes")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });

  it("validates empty fields", async () => {
    render(<Register />);
    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: "error",
        title: "Erro",
        message: "Preencha todos os campos.",
      });
    });
  });

  it("toggles password visibility", () => {
    render(<Register />);
    const passwordInput = screen.getByPlaceholderText("Senha");
    const toggleButton = screen.getByRole("button", {
      name: "Mostrar senha",
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("submits form successfully", async () => {
    (mockRegister as jest.Mock).mockResolvedValueOnce({});

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        "John Doe",
        "john@example.com",
        "password123"
      );
    });

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: "success",
        title: "Registro",
        message: "Registro bem-sucedido!",
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("handles register error", async () => {
    (mockRegister as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "E-mail já existe" } },
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: "error",
        title: "Erro no Registro",
        message: "E-mail já existe",
      });
    });
  });
});
