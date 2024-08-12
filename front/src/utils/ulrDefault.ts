export const URLDefault = (bool: boolean, search?: string) => {
  return `isFavorite=${bool}${(search && '&' + search) || ''}`;
};
