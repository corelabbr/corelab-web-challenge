import { useState } from "react";
import styles from "./Register.module.scss";
import { useFeedback } from "../../providers/FeedbackProvider";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/users";

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { showToast, showLoading } = useFeedback();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    name: "",
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
      const response = await register(
        formData.name,
        formData.email,
        formData.password
      );
      console.log(response);
      showLoading(false);
      showToast({
        type: "success",
        title: "Registro",
        message: "Registro bem-sucedido!",
      });
      navigate("/login");
    } catch (error: any) {
      showLoading(false);

      const errorMessage = error?.response?.data?.message;

      showToast({
        type: "error",
        title: "Erro no Registro",
        message: errorMessage,
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <h1 className={styles.title}>Bem-vindo ao CoreNotes</h1>

        <img
          src="/navbar-icon.png"
          alt="CoreNotes Icon"
          width="72px"
          height="72px"
        />

        <p className={styles.subtitle}>
          Faça o cadastro para criar suas notas e começar a organizar sua vida!
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={styles.registerForm}
      >
        <h2 className={styles.formTitle}>Cadastrar</h2>

        <input
          type="text"
          placeholder="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
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
            {/* Ou use um ícone SVG */}
          </button>
        </div>
        <button type="submit" className="btn-primary">
          Cadastrar
        </button>
        <p>
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
