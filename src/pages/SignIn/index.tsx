import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import AuthService from "./../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/notes.png";
import { PiSignInFill } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignInProps {
    onLogin: (authenticated: boolean) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const LeftSide = styled.div`
    flex: 1;
    background-color: #4a90e2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 20px;

    @media (min-width: 768px) {
        padding: 0;
    }
`;

const LogoContainer = styled.div`
    margin-bottom: 20px;
`;

const Logo = styled.img`
    max-width: 100px;

    @media (min-width: 768px) {
        max-width: 150px;
    }
`;

const WelcomeText = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;

    @media (min-width: 768px) {
        font-size: 2rem;
    }
`;

const RightSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
    padding: 20px;
`;

const FormContainer = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 4px #4a90e2;
    }
`;

const Button = styled.button<{ disabled: boolean }>`
    width: 100%;
    padding: 10px;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #357abd;
    }

    &:disabled {
        background-color: #a4c3e8;
        cursor: not-allowed;
    }
`;

const RegisterLink = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 0.9rem;

    a {
        color: #4a90e2;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .divider {
        display: flex;
        justify-content: center;
        margin: 0 10px;
        position: relative;
        top: -1px;
    }
`;

const InfoText = styled.h3`
    font-size: 1rem;
    color: #fff;
    margin-bottom: 20px;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
`;

const Loading = styled.span`
    color: "#FFF";
`;

const AlertBox = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
`;

const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-58%);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 100%;

    svg {
        color: #555;
    }
`;


const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        const expiration = localStorage.getItem("token-expiration");

        if (token && expiration) {
            const now = new Date();
            const expDate = new Date(expiration);
            if (now < expDate) {
                navigate("/dashboard");
            }
        }
    }, [navigate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            if (!username || !password) {
                setError("Todos os campos são obrigatórios.");
                return;
            }
            if (username.length < 6) {
                setError("O nome de usuário deve ter pelo menos 6 caracteres.");
                return;
            }

            if (password.length < 6) {
                setError("A senha deve ter pelo menos 6 caracteres.");
                return;
            }
            const authenticated = await AuthService.login(username, password);

            if (authenticated) {
                onLogin(true);
                navigate("/");
            } else {
                setError("Credenciais inválidas ou erro na autenticação");
            }
        } catch (error: any) {
            setError("Erro ao tentar fazer login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <LeftSide>
                <LogoContainer>
                    <Logo src={logo} alt="CoreNotes Logo" />
                </LogoContainer>
                <WelcomeText>CoreNotes</WelcomeText>
                <InfoText>
                    Bem-vindo! Realize o login para acessar suas tarefas.
                </InfoText>
            </LeftSide>
            <RightSide>
                <FormContainer onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <AlertBox>{error}</AlertBox>}
                    <Input
                        type="text"
                        placeholder="Seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputWrapper>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ToggleButton
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            title="Mostrar senha"
                        >
                            {showPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </ToggleButton>
                    </InputWrapper>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Loading>Entrando...</Loading>
                        ) : (
                            <>
                                <PiSignInFill
                                    size="15px"
                                    style={{ marginRight: "5px" }}
                                />
                                Entrar
                            </>
                        )}
                    </Button>
                    <RegisterLink>
                        <span className="divider">Ou</span>
                        <Link to="/register">Cadastre-se</Link>
                    </RegisterLink>
                </FormContainer>
            </RightSide>
        </Container>
    );
};

export default SignIn;
