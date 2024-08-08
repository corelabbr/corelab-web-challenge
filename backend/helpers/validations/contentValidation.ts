const contentValidation = async (content:string) => {
  if (!content) {
    return "Conteúdo é requirido.";
  }

  if (content.length < 2) {
    return "Ao menos 2 caracteres são necessários.";
  }

  return "Valid content.";
};

export default contentValidation;
