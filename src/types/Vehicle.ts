export interface IVehicle {
  id: number;
  name: string;
  description: string;
  plate: string;
  is_favorite: boolean;
  year: number;
  color: string;
  price: number;
  created_at?: Date;
}
