export const passwordValidator = (name: string): boolean => {
  const regex =
    /^(?![\s])[\p{L}]{2,}(?:\s[\p{L}À-ÖØ-öø-ÿ]{2,})(?:\s[\p{L}À-ÖØ-öø-ÿ]{1,})*$/u;
  return regex.test(name.trim());
};
