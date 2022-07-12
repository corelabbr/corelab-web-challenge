import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Arrow } from "../../components/GoBackButton/GoBackButton";
import { VehicleForm } from "../../components/VehicleForm/VehicleForm";

import api from '../../lib/api';
import { IVehicle } from "../../types/Vehicle";

export function NewVehicle() {
    const navigate = useNavigate();

    function createVehicle(vehicle: IVehicle) {
        api.post('/add', {
            ...vehicle,
            "isFavorite": false
        })
        navigate("/");
        alert('Veículo adicionado com sucesso!')
        window.location.reload();
    }

    return (
        <div>
            <Arrow />
            <VehicleForm  
                handleSubmit={createVehicle} 
            />
        </div>
    )
}