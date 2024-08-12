import * as yup from 'yup';

export const createCard = yup
  .object({
    title: yup
      .string()
      .required('O título é obrigatório')
      .max(40, 'Limite de 40 caracteres para o título')
      .trim(),
    description: yup
      .string()
      .required('A descrição é obrigatória')
      .max(500, 'Limite de 500 caracteres para a descrição'),
  })
  .required();
