export interface IVehicle {
  id: number;
  name: string;
  brand: string
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
}

export interface IVehicleFilter {
  brand: string
  isFavorite: boolean;
  year: number;
  color: string;
  minPrice: number;
  maxPrice: number;
}
