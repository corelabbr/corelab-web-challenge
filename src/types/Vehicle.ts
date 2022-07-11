export interface IVehicle {
  id: number;
  brand: string;
  name: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  user: {id: number}
  createdAt: Date;
}
