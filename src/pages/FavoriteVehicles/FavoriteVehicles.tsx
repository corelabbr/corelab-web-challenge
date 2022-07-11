import {  useEffect, useState } from "react";
import {useNavigate, } from 'react-router-dom'

import Layout from "../../components/layout/layout";
import styles from './FavoriteVehicles.module.scss';
import CardItem from "../../components/cardItem/cardItem";
import * as serviceVehicle from '../../services/vehicles.service';
import AlertItem from '../../components/alert/alert'

const Favorites = () =>{
    const navigate = useNavigate();
    const [renderRemoveAlert, setRenderRemoveAlert] = useState<boolean>(false)
    const [renderFavorite, setRenderFavorite] = useState<boolean>(false);
    const [vehicles, setVehicles] = useState<any[]>([])

    useEffect(() =>{
        async function getVehicles(){
            const response = await serviceVehicle.getFavorites();
            setVehicles(response.data)
        }

        getVehicles()
    }, [])

    async function removeVehicle(id: string){
        
        const response = await serviceVehicle.deleteVehicle(id)

        if(response.data === true) setRenderRemoveAlert(true)     
    }

    async function addFavorite(id: string, vehicle:any) {
        const favorite = false;
        await serviceVehicle.updateVehicle(id, vehicle, favorite);

        const response = await serviceVehicle.getFavorites();
        setVehicles(response.data);

        setRenderFavorite(true)
    }


    return(
        <Layout>
           <div className={styles.Content}>

                <h2>Meus favoritos</h2>

                {renderFavorite ? 
                    <AlertItem
                        info={`Veículo removido dos favoritos.`}
                        color={'#2196F3'}
                        onClick={() => setRenderFavorite(false)}
                    />
                :   null
                }

                {renderRemoveAlert ? 
                    <AlertItem
                        info={`Veículo excluído com sucesso.`}
                        color={'#f44336'}           
                        onClick={() => setRenderRemoveAlert(false)}
                    />
                :   null
                }
           
                <div className={styles.ContentCard}>
                    {vehicles.map((vehicle)=>(
                        <CardItem
                            key={vehicle._id}
                            id={vehicle._id}
                            name={vehicle.name}
                            brand={vehicle.brand}
                            color={vehicle.color}
                            price= {vehicle.price}
                            year= {vehicle.year}
                            description={vehicle.description}
                            plate={vehicle.plate}
                            onFavorite={() => addFavorite(vehicle._id, vehicle)}
                            onDelete={() => removeVehicle(vehicle._id)}
                            onEdit={() => navigate(`../updatevehicle/${vehicle._id}`)}
                        />
                    ))}
                </div>              
            </div>
        </Layout>
    );
}

export default Favorites;