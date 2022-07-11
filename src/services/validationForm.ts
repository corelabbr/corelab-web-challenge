import * as Yup from "yup";

export const schema = Yup.object().shape({ //validation com Yup
    name: Yup.string().required('O campo Modelo é obrigatório'),
    brand: Yup.string().required('O campo Marca é obrigatório'),
    year: Yup.number().required('O campo Ano é obrigatório'),
    price: Yup.string().required('O campo preço é obrigatório'),
    color: Yup.string(),  
    plate: Yup.string().required('O campo placa é obrigatório').min(7, "Deve ter 7 caracteres").max(7, "Deve ter 7 caracteres"),
    description: Yup.string(),  
})


export const initialValues = { name: '', brand: '', year: '', price: "", 
color: '', plate: '', description: ''};