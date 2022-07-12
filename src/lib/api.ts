import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL:"http://localhost:5000/vehicle"
});



// crud
export const getVehicles = async (query?: string): Promise<AxiosResponse> => {
    let url =  `/listVehicle/`
  if(query !== undefined){
    url += `?q=${query}`
  }
    return api.get(url)
}

export const createVehicles = async (data: object): Promise<AxiosResponse> => {
      let url =  `/createVehicle`
      return api.post(url, data)                                  
}

export const ediVehicles = async (id:string | undefined, data: object): Promise<AxiosResponse> => {
  return api.put(`/${id}`, data) 
}

export const deleteVehicles = async (id: string): Promise<AxiosResponse> => {
  return api.delete(`/${id}`)                                  
}

export const findVehicle = async (id:string | undefined): Promise<AxiosResponse> =>{
  
  return api.get(`/findVehicle/${id}`)

}

// Favoritar veiculo
export const favoriteVehicle = async (id:string | undefined, data: any):Promise<AxiosResponse> => {
  return api.put(`/isfavorite/${id}`, data) 
}


//filter