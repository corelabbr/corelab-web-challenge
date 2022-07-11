import * as Yup from "yup";

export const schema = Yup.object().shape({ //validation com Yup
    name: Yup.string().required('O campo Modelo é obrigatório'),
    brand: Yup.string().required('O campo Marca é obrigatório'),
    year: Yup.number().required('O campo Ano é obrigatório'),
    color: Yup.string(), 
    minP: Yup.string().required('O campo  mínimo preço é obrigatório'),
    maxP: Yup.string().required('O campo preço máximo é obrigatório'), 
})


export const initialValues = { name: '', brand: '', year: '', color: '', minP: '', maxP: ''};