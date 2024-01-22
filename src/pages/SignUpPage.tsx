import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import axios, { AxiosError } from "axios"; 
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InputFieldProps {
  placeholder: string;
  type: string;
  autoComplete?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  dataTest: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (fieldName: keyof FormData) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const handleSignUpSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Todos os campos devem ser preenchidos.",
        customClass: {
          popup: "custom-popup-class",
          icon: "custom-icon-class",
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As senhas não coincidem.",
        customClass: {
          popup: "custom-popup-class",
          icon: "custom-icon-class",
        },
      });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, {
        name,
        email,
        password,
        confirmPassword,
      });

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "E-mail já está sendo utilizado",
          customClass: {
            popup: "custom-popup-class",
            icon: "custom-icon-class",
          },
        });
      } else {
        console.error("Erro ao cadastrar usuário:", error);
        console.log(`${import.meta.env.VITE_API_URL}`);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Erro ao cadastrar o usuário, verifique os campos e tente novamente!",
          customClass: {
            popup: "custom-popup-class",
            icon: "custom-icon-class",
          },
        });
      }
    }
  };

  return (
    <SignUpContainer>
      <LogoImage src="./logo.svg" alt="Logo" />
      <form onSubmit={handleSignUpSubmit}>
        <InputField
          placeholder="Nome"
          type="text"
          value={formData.name}
          onChange={handleInputChange("name")}
          dataTest="name"
        />
        <InputField
          placeholder="E-mail"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          dataTest="email"
        />
        <InputField
          placeholder="Senha"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          dataTest="password"
        />
        <InputField
          placeholder="Confirme a senha"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          dataTest="conf-password"
        />

        <StyledButton data-test="sign-up-submit" type="submit">
          Cadastrar
        </StyledButton>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F07D6F;
`;

const StyledButton = styled.button`
  background-color: #FFA000;
  width: 30%;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;


