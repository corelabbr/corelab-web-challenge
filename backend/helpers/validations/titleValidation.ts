const titleValidation = async (title:string) => {
  if (!title) {
    return "Título é requerido.";
  }

  if (title.length < 3) {
    return "Ao menos 3 caracteres são necessários.";
  }

  if (title.length > 30) {
    return "Máximo de 30 caracteres permitido.";
  }

  return "Valid title.";
};

export default titleValidation;
