import React, { ChangeEvent, FormEvent } from "react";
import InputField from "./InputField";

interface SignUpFormProps {
  onSubmit: (event: FormEvent) => void;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  telefone: string;
  handleInputChange: (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  name,
  email,
  password,
  confirmPassword,
  cpf,
  telefone,
  handleInputChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        placeholder="Nome"
        type="text"
        value={name}
        onChange={handleInputChange("name")}
        dataTest="name"
      />
      <InputField
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={handleInputChange("email")}
        dataTest="email"
      />
      <InputField
        placeholder="Senha"
        type="password"
        value={password}
        onChange={handleInputChange("password")}
        dataTest="password"
      />
      <InputField
        placeholder="Confirme a senha"
        type="password"
        value={confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        dataTest="conf-password"
      />
     
    </form>
  );
};

export default SignUpForm;
