import * as React from 'react';
import { Box, Container, Grid, styled, Typography, useMediaQuery,} from "@mui/material";
import Note from "./Note";
import NewNote from './NewNote';
import { getNotas, deleteNote } from "../services/notaService";

/* 
//testes 
import Conteudo from '../../public/json/notas.json';
const notas = Conteudo.notas;
*/

const ItensStack = styled(Grid)(() =>({
    width:'100%',
    minWidth: '200px',
}));

const Title = styled(Typography)(() => ({
    fontSize:'small',
    margin:'.5rem 0'
}));



function Holding() {
    const [ notas, setNotas ] = React.useState([])
    
    const responsiveNotas = useMediaQuery('(max-width:900px)');

    const fetchNotas = async () => {
        try {
            const data = await getNotas();
            setNotas(data);
        } catch (error) {
            console.error('Erro ao buscar notas:', error);
        }
    };

    React.useEffect(() => {
        fetchNotas();
    }, []);

    const removeNota = async (id:number) => {
        try {
            await deleteNote(id);
            setNotas((prevNotas:any) => prevNotas.filter((nota:any) => nota.id !== id));
        } catch (error) {
            console.error('Erro ao excluir nota:', error)
        }
    }

    //atualiza as notas na view
    const attNota = async (_novaNota: any) => {
        await fetchNotas();
    }

    return (
        <>
            <Box sx={{
                marginTop: '5rem',
                display: 'flex' , 
                flexDirection:'column',
                alignItems: 'center',}}>
            <NewNote onAddNota={attNota} ></NewNote>
            </Box>

            {notas.length > 0 &&
                <Container maxWidth='lg'>
                    <Title>Favoritas</Title>
                    <ItensStack 
                    container
                    columnSpacing={{sm:2, md: 3, lg: 4}}
                    sx={{justifyContent: `${responsiveNotas ? 'center' : 'flex-start'}`}}
                    >
                        {notas.map((nota: any) => (
                            nota.favorito ? <Note key={nota.id} 
                            nota={nota} onDelete={removeNota} 
                            onUpdate={attNota} /> : ''
                        ))}
                    </ItensStack>

                    <Title>Outras</Title>
                    <ItensStack 
                    container
                    columnSpacing={{sm:2, md: 3, lg: 4}}
                    sx={{justifyContent: `${responsiveNotas ? 'center' : 'flex-start'}`}}
                    >
                        {notas.map((nota: any) => (
                            !nota.favorito ? <Note key={nota.id} 
                            nota={nota} onDelete={removeNota} 
                            onUpdate={attNota}/> : ''
                        ))}
                    </ItensStack>
                </Container>
            } {notas.length == 0 && 
                <Box sx={{
                    display:'flex', width:'100%', height:'50vh', 
                    justifyContent:'center', alignItems:'center'
                }}>
                    <Typography>Ainda nao existem notas, tente criar uma.</Typography>
                </Box>
            }
        </>
    );
}

export default Holding;