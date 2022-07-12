import React, { useState }from 'react'
import {useParams} from "react-router-dom";
import { Loading, NavBar } from '../../components'
import { ediVehicles } from "../../lib/api";
import { IVehicleData } from '../../types/IvehicleData';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import './editVehicles.module.scss'
import styles from "./editVehicles.module.scss";
import {  FaCar  } from "react-icons/fa";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const EditVehicles = () => {

  
  const schema = yup.object({
    name: yup.string().max(20, 'o nome teve ter no máximo 20 caracteres').required("Preencha com o modelo do veiculo"),
    description: yup.string().max(150, 'Digite no máximo 150 caracteres').required("Faça uma breve descrição do veiculo"),
    plate: yup.string().max(9, 'Digite no máximo 9 caracteres').required("Identifique a placa do veiculo"),
    year: yup.number().typeError('Informe ano do veiculo').required("Informe ano do veiculo"),
    price: yup.number().typeError('Informe o valor do veiculo').required("Informe o valor do veiculo"),
    color: yup.string().required("Selecione a cor do veiculo"),
  }).required();

  const [loading, setLoading] = useState(false)
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<IVehicleData>({resolver: yupResolver(schema)});
  
  let { id } = useParams();
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<IVehicleData> = async (data) => {
    setLoading(true)
    await ediVehicles(id, data);
    setLoading(false)
    navigate('/')
}


const handleEdit = async (data:object):Promise<void> => {
  await ediVehicles(id, data)
}

if(loading){
  return (
      <Loading/>
  )
}

  return (
    <div>
      <NavBar/>
      <div className={styles.formFieldAdd}>
      <form className={styles.formAdd} action="" onSubmit={handleSubmit(onSubmit)}>
                <h1>Edição de veiculo <FaCar/></h1>
                <input 
                 {...register('name')} 
                    type='text'
                    id= 'name'
                    name='name'
                    placeholder='name'
                    />
                    <span className={styles.validationFrom}>{errors.name?.message}</span>
                <input 
                  {...register('description')} 
                    type="text"
                    id= 'description'
                    name='description'
                    placeholder='descreva o veiculo'
                    />
          <span className={styles.validationFrom}>{errors.description?.message}</span>
                <input
                {...register('plate')} 
                    type="text"
                    id= 'plate'
                    name='plate'
                    placeholder='identifique o veiculo'
                    />
                 <span className={styles.validationFrom}>{errors.plate?.message}</span>
                <input 
                    {...register('year')} 
                    type="number"
                    id= 'year'
                    name='year'
                    min="1886" 
                    max="2023"
                    placeholder='Ano do veiculo'
                    />
                             <span className={styles.validationFrom}>{errors.year?.message}</span>
                    <input 
                    {...register('price')}
                    type="number"
                    name='price'
                    id= 'price'
                    min="1" 
                    max="1000000000"
                    placeholder='Preço do veiculo'
                    />
                    <span className={styles.validationFrom}>{errors.price?.message}</span>
                  <select className={styles.selectAdd} {...register("color")}>
                    <option value="" >Selecione a cor</option>
                    <option value="black">Preto</option>
                    <option value="white">Branco</option>
                    <option value="red">Vermelho</option>
                    <option value="blue">Azul</option>
                    <option value="orange">Laranja</option>
                    <option value="green">Verde</option>
                    <option value="grey">Cinza</option>
                    <option value="pink">Rosa</option>
                    <option value="brown">Marrom</option>
                    <option value="yellow">Amarelo</option>
                    <option value="other">Outros</option>
                    </select>
                    <span className={styles.validationFrom}>{errors.color?.message}</span>
                <button className={styles.addBtn} type="submit"> Editar </button>
        </form>   
      </div>

    </div>
  )
}

export default EditVehicles