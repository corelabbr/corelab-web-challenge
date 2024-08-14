import * as React from "react";
import { styled, IconButton, Box, Button, Dialog, DialogTitle, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ClearIcon from '@mui/icons-material/Clear';
import Color from "./Color";

/*
//testes
import Conteudo from '../../public/json/notas.json';
*/

export interface OptionProps {
    cores: any[],
    notaId: number,
    onDelete: (id:number) => void,
    attCor: (id:number) => void,
    attNota: (edit:boolean)=> void,
}


const ColorNote = styled('span')(() =>({
    width:'2.1rem', height:'2.1rem',
    borderRadius:'100%',
    alignItems:'center',
}));


function OptionsNote(props: OptionProps) {

    const {cores, notaId, onDelete, attCor, attNota} = props;

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue ] = React.useState(0);
    const [del, setDel] = React.useState(false);
    //const [edit, setEdit] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleCLose = (value: number) => {
        setOpen(false);
        setSelectedValue(selectedValue)
        //seta o valor da cor escolhida
        attCor(value);
    }

    const handleClickDelete = () => {
        del ? setDel(false) : setDel(true);
        console.log(notaId)
    }

    const handleDeleteNota = () => {
        onDelete(notaId);
    }

    const handleEditarNota = () => {
        attNota(true);
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems:'center', 
            justifyContent: 'space-between',
        }}>
            <Box>
                <IconButton onClick={handleEditarNota}>
                    <EditIcon/>
                </IconButton>

                <IconButton onClick={handleClickOpen}>
                    <ColorNote>
                        <FormatColorFillIcon/>
                    </ColorNote>
                </IconButton>
                <Color 
                    selectedValue={selectedValue}
                    open={open}
                    onClose={(handleCLose)}
                    cores={cores}
                ></Color>
            </Box>
            
            <IconButton onClick={handleClickDelete}>
                <ClearIcon/>
                <Dialog open={del} >
                    <DialogTitle>Deseja realmente deletar esta nota?</DialogTitle>
                    <Stack direction='row' spacing={2} sx={{justifyContent:'center', padding:'1rem'}}>
                        <Button variant="contained" color="success"
                            onClick={handleDeleteNota}
                        >SIM</Button>

                        <Button variant='outlined' color="error"
                            onClick={handleClickDelete}
                        >NÃO </Button>
                    </Stack>
                    
                </Dialog>
            </IconButton>
        </Box>
    )
}

export default OptionsNote;