export interface IVehicle {
  id: number;
  name: string;
  description: string;
  plate: string;
  isfavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
}
export interface IformState {
  id?:number;
  name?: string;
  description?: string;
  plate?: string;
  year?: number;
  color?: string;
  price?: number;
}