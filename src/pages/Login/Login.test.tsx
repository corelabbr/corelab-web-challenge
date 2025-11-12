// Login.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { useAuth } from "../../providers/AuthProvider";
import { useFeedback } from "../../providers/FeedbackProvider";

const mockNavigate = jest.fn();
const mockLogin = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("../../providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../providers/FeedbackProvider", () => ({
  useFeedback: jest.fn(),
}));

describe("Login Page", () => {
  const mockShowToast = jest.fn();
  const mockShowLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });

    (useFeedback as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
      showLoading: mockShowLoading,
    });
  });

  it("renders login form correctly", () => {
    render(<Login />);
    expect(screen.getByText("Bem-vindo ao CoreNotes")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });

  it("validates empty fields", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: "error",
        title: "Erro",
        message: "Preencha todos os campos.",
      });
    });
  });

  it("toggles password visibility", () => {
    render(<Login />);
    const toggleButton = screen.getByRole("button", {
      name: "Mostrar senha",
    });
    const passwordInput = screen.getByPlaceholderText("Senha");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("submits form successfully", async () => {
    mockLogin.mockResolvedValueOnce({});
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: "success",
        title: "Login",
        message: "Login bem-sucedido!",
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("handles login error", async () => {
    mockLogin.mockRejectedValueOnce({
      response: { data: { message: "Credenciais inválidas" } },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: "error",
        title: "Erro no login",
        message: "Credenciais inválidas",
      });
    });
  });
});
