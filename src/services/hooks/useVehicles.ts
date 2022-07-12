import { useQuery } from 'react-query';
import { api } from '../api';

type IVehicle = {
  id: string;
  color: string;
  year: string;
  name: string;
  brand: string;
  price: number;
  favorite: boolean;
  description: string;
};

type GetVehiclesResponse = {
  vehicles: IVehicle[];
};

export async function getVehicles(): Promise<GetVehiclesResponse> {
  const { data } = await api.get('/');

  return {
    vehicles: data,
  };
}

export function useVehicles() {
  return useQuery(['/'], () => getVehicles(), {
    staleTime: 60000,
  });
}
