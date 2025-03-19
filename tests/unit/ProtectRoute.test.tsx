import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProtectedRoute from "../../src/components/ProtectedRoute/protectedRoute";

/*
Aqui está o que cada teste faz no código:

- Verifica o Redirecionamento para a Página de Login se Não Autenticado

- Configura o teste para renderizar o componente ProtectedRoute dentro de um MemoryRouter.
- Simula um estado não autenticado (nenhum token no localStorage).
- Verifica se o conteúdo da página de login (Sign In Page) é exibido.
- Verifica a Renderização do Conteúdo Protegido se Autenticado

- Configura o teste para simular um estado autenticado (token e expiração válidos no localStorage).
- Verifica se o conteúdo protegido (Protected Content) é exibido.
- Verifica a Remoção do Token Expirado e Redireciona para a Página de Login

- Configura o teste para simular um token expirado.
- Verifica se o token é removido do localStorage e se o conteúdo da página de login é exibido.
*/
describe("ProtectedRoute", () => {
    afterEach(() => {
        localStorage.clear();
    });

    it("redirects to /signin if not authenticated", async () => {

        render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route path="/signin" element={<div>Sign In Page</div>} />
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute
                                element={<div>Protected Content</div>}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument();
        });
    });

    it("renders protected content if authenticated", async () => {
        const token = "fake-token";
        const expiration = new Date(
            new Date().getTime() + 5 * 60000
        ).toISOString(); // 5 minutos no futuro
        localStorage.setItem("auth-token", token);
        localStorage.setItem("token-expiration", expiration);

        render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute
                                element={<div>Protected Content</div>}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
        });
    });

    it("removes expired token and redirects to /signin", async () => {
        const token = "expired-token";
        const expiration = new Date(
            new Date().getTime() - 5 * 60000
        ).toISOString(); // 5 minutos no passado
        localStorage.setItem("auth-token", token);
        localStorage.setItem("token-expiration", expiration);

        render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route path="/signin" element={<div>Sign In Page</div>} />
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute
                                element={<div>Protected Content</div>}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(localStorage.getItem("auth-token")).toBeNull();
            expect(localStorage.getItem("token-expiration")).toBeNull();
            expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument();
        });
    });
});
