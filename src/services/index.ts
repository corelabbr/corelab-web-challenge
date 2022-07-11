import { PartlySunny } from "react-ionicons"
import { putVehicles, postVehicles, delVehicles } from "../lib/api"


import { IVehicle } from "../types/Vehicle";

const toggleFavorite = async (id: number, isFavorite: number) => {
    const toggle = isFavorite ? false : true
    const payload = await putVehicles(id, {isFavorite: toggle}) //passar id e informaçäo

    return payload
}

const registerVehicle = async (id: number | null, body: object) => {
    
    const payload = await postVehicles(body)

    return payload
}
 
const deleteVehicle = async (id: number) => {
    const payload = await delVehicles(id)

    return payload
}

const updateVehicle = async (id: number, body: object, isFavorite: Number | null) => {
    const favorite = isFavorite ? true: false
    body = Object.assign(body, {isFavorite : favorite})
    const payload = await putVehicles(id, body)
    
    return console.log(body)
}

const applyFilter = (color: string, year: number, maxValue: number, minValue: number, cb: Function) =>{

    return 
}



export {
    toggleFavorite,
    registerVehicle,
    deleteVehicle,
    updateVehicle,
}