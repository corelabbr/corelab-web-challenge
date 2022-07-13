export interface IVehicle {
  id: number;
  name: string;
  brand: string;
  description: string;
  plate: string;
  year: number;
  color: string;
  price: number;
  km: number;
  btns?: any;
  user_id?: string;
}

export interface IFormVehicle {
  name: string;
  brand: string;
  description: string;
  plate: string;
  year: number;
  color: string;
  price: number;
  km: number;
  user_id?: string;
}
