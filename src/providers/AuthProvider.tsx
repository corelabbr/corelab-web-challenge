import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/users";
import { User } from "../types/User";
import api from "../api/api";

interface AuthContextProps {
  user: any;
  token: string | null;
  logout: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; error: boolean; message: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  logout: () => {},
  login: async () => ({ token: "", error: false, message: "" }),
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        localStorage.setItem("token", token);
        try {
          const userData = await getUser();
          setUser(userData.data);
          localStorage.setItem("user", JSON.stringify(userData.data));
        } catch (error) {
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        localStorage.removeItem("token");
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const dataReponse = {
      token: response?.data.access_token,
      error: response.status !== 200,
      message: response?.data?.message,
    };
    localStorage.setItem("token", dataReponse.token);
    setToken(dataReponse.token);
    return dataReponse;
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
        login,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
