import { useState } from "react"
import styles from "./Form.module.scss"

interface IFormState {
  name: string;
  brand: string;
  color: string;
  number: number;
  plate: string;
}

const Form: React.FC = () => {
  const onSubmit = (event: React.FormEvent <HTMLFormElement>) => {
      event.preventDefault()  
      const [formState, setFormState] = useState<IFormState>({
        name: "",
        brand: "",
        color: "",
        number: 0,
        plate: "",
    })
       
  }
  return (
  <form className={styles.Form} onSubmit={onSubmit}>
    <label className={styles.Label} htmlFor="name">Nome:</label>
    <input className={styles.Input} type="text" autoFocus id="name" name="name"
    value={formState.name}
    onChange={(event)=>setFormState({...formState, name: event.currentTarget?.value || ""})}/>

    <label className={styles.Label} htmlFor="brand">Marca:</label>
    <input className={styles.Input} type="text" id="brand" name="brand"/>

    <label className={styles.Label} htmlFor="color">Cor:</label>
    <input className={styles.Input} type="text" id="color" name="color"/>

    <label className={styles.Label} htmlFor="year">Ano:</label>
    <input className={styles.Input} type="number" id="year" name="year"/>   

    <label className={styles.Label} htmlFor="plate">Placa:</label>
    <input className={styles.Input} type="text" id="plate" name="plate"/>

    <button className={styles.Button} type="submit">SALVAR</button>
  </form>
  
  )
}

export default Form