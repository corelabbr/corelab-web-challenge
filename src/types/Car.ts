import { IBrand } from "./Brand";

export interface ICar {
  id: number;
  name: string;
  brand_id: number;
  color: string;
  year: Date;
  km: number;
  price: number;
  license_plate: string;
  description: string;
  brand: IBrand;
}
