import { TextField, MenuItem } from "@mui/material"
import { width } from "@mui/system"
import  styles  from "./InputSelect.module.scss"

interface IInputSelect {
    value: string
    label: string
    onChange: (e: any) => void
    width: number
    itens: any[]
    mdwidth: number
    //labelWidht: number
}

const InputSelect = (props: IInputSelect) => {
      

    return (
        <div className={styles.InputLabel} >
        <label>{props.label}</label>
        <TextField 
        select
        sx={{width: {xs: props.width, sm: props.mdwidth}}}
        placeholder={""} 
        color={"info"} 
        value={props.value}
        fullWidth
        onChange={(e) => props.onChange(e.target.value)}
        >
            {props.itens.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
    </div>
    )
}
export default InputSelect;