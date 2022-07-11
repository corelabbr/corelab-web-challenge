import { useState } from "react"
import { IVehicle } from "../../types/Vehicle";

export function useIndex(){
    const [buttonActivate, setButtonActivate] = useState<boolean>(false)
    const [deleteActivate, setDeleteActivate] = useState<boolean>(false)
    const [filterActivate, setFilterActivate] = useState<boolean>(false)
    const [idVehicleSelected, setIdVehicleSelecter] = useState<number | null>(null)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");
    const [description, setDescription] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [colorFilter, setColorFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [minValue, setMinValue] = useState("")
    const [itemToDelete, setItemToDelete] = useState<number>(0);
    const [isFavoriteVehicle, setIsFavoriteVehicle] = useState<number | null>(null)


    function cleanForm(){
        setName("");
        setPrice("");
        setColor("");
        setYear("");
        setPlate("");
        setDescription("")
    }

  
    return { 
        buttonActivate,
        setButtonActivate,
        deleteActivate,
        setDeleteActivate,
        name,
        setName,
        color,
        setColor,
        year,
        setYear,
        plate,
        setPlate,
        price,
        setPrice,
        description,
        setDescription,
        cleanForm,
        itemToDelete,
        setItemToDelete,
        idVehicleSelected,
        setIdVehicleSelecter,
        isFavoriteVehicle,
        setIsFavoriteVehicle,
        filterActivate,
        setFilterActivate,
        maxValue,
        setMaxValue,
        colorFilter,
        setColorFilter,
        yearFilter,
        setYearFilter,
        minValue,
        setMinValue

    }
}