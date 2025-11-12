import { useState } from "react";
import styles from "./Login.module.scss";
import { useFeedback } from "../../providers/FeedbackProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

interface IFormData {
  email: string;
  password: string;
}

const Login = () => {
  // Hooks for feedback and form data management

  const { showToast, showLoading } = useFeedback();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      showToast({
        type: "error",
        title: "Erro",
        message: "Preencha todos os campos.",
      });
      return;
    }

    try {
      showLoading(true);
      await login(formData.email, formData.password);
      showLoading(false);
      showToast({
        type: "success",
        title: "Login",
        message: "Login bem-sucedido!",
      });
      navigate("/");
    } catch (error: any) {
      showLoading(false);

      const errorMessage = error?.response?.data?.message;

      showToast({
        type: "error",
        title: "Erro no login",
        message: errorMessage,
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h1 className={styles.title}>Bem-vindo ao CoreNotes</h1>

        <img
          src="/navbar-icon.png"
          alt="CoreNotes Icon"
          width="72px"
          height="72px"
        />

        <p className={styles.subtitle}>
          Faça login para acessar suas notas e começar a organizar sua vida!
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={styles.loginForm}
      >
        <h2 className={styles.formTitle}>Entrar</h2>

        <input
          type="text"
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className={styles.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="btn-primary">
          Entrar
        </button>
        <p>
          Não tem uma conta? <a href="/register">Registre-se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
