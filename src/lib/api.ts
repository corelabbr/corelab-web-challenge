import axios from 'axios';
import { IFormVehicle, IVehicle } from '../types/Vehicle';

export const api = axios.create({
	baseURL: 'http://localhost:3333/api'
});

export async function getVehicles(){
	const { data , status } = await api.get('/vehicles');
	if (status === 200){
		return data;
	}
	else{
		console.log(data);
	}	
}

export async function getFavoriteById(user_id: string | undefined){

	if(user_id !== undefined){
		const {data} = await api.get(`/favorites/${user_id}`);
		return data;
	}

}	

export async function createFavorite(user_id: string | undefined, vehicle_id: number){

	const favorite = {
		user_id: user_id,
		vehicle_id: vehicle_id
	};

	if(favorite.user_id !== undefined){
		await api.post('/favorites', favorite);
	}
}

export async function getVehicleById(vehicle_id: number){

	const { data } = await api.get(`/vehicles/${vehicle_id}`);

	return data;
}

export async function getVehicleByUserId(user_id: string | undefined){
	
	const { data } = await api.get(`/adverts/${user_id}`);

	return data;
}

//Create
export async function createVehicle(vehicle: IFormVehicle){

	if(vehicle.user_id !== undefined){
		await api.post('/vehicles', vehicle);
	}
}

//Edit
export async function editVehicle(vehicle: IFormVehicle, vehicle_id: number){

	await api.put(`/vehicles/${vehicle_id}`, vehicle);

}

//Delete
export async function deleteVehicle(vehicle_id: number){

	api.delete(`/vehicles/${vehicle_id}`);

}