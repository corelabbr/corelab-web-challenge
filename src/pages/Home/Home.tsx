import {  ChangeEvent, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

import Layout from "../../components/layout/layout";
import styles from './Home.module.scss';
import ButtonBasic from "../../components/buttonBasic/buttonBasic";
import CardItem from "../../components/cardItem/cardItem";
import * as icon from '../../components/icons';
import * as servicesVehicle from '../../services/vehicles.service';
import AlertItem from '../../components/alert/alert'


const Home = () =>{
    const navigate = useNavigate();
    const [renderRemoveAlert, setRenderRemoveAlert] = useState<boolean>(false)
    const [renderFavorite, setRenderFavorite] = useState<boolean>(false);
    const [renderNoVehicle, setRenderNoVehicle] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const [vehicles, setVehicles] = useState<any[]>([])

    useEffect(() =>{
        async function getVehicles(){
            const response = await servicesVehicle.getVehicles();
            
            setVehicles(response.data)
        }
        getVehicles()
    }, [])

    //remove o veículo quando clicado na lixeira
    async function removeVehicle(id: string){
        const response = await servicesVehicle.deleteVehicle(id);

        if(response.data === true) {
            const response = await servicesVehicle.getVehicles();     
            setVehicles(response.data)
            setRenderRemoveAlert(true);   
        }
        else{ alert('Não foi possível concluir esta operação') }    
    }

    //adiciona veiculo aos favoritos quando clicado no coração
    async function addFavorite(id: string, vehicle:any) {
        const isFavorite = true;
        await servicesVehicle.updateVehicle(id, vehicle, isFavorite);

        setRenderFavorite(true);
    }

    //faz a pesquisa dos produtos
    async function searchVehicle(search: string){
        setRenderNoVehicle(false)
        const response = await servicesVehicle.searchVehicle(search);
        
        if(response.data.length === 0) setRenderNoVehicle(true);
      
        setVehicles(response.data);
    }


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }


    return(
        <Layout>
           <div className={styles.Content}>
                <div className={styles.SearchContent}>
                    <input 
                        placeholder='Buscar veículo'
                        type="text"
                        value={search}
                        onChange={handleSearchChange}        
                    />

                    <button onClick={() => searchVehicle(search)}>
                        <i>{icon.search}</i>
                    </button>

                    <i onClick={() => navigate(`filter`)} className={styles.Options}>
                        {icon.filter}
                    </i>
                </div>

                {renderNoVehicle ? 
                    <AlertItem
                        info={`Nenhum veículo encontrado.`}
                        color={'#2196F3'}
                        onClick={() => setRenderNoVehicle(false)}
                    />
                :   null
                }

                {renderFavorite ? 
                    <AlertItem
                        info={`Veículo adicionado aos favoritos.`}
                        color={'#04AA6D'}
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
                            year={vehicle.year}
                            description={vehicle.description}
                            plate={vehicle.plate}
                            onFavorite={() => addFavorite(vehicle._id, vehicle)}
                            onDelete={() => removeVehicle(vehicle._id)}
                            onEdit={() => navigate(`updatevehicle/${vehicle._id}`)}
                        />
                    ))}
                </div>  

                <ButtonBasic
                    info="Adicionar"
                    onClick={() => navigate(`newvehicle`)}
                />             
            </div>
        </Layout>
    );
}

export default Home;