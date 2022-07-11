import { useFormik } from 'formik';
import {  useState } from "react";

import Layout from "../../components/layout/layout";
import ButtonBasic from "../../components/buttonBasic/buttonBasic";
import InputBasic from "../../components/inputBasic/inputBasic";
import {colors} from "../../services/colors";
import styles from './Filter.module.scss';
import ErrorForm from '../../components/errorForm/errorForm';
import CardItem from '../../components/cardItem/cardItem';
import AlertItem from '../../components/alert/alert';
import * as validationFilter from '../../services/validationFilter';
import * as servicesVehicles from '../../services/vehicles.service';

const Filter = () =>{
    const [renderSearched, setRenderSearched] = useState<boolean>(false)
    const [renderNoVehicle, setRenderNoVehicle] = useState<boolean>(false);
    const [vehicles, setVehicles] = useState<any[]>([])


    const formik  = useFormik({
        initialValues: validationFilter.initialValues,
    
        validationSchema: validationFilter.schema,
    
        enableReinitialize: true,

        onSubmit: async (data) => {
            const response = await servicesVehicles.filterVehicle(data)

            if(response.data.length === 0){
                setRenderNoVehicle(true);
                return;
            } 
            
            formik.resetForm();
            setVehicles(response.data)
            setRenderSearched(true);        
        }
    });

    return(
        <Layout>
            {renderSearched ? 
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
                        />
                    ))}
                </div>                 
            :
                <div className={styles.Content} >
                    <form className={styles.Form} 
                        onSubmit={formik.handleSubmit}
                    >   
                        <div className={styles.ContentTitle}>
                            <h1> Busca por Filtro</h1>

                            {renderNoVehicle ? 
                                <AlertItem
                                    info={`Nenhum veículo encontrado.`}
                                    color={'#2196F3'}
                                    onClick={() => setRenderNoVehicle(false)}
                                />
                            :   null
                            }

                            <div className={styles.Row}>
                                <div className={styles.Column}>
                                    <InputBasic
                                        info="Modelo:"
                                        name="name"
                                        placeholder="Modelo do Veículo"
                                        type="text"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}                       
                                    />
                                    {formik.errors.name && formik.touched.name && <ErrorForm message={formik.errors.name}/>}
                                </div>

                                <div className={styles.Column}>   
                                    <InputBasic
                                        info="Marca:"
                                        name="brand"
                                        placeholder="Marca do Veículo"
                                        type="text"
                                        value={formik.values.brand}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.brand && formik.touched.brand && <ErrorForm message={formik.errors.brand}/>}
                                </div>
                            </div>

                            <div className={styles.Row}>
                                <div className={styles.Column}>   
                                    <InputBasic
                                        info="Ano:"
                                        name= "year"
                                        placeholder="Ano de lançamento"
                                        type="number"
                                        value={formik.values.year}
                                        onChange={formik.handleChange}                   
                                    />
                                    {formik.errors.year && formik.touched.year && <ErrorForm message={formik.errors.year}/>}
                                </div>   
                                <div className={styles.ContentSelect}>
                                    <p> Cor: </p>
                                    <select name="color" onChange={formik.handleChange}>
                                        {colors.map((color, key) =>(                            
                                            <option key={key} value={color.value}> 
                                                {color.color}
                                            </option>                         
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.Row}> 
                                <div className={styles.Column}> 
                                    <InputBasic
                                        info="Preço Mínimo:"
                                        name="minP"
                                        placeholder="Preço mínimo do veículo"
                                        type="text"
                                        value={formik.values.minP}
                                        onChange={formik.handleChange}            
                                    />
                                    {formik.errors.minP && formik.touched.minP && <ErrorForm message={formik.errors.minP}/>}
                                </div>
                                <div className={styles.Column}> 
                                    <InputBasic
                                        info="Preço Máximo:"
                                        name="maxP"
                                        placeholder="Preço máximo do veículo"
                                        type="text"
                                        value={formik.values.maxP}
                                        onChange={formik.handleChange}            
                                    />
                                    {formik.errors.maxP && formik.touched.maxP && <ErrorForm message={formik.errors.maxP}/>}                                           
                                </div> 
                            </div>
            
                            <ButtonBasic info="Iniciar Busca" />
                        </div>
                    </form>               
                </div>                      
            }            
        </Layout>
    );
}

export default Filter;