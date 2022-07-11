import api from '../services/api'

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

export var initialValues = { name: '', brand: '', year: '', price: "", 
color: '', plate: '', description: ''};


export const getVehicles = async() =>{
    const response = await api.get('/vehicles/?search=all');
    
    return response;
}

export const searchVehicles = async(search: string) =>{
    const response = await api.get(`/vehicles/?search=${search}`);
    
    return response;
}

export const filterVehicles = async(v: vehicle)=>{
    var color = v.color.substring(1);
    color = '%23' + color;
    
    const response = await api.get(`http://localhost:3000/vehicles/findByfilter/?filter=${v.name}&brand=${v.brand}&year=${v.year}&color=${color}&minP=${v.minP}&maxP=${v.maxP}`);
    //const response = await api.get(`http://localhost:3000/vehicles/findByfilter/?filter=uno&brand=fiat&year=2011&color=%23080808&minP=13000&maxP=17000`);   
    return response;
}

export const createVehicle = async(vehicle: vehicle) =>{
    const response = await api.post('/vehicles', vehicle); 

    return response.data.name
}

export const updateVehicle = async(id: string, vehicle: vehicle) =>{
    const response = await api.put(`/vehicles/${id}`, vehicle);

    return response
}


export const getFavorites = async()=>{
    const id='favorites'
    const response = await api.get(`vehicles/${id}`)
    return response
}

export const getOneVehicle = async(id: string)=>{
    const response = await api.get(`vehicles/${id}`)

    const vehicle ={
        id: response.data[0]._id,
        name: response.data[0].name,
        brand: response.data[0].brand,
        year: response.data[0].year,
        isFavorite: response.data[0].isFavorite,
        color: response.data[0].color,
        price: response.data[0].price,
        plate: response.data[0].plate,
        description: response.data[0].description             
    }

    return vehicle
}

export const deleteVehicle = async(id: string)=>{
    const response = await api.delete(`vehicles/${id}`)
    return response
}