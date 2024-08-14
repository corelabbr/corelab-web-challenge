import * as React from "react";
import { Alert, Box, IconButton, InputBase, styled } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { createNota } from "../services/notaService";


const EditNota = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '1px 1px 5px #D9D9D9',
    borderRadius: '15px',
    minHeight: '120px',
    width: '70vw',
    maxWidth: '500px' ,
    overflow: 'hidden',
    backgroundColor:'#FFFFFF'
}));

const Line = styled('span')(() => ({
    width: '100%',
    height: '2px',
    backgroundColor: 'rgba(0,0,0, 0.2)',
}));



function NewNote( {onAddNota }:{onAddNota: (nota:any) => void}){
    //const { notas, setNotas } = useNotasContext();

    const [favorite, setFavorite] = React.useState(false);
    const [titleNote, setTitleNote] = React.useState('');
    const [textNote, setTextNote] = React.useState('');

    const [alert, setAlert] = React.useState(false);


    const handleFavorite = () => {
        //setFavorite(true);
        if(favorite){
            setFavorite(false);
        } else {
            setFavorite(true);
        }

    }

    const isFavorite = () => {
        if(favorite){
            return (<StarIcon sx={{color:'#FFA000'}}></StarIcon>)
        } else {
            return (<StarBorderIcon ></StarBorderIcon>)
        }
    }

    //formulário para uma nova nota
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(titleNote == '' || textNote == ''){
            setAlert(true);
            //window.alert('Nota esta faltando Titulo ou Texto.')
        } else {
            try {
                const novaNota = await createNota(titleNote, textNote, 0, favorite);
                onAddNota(novaNota);
                setTitleNote('');
                setTextNote('');
                setFavorite(false);
                setAlert(false);
            } catch (error) {
                console.error('Erro ao criar nota', error);
            }
        }

        
    }

    return (
        <>
            
            <EditNota onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', 
                    justifyContent: 'space-between'
                }}>
                    <InputBase value={titleNote} 
                        onChange={(e) => setTitleNote(e.target.value)} 
                        placeholder="Título" 
                        sx={{
                            padding: '0 .5rem', width: '100%', textTransform:'uppercase'
                        }}>
                    </InputBase>
                    <IconButton onClick={handleFavorite}>
                        {isFavorite()}
                    </IconButton>
                </Box>
                <Line></Line>
                <Box>
                    
                    <InputBase value={textNote} 
                        onChange={(e) => setTextNote(e.target.value)} 
                        multiline placeholder="criar nota..." 
                        sx={{
                            padding: '0.5rem 1rem', fontSize: 'smaller', width: '100%',
                        }}>
                    </InputBase>
                </Box>
                {textNote &&
                    <IconButton type="submit" 
                        aria-label="Adicionar Nota" 
                        sx={{alignSelf:'flex-end'}}>

                        <AddIcon sx={{color:'#20f920'}}></AddIcon>
                    </IconButton>
                }
            </EditNota>
            {alert && 
                <Alert severity='warning'>
                    Sua Nota esta faltando Título ou Texto. Revise-a.
                </Alert>
            }
        </>
    )
}

export default NewNote;