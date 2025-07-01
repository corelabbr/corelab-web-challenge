import { FormEvent, useEffect, useState } from "react";
import AuthService from "./../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/notes.png";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
    Container,
    LeftSide,
    LogoContainer,
    Logo,
    WelcomeText,
    InfoText,
    RightSide,
    FormContainer,
    AlertBox,
    Input,
    InputWrapper,
    ToggleButton,
    Button,
    Loading,
    RegisterLink,
} from "./styles";

const SignUp = () => {
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    const hasUppercaseAndNumber = passwordRegex.test(password);
    const confirmValid =
        password === password2 && passwordRegex.test(password2);

    const fullNameRegex =
        /^([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)(\s[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)+$/;
    const fullNameValid = fullNameRegex.test(fullName);

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

        if (!fullName || !email || !password || !password2) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        if (email.length < 6) {
            setError("O email deve ter pelo menos 6 caracteres.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (!hasUppercaseAndNumber) {
            setError(
                "A senha deve conter pelo menos uma letra maiúscula e um número."
            );
            return;
        }

        if (!confirmValid) {
            setError(
                "A confirmação deve ser igual e conter pelo menos uma letra maiúscula e um número."
            );
            return;
        }

        if (!fullNameValid) {
            setError(
                "O nome completo deve começar com letra maiúscula e conter pelo menos dois nomes."
            );
            return;
        }

        setLoading(true);

        try {
            const registered = await AuthService.register(
                fullName,
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
            setLoading(false);
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
                        placeholder="Seu nome completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        maxLength={255}
                    />
                    <div
                        style={{
                            color: fullName ? (fullNameValid ? "green" : "red") : "",
                            fontSize: "0.9rem",
                            marginBottom: "8px",
                        }}
                    >
                        {fullName
                            ? fullNameValid
                                ? "✔ Nome válido"
                                : "✖ Deve começar com maiúscula e ter pelo menos dois nomes"
                            : null}
                    </div>
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
                            placeholder="Sua senha maior que 6 dígitos"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={255}
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
                    <div
                        style={{
                            color: password ? (hasUppercaseAndNumber ? "green" : "red") : "",
                            fontSize: "0.9rem",
                            marginBottom: "8px",
                        }}
                    >
                        {password
                            ? hasUppercaseAndNumber
                                ? "✔ Senha válida"
                                : "✖ Precisa de pelo menos 1 maiúscula e 1 número"
                            : null}
                    </div>
                    <InputWrapper>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            maxLength={255}
                        />
                        <ToggleButton
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            title="Mostrar senha"
                            aria-label="Mostrar senha"
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </ToggleButton>
                    </InputWrapper>
                    <div
                        style={{
                            color: password2 ? (confirmValid ? "green" : "red") : "",
                            fontSize: "0.9rem",
                            marginBottom: "8px",
                        }}
                    >
                        {password2
                            ? confirmValid
                                ? "✔ Confirmação correta"
                                : "✖ Confirmação deve ser igual e válida"
                            : null}
                    </div>
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
