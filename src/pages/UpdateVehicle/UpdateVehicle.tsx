import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../../components/layout/layout";
import ButtonBasic from "../../components/buttonBasic/buttonBasic";
import InputBasic from "../../components/inputBasic/inputBasic";
import {colors} from "../../services/colors";
import styles from './UpdateVehicle.module.scss';
import ErrorForm from '../../components/errorForm/errorForm';
import * as validationForm from '../../services/validationForm';
import * as serviceVehicle from '../../services/vehicles.service';
import * as handleVehicle from '../../repository/vehicles.reposistory';

const UpdateVehicle = () =>{
    const params = useParams();
    const navigate = useNavigate();
    const [newInitialValues, setNewInitialValues] = useState({
        id: '', name: '', brand: '', year: '', price: "", 
        color: '', plate: '', description: '', isFavorite: ''
    })

    useEffect(() =>{
        async function getVehicle(){
            const id = params.id
            if(id){
                const response = await handleVehicle.getOneVehicle(id);
                setNewInitialValues((prevState:any) => ({
                    ...prevState,
                    id: response.id,
                    name: response.name,
                    brand: response.brand,
                    color: response.color,
                    year: response.year,
                    isFavorite: response.isFavorite,
                    price: response.price,
                    plate: response.plate,
                    description: response.description
                }));
            }          
        }
        getVehicle();
    },[params.id])

    const formik  = useFormik({
        initialValues: newInitialValues,
    
        validationSchema: validationForm.schema,
    
        enableReinitialize: true,

        onSubmit: async (data) => {
            const response = await serviceVehicle.updateVehicle(newInitialValues.id, data, newInitialValues.isFavorite); 
            
            alert(`Veículo ${response.data.name} alterado com sucesso!`);
            formik.resetForm();
            navigate('/')
        }
    });

    return(
        <Layout>
             <div className={styles.Content} >
                <form className={styles.Form} 
                    onSubmit={formik.handleSubmit}
                >   
                    <h1> Atualizar Veículo </h1>
                      
                    <InputBasic
                        info="Modelo:"
                        name="name"
                        placeholder="Modelo do Veículo"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}                       
                    />
                    {formik.errors.name && formik.touched.name && <ErrorForm message={formik.errors.name}/>}
                        
                    <InputBasic
                        info="Marca:"
                        name="brand"
                        placeholder="Marca do Veículo"
                        type="text"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.brand && formik.touched.brand && <ErrorForm message={formik.errors.brand}/>}


                    <InputBasic
                        info="Ano:"
                        name= "year"
                        placeholder="Ano de lançamento"
                        type="number"
                        value={formik.values.year}
                        onChange={formik.handleChange}                   
                    />
                    {formik.errors.year && formik.touched.year && <ErrorForm message={formik.errors.year}/>}

                        
                    <InputBasic
                        info="Preço:"
                        name="price"
                        placeholder="Preço atual do veículo"
                        type="text"
                        value={formik.values.price}
                        onChange={formik.handleChange}            
                    />
                    {formik.errors.price && formik.touched.price && <ErrorForm message={formik.errors.price}/>}
                                              
                    <p> Cor: </p>
                    <select name="color">
                        {colors.map((color, key) =>(                            
                            <option key={key} value={color.value}> 
                                {color.color}
                            </option>                         
                        ))}
                    </select>

                    <InputBasic
                        info="Placa:"
                        name="plate"
                        placeholder="Placa do Veículo"
                        type="text"
                        value={formik.values.plate}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.plate && formik.touched.plate && <ErrorForm message={formik.errors.plate}/>}
                       

                    <p> Descrição: </p>
                    <textarea  className={styles.TextArea}                     
                        name="description"
                        placeholder="Descrição do veículo"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
        
                    <ButtonBasic info="Enviar" />
                </form>
            </div>
        </Layout>
    );
}

export default UpdateVehicle;