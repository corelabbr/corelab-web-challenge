export interface IValidation {
  [tag: string]: { isDirty: boolean; erros: any[] };
}
