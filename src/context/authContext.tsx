import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AuthService from './../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    login: async () => false,
    logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        const expiration = localStorage.getItem('token-expiration');

        if (token && expiration) {
            const now = new Date();
            const expDate = new Date(expiration);

            if (now < expDate) {
                setIsAuthenticated(true);
            } else {
                AuthService.logout();
                setIsAuthenticated(false);
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const success = await AuthService.login(username, password);
        setIsAuthenticated(success);
        return success;
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
