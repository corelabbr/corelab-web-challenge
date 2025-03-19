import { api } from "./api";
import { toast } from "react-toastify";

const AuthService = {
    isAuthenticated(): boolean {
        const token = localStorage.getItem("auth-token");
        const expiration = localStorage.getItem("token-expiration");

        if (token && expiration) {
            const now = new Date();
            const expDate = new Date(expiration);
            return now < expDate;
        }
        return false;
    },

    async login(username: string, password: string): Promise<boolean> {
        try {
            const response = await api.post("/api/user/login", {
                username,
                password,
            });
            if (response.status === 201 && response.data.token) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7);
                localStorage.setItem("auth-token", response.data.token);
                localStorage.setItem(
                    "token-expiration",
                    expirationDate.toISOString()
                );
                return true;
            } else {
                throw new Error("Falha na autenticação");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return false;
        }
    },

    async logout(): Promise<void> {
        try {
            localStorage.removeItem("auth-token");
            localStorage.removeItem("token-expiration");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    },

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<boolean> {
        try {
            const response = await api.post("/api/user/register", {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                toast.success("Cadastrado com sucesso!");
                return true;
            } else {
                throw new Error("Falha no registro");
            }
        } catch (error) {
            console.error("Erro ao fazer registro:", error);
            return false;
        }
    },

    async getProfile(): Promise<any> {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) throw new Error("Usuário não autenticado");

            const response = await api.get("/api/user/profile", {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Falha ao obter perfil");
            }
        } catch (error) {
            console.error("Erro ao obter perfil:", error);
            throw error;
        }
    },

    async updateUser(userId: number, updatedData: object): Promise<boolean> {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) throw new Error("Usuário não autenticado");

            const response = await api.put(
                `/api/user/update/${userId}`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                toast.success("Perfil atualizado com sucesso!");
                return true;
            } else {
                throw new Error("Falha ao atualizar perfil");
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            toast.error("Erro ao atualizar perfil ou usuário já existente");
            return false;
        }
    },

    async deleteUser(userId: number): Promise<boolean> {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) throw new Error("Usuário não autenticado");

            const response = await api.delete(`/api/user/delete/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success("Perfil deletado com sucesso!");
                await this.logout();
                return true;
            } else {
                throw new Error("Falha ao deletar perfil");
            }
        } catch (error) {
            toast.error(
                "Falha ao deletar perfil, você possui tarefas cadastradas. Error: " +
                    error
            );
            console.error(
                "Erro ao deletar perfil. Veja o erro retornado:",
                error
            );
            return false;
        }
    },
};

export default AuthService;
