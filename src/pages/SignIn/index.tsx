import React, { FormEvent, useEffect, useState } from "react";
import AuthService from "./../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/notes.png";
import { PiSignInFill } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
    LeftSide,
    LogoContainer,
    Logo,
    WelcomeText,
    InfoText,
    RightSide,
    FormContainer,
    AlertBox,
    InputWrapper,
    ToggleButton,
    RegisterLink,
    Container,
    Button,
    Input,
    Loading
} from "./styles";

interface SignInProps {
    onLogin: (authenticated: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
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
            if (!email || !password) {
                setError("Todos os campos são obrigatórios.");
                return;
            }

            if (password.length < 6) {
                setError("A senha deve ter pelo menos 6 caracteres.");
                return;
            }
            const authenticated = await AuthService.login(email, password);

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
                        type="email"
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                    />
                    <InputWrapper>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={255}
                        />
                        <ToggleButton
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            title="Mostrar senha"
                            aria-label="Mostrar senha"
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
