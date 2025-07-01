import { api } from "./api";
import { toast } from "react-toastify";

const AuthService = {
    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");
        const expiration = localStorage.getItem("token-expiration");

        if (token && expiration) {
            const now = new Date();
            const expDate = new Date(expiration);
            return now < expDate;
        }
        return false;
    },

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await api.post("/api/login", {
                email,
                password,
            });

            if (response.status === 201 && response.data.token?.value) {
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 2);

                const token = response.data.token.value;
                localStorage.setItem("token", token);
                localStorage.setItem("token-expiration", expirationDate.toISOString());

                return true;
            } else {
                toast.error("Credenciais inválidas");
                return false;
            }
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            toast.error("Erro ao fazer login");
            return false;
        }
    },

    async logout(): Promise<void> {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("token-expiration");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    },

    async register(fullName: string, email: string, password: string): Promise<boolean> {
        try {
            const response = await api.post("/api/register", {
                fullName,
                email,
                password,
            });

            if (response.status === 201) {
                toast.success("Cadastrado com sucesso!");
                return true;
            } else {
                toast.error("Falha no registro");
                return false;
            }
        } catch (error: any) {
            console.error("Erro ao fazer registro:", error);
            toast.error("Erro ao fazer registro");
            return false;
        }
    },

    async getProfile(): Promise<any> {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Usuário não autenticado");

            const response = await api.get("/api/profile");

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
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Usuário não autenticado");

            const response = await api.put(
                `/api/users/${userId}`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Perfil atualizado com sucesso!");
                return true;
            } else {
                toast.error("Falha ao atualizar perfil");
                return false;
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            toast.error("Erro ao atualizar perfil ou usuário já existente");
            return false;
        }
    },

    async deleteUser(userId: number): Promise<boolean> {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Usuário não autenticado");

            const response = await api.delete(`/api/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                toast.success("Perfil deletado com sucesso!");
                await this.logout();
                return true;
            } else {
                toast.error("Falha ao deletar perfil");
                return false;
            }
        } catch (error) {
            console.error("Erro ao deletar perfil:", error);
            toast.error(
                "Falha ao deletar perfil, você possui tarefas cadastradas. Verifique e tente novamente."
            );
            return false;
        }
    },
};

export default AuthService;
