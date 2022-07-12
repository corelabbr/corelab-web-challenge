import { FileUpload } from 'graphql-upload';
import { CarsApi } from './graphql/dataSources/CarsApi';

export type Car = {
  id: number;
  model: string;
  brand: string;
  color: string;
  price: number;
  year: number;
  rating: number | null;
  category: string;
  image: Promise<FileUpload>;
};

export interface DataSources {
  carsApi: CarsApi;
}
