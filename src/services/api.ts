import axios, { AxiosResponse } from "axios";
import { IVehicleFormData, IVehicle, IFilterOptions } from "../shared/types";

const baseURL = "http://localhost:3333";

export const api = axios.create({
	baseURL: baseURL,
});

export function createVehicle(data: IVehicleFormData): Promise<AxiosResponse> {
	return api.post<IVehicle>("/vehicles", data);
}

export function deleteVehicle(id: string): Promise<AxiosResponse> {
	return api.delete<void>(`vehicles/${id}`);
}

export function getVehicle(id: string): Promise<AxiosResponse> {
	return api.get<IVehicle>(`vehicles/${id}`);
}

export function getVehicles(
	searchString: string = "",
	filterOptions?: IFilterOptions
): Promise<AxiosResponse> {
	return api.get(`/vehicles`, {
		params: {
			searchString,
			...filterOptions,
		},
	});
}

export function toggleVehicleFavorite(id: string): Promise<AxiosResponse> {
	return api.patch<IVehicle>(`/vehicles/${id}`);
}

export function updateVehicle(
	data: IVehicleFormData,
	id: string
): Promise<AxiosResponse> {
	return api.put<IVehicle>(`/vehicles/${id}`, data);
}
