
import React,  {useState} from 'react'

interface Iinput {
    type: string
    label?:string
    id: string
    name: string
    placeholder?:string
    value?: string 
    min?:string
    max?:string
}

const Input = (props:Iinput, {...additional}) => {

  // const [value, setValue] = useState<string>("");

  return (
    <div>
        <label htmlFor="">{props.label}</label>
        <input         
          type={props.type}
          id={props.id} 
          name={props.name}
          min={props.min}
          max={props.max}
          placeholder={props.placeholder}
        />
    </div>


  )
}

export default Input