import { Input, TextField } from "@mui/material";
import styles from "./InputLabel.module.scss"
import { useIndex } from "../../data/hooks/useIndex"

interface IInputLabel {
    value: string;
    label: String;
    placeHolder: string;
    function: any
    width: number
    mdwidth: number
}

const InputLabel = (props: IInputLabel) => {

    return (
    <div className={styles.InputLabel}>
        <div><label>{props.label}</label></div>
        
        <TextField 
        placeholder={props.placeHolder} 
        sx={{width: { xs: props.width, sm: props.mdwidth}}}
        color={"info"} 
        value={props.value}
        fullWidth
        onChange={(e) => {props.function(e.target.value)}}
        ></TextField>
    </div>
       
       
    )
}
export default InputLabel;