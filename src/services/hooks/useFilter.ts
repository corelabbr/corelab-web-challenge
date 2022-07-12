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
export async function getVehicles(vehicle): Promise<GetVehiclesResponse> {
  const { data } = await api.get(
    `/vehicles/filter?brand=${vehicle.brand}&color=${vehicle.color}&year=${vehicle.year}&min=${vehicle.min}&max=${vehicle.max}`,
  );
  return {
    vehicles: data,
  };
}

export function useFilter(vehicle) {
  return useQuery(['/filter'], () => getVehicles(vehicle), {
    staleTime: 60000,
  });
}
