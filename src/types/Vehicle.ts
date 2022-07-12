export interface IVehicle {
  id: string;
  name: string;
  brand : string;
  startsWith : FunctionConstructor;
  board: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
}
