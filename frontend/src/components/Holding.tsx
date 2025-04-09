import * as React from 'react';
import { Box, Container, Stack, styled, Typography,} from "@mui/material";
import Note from "./Note";
import NewNote from './NewNote';
import { getNotas, deleteNote, getCores } from "../service/notas";

/* 
//testes 
import Conteudo from '../../public/json/notas.json';
const notas = Conteudo.notas;
*/

const ItensStack = styled(Box)(() =>({
    width:'100%',
    minWidth: '200px',
}));

const Title = styled(Typography)(() => ({
    fontSize:'small',
    margin:'.5rem 0'
}));



function Holding() {
    const [ notas, setNotas ] = React.useState([]);
    const [ cores, setCores ] = React.useState<any[]>([]);

    const fetchNotas = async () => {
        try {
            const data = await getNotas();
            setNotas(data);
        } catch (error) {
            console.error('Erro ao buscar notas:', error);
        }
    };

    //carrega as cores estabelecidas
    const fetchCores = async () => {
        try {
            const data = await getCores();
            setCores(data);

        } catch (error) {
            console.error('Erro ao buscar cores:', error);
        }
    };

    React.useEffect(() => {
        fetchNotas();
        fetchCores();

    }, [fetchNotas(), fetchCores]);

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
                marginTop: '3rem',
                display: 'flex' , 
                flexDirection:'column',
                alignItems: 'center',}}>
            <NewNote onAddNota={attNota} ></NewNote>
            </Box>
            
            {notas.length > 0 &&
                <Container maxWidth='lg' sx={{display:'flex', flexDirection:'column', marginTop: '2rem',}}>
                    
                    <Title>Favoritas</Title>
                    <ItensStack 
                        sx={{marginTop:'2rem', flexWrap: 'wrap',
                            width:'100%', justifyContent:'center'
                        }}>
                        <Stack spacing={{xs:2, sm: 2, lg: 3 }} useFlexGap direction='row' 
                            sx={{marginTop:'2rem', flexWrap: 'wrap',
                            width:'100%', justifyContent:'center'
                            }}>
                            {notas.map((nota: any) => (
                                nota.favorito ? <Note key={nota.id} 
                                nota={nota} onDelete={removeNota} cores={cores}
                                onUpdate={attNota} /> : ''
                            ))}
                        </Stack>
                        
                    </ItensStack>

                    <Title>Outras</Title>
                    <ItensStack sx={{marginTop:'2rem', flexWrap: 'wrap',
                        width:'100%', justifyContent:'center'
                        }}>
                            <Stack spacing={{xs:2, sm: 2, lg: 3 }} useFlexGap direction='row' 
                            sx={{marginTop:'2rem', flexWrap: 'wrap',
                            width:'100%', justifyContent:'center'
                            }}>
                                {notas.map((nota: any) => (
                                    !nota.favorito ? <Note key={nota.id} 
                                    nota={nota} onDelete={removeNota} cores={cores}
                                    onUpdate={attNota}/> : ''
                                ))}
                            </Stack>
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