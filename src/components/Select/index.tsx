import { SelectHTMLAttributes, useEffect } from 'react';
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { Container, InputBase, Label } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  initialValue?: InitialValue;
}

type InitialValue = {
  fieldName: string;
  fieldValue: string;
};

export function Select({
  name,
  label,
  register,
  required,
  initialValue,
  ...rest
}: SelectProps) {
  const { setValue } = useForm();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue.fieldName, initialValue.fieldValue);
    }
  }, [initialValue, setValue]);
  return (
    <Container>
      <Label>{label}</Label>
      <InputBase {...register(name, { required })} {...rest} />
    </Container>
  );
}
