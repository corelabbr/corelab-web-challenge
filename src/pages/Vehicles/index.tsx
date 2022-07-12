import { useEffect, useState } from "react";
import { getVehicles, deleteVehicles, favoriteVehicle} from "../../lib/api";
import { Button, Card, Search, Loading, NavBar } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import { Ifilter } from '../../types/Ifilter'
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleCheck, faFilter} from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCar, } from "react-icons/fa";
import {  MdClear } from "react-icons/md"

const VehiclesPage = () => {
const [vehicles, setVehicles] = useState<IVehicle[]>([]);
const [loading, setLoading] = useState<boolean>(false)
const [isFavorite, setIsfavorite] = useState<boolean>(false)
const [filterfavorite, setFilterFavorite] = useState<string>('all')
const [showfilter, setShowFilter] = useState<boolean>(false);

const { register, handleSubmit, formState: { errors }, setValue } = useForm<Ifilter>();

const fetchVehicles = async (query?:string, datafilter?: Ifilter) => {
    const payload = await getVehicles(query);
    const data = datafilter

    if(filterfavorite === 'favorite'){
      const sortfilter = payload.data.filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
      if(data?.year && data?.color &&  data?.pricemax &&  data?.pricemin && data?.year && filterfavorite === 'favorite'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.color === data.color && vehicleFilter.year === Number(data.year) && vehicleFilter.price > Number(data.pricemin) && vehicleFilter.price < Number(data.pricemax))
        return setVehicles(sortfilter)
      } else if(data?.year  && filterfavorite === 'favorite'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.year === Number(data.year))
        return setVehicles(sortfilter)
      } else if(data?.color  && filterfavorite === 'favorite'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.color === data.color)
        return setVehicles(sortfilter)
      } else if(!data?.pricemax &&  data?.pricemin  && filterfavorite === 'favorite'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.price >= Number(data.pricemin))
        return setVehicles(sortfilter)
      }  else if(!data?.pricemin && data?.pricemax  && filterfavorite === 'favorite'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.price <= Number(data.pricemax))
        return setVehicles(sortfilter)
      }  else if(data?.pricemin && data?.pricemax  && filterfavorite === 'favorite'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === true)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.price >= Number(data.pricemin) && vehicleFilter.price <= Number(data.pricemax))
        console.log(sortfilter)
        return setVehicles(sortfilter)
      }
      return setVehicles(sortfilter)
    } 

    if (filterfavorite === 'all'){
      if(data?.year && data?.color &&  data?.pricemax &&  data?.pricemin && data?.year && filterfavorite === 'all'){
        const sortfilter = payload.data
        .filter((vehicleFavorite:IVehicle) => vehicleFavorite.isFavorite === false)
        .filter((vehicleFilter:IVehicle) => vehicleFilter.color === data?.color && vehicleFilter.year === Number(data.year) && vehicleFilter.price > Number(data.pricemin) && vehicleFilter.price < Number(data.pricemax))
        return setVehicles(sortfilter)
      }else if(data?.year  && filterfavorite === 'all'){
        const sortfilter = payload.data
        .filter((vehicleFilter:IVehicle) => vehicleFilter.year === Number(data.year))
        return setVehicles(sortfilter)
      } else if(data?.color  && filterfavorite === 'all'){
        const sortfilter = payload.data
        .filter((vehicleFilter:IVehicle) => vehicleFilter.color === data.color)
        return setVehicles(sortfilter)
      } else if(!data?.pricemax && data?.pricemin  && filterfavorite === 'all'){
        const sortfilter = payload.data
        .filter((vehicleFilter:IVehicle) => vehicleFilter.price >= Number(data.pricemin))
        console.log(sortfilter)
        return setVehicles(sortfilter)
      }  else if(!data?.pricemin && data?.pricemax  && filterfavorite === 'all'){
        const sortfilter = payload.data
        .filter((vehicleFilter:IVehicle) => vehicleFilter.price <= Number(data.pricemax))
        console.log(sortfilter)
        return setVehicles(sortfilter)
      }  else if(data?.pricemin && data?.pricemax  && filterfavorite === 'all'){
        const sortfilter = payload.data
        .filter((vehicleFilter:IVehicle) => vehicleFilter.price >= Number(data.pricemin) && vehicleFilter.price <= Number(data.pricemax))
        return setVehicles(sortfilter)
      }
      return setVehicles(payload.data);

    } 
  };

  useEffect(() => {
    ( async ()=> await fetchVehicles()) ()
  }, [filterfavorite]);


  const handleSearch = async (query:string):Promise<void> => {
    await fetchVehicles(query)
  }

  const handleClearSearch = async ():Promise<void> => {
    await fetchVehicles()
  }
  const navigate = useNavigate()

  const handleNavigate = ():void => {
    navigate('/newvehicle')
  }

  const favorite = async (id:string):Promise<void> => {
    setIsfavorite(!isFavorite)
    const data =  {
      isFavorite:isFavorite
    }
    await favoriteVehicle(id, data)
    await fetchVehicles()

  } 


  const onSubmit: SubmitHandler<Ifilter> = async (data) => {
    const datafilter:Ifilter = data
    const query = ''
    setLoading(true)
    await fetchVehicles(query, datafilter)
    setLoading(false)
  }

  const handleClearFilter = async () => {
    setLoading(true)
    setValue('color', '')
    setValue('year', '')
    setValue('pricemin', '')
    setValue('pricemax', '')
    await fetchVehicles()
    setLoading(false)
  }

  const handleDelete = async (id:string):Promise<void> => {
    await deleteVehicles(id)
    await fetchVehicles()
  }

  if(loading){
    return (
         <Loading/>
    )
}

  return (

    <>
    <NavBar/>
<div className={styles.Vehicles}>

<main className={styles.main}>
  <div className={styles.containerSearch}>
  <Search className={styles.search} placeholder="Busque por nome, descrição, cor ou a placa" onSearch={handleSearch} />
  <Button text="Limpar Busca" onClick={() => {handleClearSearch()}} type=""/>
  </div>
  
  <div className={styles.containerBtnAdd}>
     <Button text="(+) Veiculo" onClick={() => {handleNavigate()}} type=""/> 
  </div>
  <div  className={styles.containerFilter}>
  <select name="sortselect" id="sortselect" value={filterfavorite}  onChange={(e) => {setFilterFavorite(e.target.value)}}>
  <option value="" disabled>Todos / Favoritos</option>
    <option value="all">Todos</option>
    <option value="favorite">Favoritos</option>
  </select>
  <div className={styles.containerFilterParams}>
  {showfilter === true ? 
  <>
  <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <select  {...register("color")}  >
              <option value="" >Cor</option>
              <option value="black">Preto</option>
              <option value="white">Branco</option>
              <option value="red">Vermelho</option>
              <option value="blue">Azul</option>
              <option value="orange">Laranja</option>
              <option value="green">Verde</option>
              <option value="grey">Cinza</option>
              <option value="lilac">Lilás</option>
              <option value="pink">Rosa</option>
              <option value="brown">Marrom</option>
              <option value="yellow">Amarelo</option>
              <option value="graphite ">Grafite</option>
              <option value="other">Outros</option>
      </select>

      <select   {...register('year')} >
      <option value='' > Ano </option>
            {vehicles.map((vehicle, index)=>(
                  <option value={vehicle.year} key={index}>{vehicle.year}</option>
            ))}
      </select>
          <label htmlFor="pricemin"> min: </label>
        <input type="text" {...register('pricemin')} />
        <label htmlFor="pricemax"> max: </label>
        <input type="text" {...register('pricemax')}/>
         <button type="submit">Filtrar</button>
  </form> 
    <MdClear className={styles.clearFilter} onClick={()=>{handleClearFilter()}}/>
  </>:
  null 
  }
  <FontAwesomeIcon  className={styles.clearFilter} onClick={() => setShowFilter(!showfilter)}  icon={faFilter}/>
  </div>
  </div>
  <div  className={styles.containerCards}>
    {vehicles.map((vehicle, index)=>(
        <Card  title={vehicle.name} key={index} style={vehicle.color !== 'black' ? {backgroundColor: vehicle.color} : {backgroundColor: vehicle.color, color: 'white'}}>
          <div>
            <input  
            type="checkbox" 
            id={`${index}`} 
            name={`${index}`} 
            checked={vehicle.isFavorite}
            onChange={() => {setIsfavorite(!isFavorite)}}
            onClick={()=> {favorite(vehicle._id)}}
            hidden
            />
            <label htmlFor={`${index}`}>
              {vehicle.isFavorite === true ? <FontAwesomeIcon icon={faHeartCircleCheck}  beat/> : <FontAwesomeIcon icon={faHeart} />  }
              </label>
          </div>
          <p><strong>Descrição:</strong> {vehicle.description}</p>
          <p><strong>Placa:  </strong>  {vehicle.plate}</p>
          <p><strong>Preço:  </strong>  {vehicle.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
          <p><strong>Ano:  </strong>  {vehicle.year}</p>
          <p><strong>Cor:  </strong>  {vehicle.color }</p>
          <div  className={styles.containerBtnCard}>
            <Link to={`/vehicle/${vehicle._id}`}> 
               <Button text="editar" onClick={() => {}} type=""></Button>
            </Link>
            <Button text="deletar" onClick={() => {handleDelete(vehicle._id)}} type=""></Button>
          </div>
        </Card>
      ))}
  </div>

</main>
</div>
    </>
  );
};

export default VehiclesPage;


