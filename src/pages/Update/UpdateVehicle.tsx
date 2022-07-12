import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Arrow } from "../../components/GoBackButton/GoBackButton";
import { VehicleForm } from "../../components/VehicleForm/VehicleForm";

import { IVehicle } from '../../types/Vehicle';
import api from "../../lib/api";

export function UpdateVehicle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({});

    useEffect(() => {
        api.get(`/vehicle/${id}`)
        .then(response => {
            setVehicle(response.data);            
        })
        .catch(err => console.log(err));
    }, [id])

    function updateVehicle(vehicle: IVehicle) {
        try {
            api.put(`/vehicle/${vehicle.id}`, {
                ...vehicle,
                isFavorite: vehicle.isFavorite
            })
            .then(res => setVehicle(res.data));
        } catch (error) {
            console.log(error);
        }
        navigate("/");
        alert('Veículo atualizado com sucesso!')
        window.location.reload();
    }

    return (
        <div>
            <Arrow />
            <VehicleForm   
                handleSubmit={updateVehicle}
                vehicleData={vehicle}
            />
        </div>
    )
}