import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import AuthService from "./../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/notes.png";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

const Button = styled.button`
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

const Loading = styled.span`
    color: "#FFF";
`;

const AlertBox = styled.div`
    background-color: #ffdddd;
    color: #d8000c;
    padding: 10px;
    margin-bottom: 20px;
    border-left: 5px solid #f44336;
    border-radius: 5px;
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

const SignUp = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!username || !email || !password || !password2) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        if (password !== password2) {
            setError("As senhas são diferentes.");
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

        setLoading(true); // Inicia o carregamento

        try {
            const registered = await AuthService.register(
                username,
                email,
                password
            );

            if (registered) {
                navigate("/signin");
            } else {
                setError(
                    "Erro ao tentar registrar ou usuário existente. Tente novamente."
                );
            }
        } catch (error: any) {
            setError(
                "Erro ao tentar registrar. Verifique as informações e tente novamente."
            );
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <Container>
            <LeftSide>
                <LogoContainer>
                    <Logo src={logo} alt="CoreNotes Logo" />
                </LogoContainer>
                <WelcomeText>CoreNotes</WelcomeText>
                <InfoText>Realize o cadastro para começar a usar.</InfoText>
            </LeftSide>
            <RightSide>
                <FormContainer onSubmit={handleSubmit}>
                    <h2>Registrar</h2>
                    {error && <AlertBox>{error}</AlertBox>}
                    <Input
                        type="text"
                        placeholder="Nome de usuário maior que 6 dígitos"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputWrapper>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Sua senha maior que 6 dígitos"
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
                    <InputWrapper>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <ToggleButton
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            title="Mostrar senha"
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </ToggleButton>
                    </InputWrapper>
                    <Button
                        type="submit"
                        data-testid="submit-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loading>Enviando...</Loading>
                        ) : (
                            <>
                                <RiSendPlane2Fill
                                    size="15"
                                    style={{ marginRight: "5px" }}
                                />
                                Registrar
                            </>
                        )}
                    </Button>
                    <RegisterLink>
                        <span className="divider">Ou</span>
                        <Link to="/signin">Voltar ao login</Link>
                    </RegisterLink>
                </FormContainer>
            </RightSide>
        </Container>
    );
};

export default SignUp;
