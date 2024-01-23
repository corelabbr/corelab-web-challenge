import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface InputFieldProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  dataTest: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  value,
  onChange,
  dataTest,
}) => {
  return (
    <Input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      data-test={dataTest}
    />
  );
};

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;

export default InputField;
