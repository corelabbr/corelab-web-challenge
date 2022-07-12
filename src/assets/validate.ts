const date = new Date();

export const validateName = (value: string) => {
  const erros = [];

  if (!value) {
    erros.push("Nome não pode ser vazio");
  }

  return erros;
};

export const validateDescription = (value: string) => {
  const erros = [];

  if (!value) {
    erros.push("Descrição não pode ser vazio");
  }

  return erros;
};

export const validatePrice = (value: number) => {
  const erros = [];

  if (!value) {
    erros.push("Valor não pode ser vazio");
  }

  return erros;
};

export const validateColor = (value: string) => {
  const erros = [];

  if (!value) {
    erros.push("Cor não pode ser vazio");
  }

  return erros;
};

export const validatePlate = (value: string) => {
  const erros = [];

  if (!value) {
    erros.push("Placa não pode ser vazio");
  }

  return erros;
};

export const validateYear = (value: number) => {
  const erros = [];

  if (!value) {
    erros.push("Ano não pode ser vazio");
  }
  if (value > date.getFullYear()) {
    erros.push("Ano não pode ser maior que atual");
  }
  if (value < 1920) {
    erros.push("Não aceitamos carros de 1920 para baixo");
  }

  return erros;
};
