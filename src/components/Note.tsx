import * as React from "react";
import { Box, IconButton, styled } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckIcon from '@mui/icons-material/Check';
import OptionsNote from "./OptionsNote";

import { getCores, updateNota } from "../services/notaService";

export interface NotaProps {
    nota:any,
    onDelete: (id:number) => void,
    onUpdate: (notaAtualizada: any) => void,
}

const BlocoNota = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '1px 1px 5px #D9D9D9',
    borderRadius: '15px',
    minHeight: '280px',
    width: '240px',
    overflow: 'hidden',
    margin:'1rem'
}));

const Line = styled('span')(() => ({
    width: '100%',
    height: '2px',
    backgroundColor: 'rgba(0,0,0, 0.2)',
}));

const TextTitulo = styled('textarea')(() => ({
    display: 'flex',
    height: '2rem',
    backgroundColor:'transparent',
    border: '0',
    resize: 'none',
    fontWeight:'bold',
    maxLines:'1'
}))

const TextConteudo = styled('textarea')(() => ({
    display: 'flex',
    height: '98%',
    width: '95%',
    backgroundColor:'transparent',
    border: '0',
    resize: 'none',
    padding: '0.5rem'
}));


function Note (props: NotaProps) {

    const {nota, onDelete, onUpdate} = props;
    //onAtualiza = Objeto{...}

    const [cores, setCores] = React.useState<any[]>([]);

    const [favorite, setFavorite] = React.useState(nota.favorito);

    const [edit, setEdit] = React.useState(false);

    const [tituloNota, setTituloNota]= React.useState(nota.titulo);
    const [textoNota, setTextoNota]= React.useState(nota.conteudo);

    const notaAtualizada = nota;

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
        fetchCores();
    }, []);

    const fetchUpdateCor = async (novaCor: number) => {
        notaAtualizada.cor_id = novaCor;
        fetchAtualiza();
    };

    const fetchAtualiza = async () => {
        try {
            await updateNota(notaAtualizada);
            onUpdate(notaAtualizada);
            
        } catch (error) {
            console.error('Erro ao atualizar a nota:', error);
        }
    };

    const handleFavorito = () =>{
        if(favorite){
            setFavorite(false);
            notaAtualizada.favorito = false;
        } else {
            setFavorite(true);
            notaAtualizada.favorito = true
        }
        fetchAtualiza();
    }

    const onChangeTituloNota = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTituloNota(e.target.value);
    }

    const onChangeTextoNota = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextoNota(e.target.value);
    }

    const onAtualizaConteuto = () => {
        notaAtualizada.titulo= tituloNota;
        notaAtualizada.conteudo = textoNota;
        fetchAtualiza();
        setEdit(false);
    }

    const corAtual = cores.find(cor => cor.id === nota.cor_id)?.cor || '#FFFFFF';

    return (
        <BlocoNota sx={{backgroundColor:corAtual}}>
            <Box sx={{
                display: 'flex', 
                alignItems: 'center', 
                padding: '.2rem 1rem', 
                justifyContent: 'space-between'
            }}>
                {edit &&
                    <TextTitulo rows={1} value={tituloNota} 
                    onChange={onChangeTituloNota} ></TextTitulo>
                }
                {!edit &&
                    <TextTitulo value={nota.titulo} disabled></TextTitulo>
                }
                <IconButton onClick={handleFavorito}>
                    {nota.favorito ? <StarIcon sx={{color:'#FFA000'}} /> : <StarBorderIcon/>}
                </IconButton>

            </Box>
            {corAtual != '#FFFFFF' ? <Line sx={{backgroundColor:'#FFFFFF'}} /> : <Line/> }
            <Box sx={{height:'100%', display: 'flex', flexDirection: 'column'}}>
                {edit &&
                    <>
                        <TextConteudo value={textoNota} onChange={onChangeTextoNota}></TextConteudo>
                        <IconButton onClick={onAtualizaConteuto}>
                            <CheckIcon></CheckIcon>
                        </IconButton>
                    </>
                }
                {!edit &&
                    <>
                        <TextConteudo value={nota.conteudo} disabled />
                        <OptionsNote 
                            cores={cores} 
                            notaId={nota.id} 
                            onDelete={onDelete}
                            attCor={fetchUpdateCor}
                            attNota={setEdit}>
                        </OptionsNote>
                    </>
                    
                }
            </Box>
            
            
        </BlocoNota>
    )
}


export default Note;