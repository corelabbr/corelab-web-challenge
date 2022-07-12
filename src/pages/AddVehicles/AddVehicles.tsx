import React, { useState } from 'react'
import {Loading, NavBar } from '../../components';
import {  FaCar  } from "react-icons/fa";
import { createVehicles } from '../../lib/api';
import { useNavigate } from "react-router-dom";
import { IVehicleData } from '../../types/IvehicleData';
import styles from "./AddVehicles.module.scss";
import './AddVehicles.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const AddVehicles = () => {

    const [loading, setLoading] = useState(false)

    const schema = yup.object({
        name: yup.string().max(20, 'o nome teve ter no máximo 20 caracteres').required("Preencha com o modelo do veiculo"),
        description: yup.string().max(150, 'Digite no máximo 150 caracteres').required("Faça uma breve descrição do veiculo"),
        plate: yup.string().max(9, 'Digite no máximo 9 caracteres').required("Identifique a placa do veiculo"),
        year: yup.number().required("Informe ano do veiculo"),
        price: yup.number().typeError('Informe o valor do veiculo').required("Informe o valor do veiculo"),
        color: yup.string().required("Selecione a cor do veiculo"),
      }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<IVehicleData>({resolver: yupResolver(schema)});
    

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IVehicleData> = async (data) => {
        setLoading(true)
        console.log(data)
        await createVehicles(data);
        setLoading(false)
        navigate('/')
    }

    function onError(error:any){
        console.log(error)
    }

    if(loading){
        return (
             <Loading/>
        )
    }


  return (
      <>
        <NavBar/>
        <main className={styles.containerAddVehicle} >
            <div className={styles.formField}>
                <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
                        <h1>Cadastre um Veiculo <FaCar/></h1>
                        <input 
                        {...register('name', { required: true })} 
                            type='text'
                            id= 'name'
                            name='name'
                            placeholder='Nome do veiculo'
                        />
                        <span className={styles.validationFrom}>{errors.name?.message}</span>

                        <input 
                        {...register('description', { required: true, maxLength: 30 })} 
                            type="text" 
                            id= 'description'
                            name='description'
                            placeholder='Descreva o veiculo'
                            />
                        {errors.description && errors.description.type === "maxLength" && <span>Max length exceeded</span> }
                        <span className={styles.validationFrom}>{errors.description?.message}</span>

                        <input
                        {...register('plate', { required: true })} 
                            type="text"
                            id= 'plate'
                            name='plate'
                            min="" 
                            max=""
                            placeholder='Identifique o veiculo'
                            />
                         <span className={styles.validationFrom}>{errors.plate?.message}</span>

                        <input 
                            {...register('year', { required: true })} 
                            type="number"
                            id= 'year'
                            name='year'
                            min="1886" 
                            max="2023"
                            placeholder='Ano do veiculo'
                        />
                        <span className={styles.validationFrom}>{errors.year?.message}</span>

                        <input 
                            {...register('price', { required: true })}
                            type="number"
                            name='price'
                            id= 'price'
                            min="1" 
                            max="100000000"
                            placeholder='Preço do veiculo'
                        />
                        <span className={styles.validationFrom}>{errors.price?.message}</span>

                        <select {...register("color", { required: true })}>
                            <option value="">Selecione a cor</option>
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

                        <button type='submit'>Cadastrar</button>
                </form>
            </div>
        </main>
    </>
  )
}

export default AddVehicles


