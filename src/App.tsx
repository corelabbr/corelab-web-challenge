import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import AuthService from "./services/authService";
import SignUp from "./pages/SignUp";
import Funny404 from "./components/Funny404";
import UserProfileCard from "./components/User";

function App() {
    const [, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Função para verificar a autenticação
        const checkAuthentication = async () => {
            const authenticated = AuthService.isAuthenticated();
            setIsAuthenticated(authenticated);
        };

        checkAuthentication(); // Verifica o estado de autenticação inicial

        // Opcional: Configura um intervalo para verificar a autenticação periodicamente
        const interval = setInterval(checkAuthentication, 60000); // Verifica a cada 60 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route
                    path="/signin"
                    element={<SignIn onLogin={setIsAuthenticated} />}
                />
                <Route path="*" element={<Funny404 />} />
                <Route path="/register" element={<SignUp />} />
                <Route
                    path="/profile"
                    element={<ProtectedRoute element={<UserProfileCard />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
