import * as handleVehicle from '../repository/vehicles.reposistory'

interface vehicle{
    name: string,
    brand: string,
    year: number | string,
    color: string,
    price?: string,
    plate?: string,
    description?: string,
    minP?: string,
    maxP?: string
}

export const getVehicles = async() =>{
    const response = await handleVehicle.getVehicles();

    return response;
}

export const searchVehicle = async(search: string)=> {
    
    const response = await handleVehicle.searchVehicles(search);
    return response
}


export const createVehicle = async(v: vehicle) =>{
    const newVehicle = {
        name: v.name,
        brand: v.brand,
        year: v.year,
        color: v.color || "#3d4242",
        price: v.price,
        plate: v.plate,
        description: v.description || "-"
    }
    const response = await handleVehicle.createVehicle(newVehicle);
    return response  
}


export const updateVehicle = async(id: string, v: vehicle, favorite?: any) => {
    const updateVehicle = {
        name: v.name,
        brand: v.brand,
        year: v.year,
        color: v.color,
        isFavorite: favorite,
        price: v.price,
        plate: v.plate,
        description: v.description || "-"
    }

    const response = await handleVehicle.updateVehicle(id, updateVehicle);
    return response  
}


export const filterVehicle = async(v: vehicle) =>{
    const searchVehicle = {
        name: v.name,
        brand: v.brand,
        year: v.year,
        color: v.color || "#3d4242",
        minP: v.minP,
        maxP: v.maxP           
    }

    const response = await handleVehicle.filterVehicles(searchVehicle); 
    return response
}


export const deleteVehicle = async(id: string) =>{
    const response = await handleVehicle.deleteVehicle(id);
    return response;
}

export const getFavorites = async() =>{
    const response = await handleVehicle.getFavorites();
    return response
}