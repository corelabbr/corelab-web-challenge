import { Container } from './styles';
import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSave?: boolean;
}

export function Button({ isSave, ...rest }: ButtonProps) {
  return (
    <Container isSave={isSave} {...rest}>
      {isSave ? 'SALVAR' : 'ADICIONAR'}
    </Container>
  );
}
