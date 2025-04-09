import * as React from "react";
import { Box, IconButton, InputBase, styled } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckIcon from '@mui/icons-material/Check';
import OptionsNote from "./OptionsNote";

import { updateNota } from "../service/notas";

export interface NotaProps {
    nota:any,
    onDelete: (id:number) => void,
    onUpdate: (notaAtualizada: any) => void,
    cores: any,
}

const BlocoNota = styled(Box)(() => ({
    minWidth:'300px', minHeight:'90px',
    maxWidth:'390px', maxHeight:'450pc',
    border: '1px solid #D9D9D9',
    borderRadius:'25px',
    display:'flex', flexDirection:'column',
    padding:'10px'
}));

const Line = styled('span')(() => ({
    width: '100%',
    height: '2px',
    backgroundColor: 'rgba(0,0,0, 0.2)',
}));

const TextTitulo = styled(InputBase)(() => ({
    border: 'none', backgroundColor:'transparent',
    color:'black', ":focus-visible":false,
    resize:'none', width: '100%', 
}))

const TextConteudo = styled('textarea')(() => ({
    backgroundColor:'transparent',
    color:'black', width:'100%',
    minWidth: '50px', border:'none',
    resize:'none', height:'100%',
    outline:'none',minHeight:'70px'
}));


function Note (props: NotaProps) {

    const {nota, onDelete, onUpdate, cores} = props;

    const corInit = () => {
        let a = '';
        cores.map((c :any) => {
            if(c.id == nota.cor_id){
                a = c.cor;
            }
        });

        return a;
    }

    const [corId, setCorId] = React.useState(nota.cor_id);

    const [background, setBackground] = React.useState(corInit());

    const [favorite, setFavorite] = React.useState(nota.favorito);

    const [edit, setEdit] = React.useState(false);

    const [tituloNota, setTituloNota]= React.useState(nota.titulo);
    const [textoNota, setTextoNota]= React.useState(nota.conteudo);

    const criarNotaAtualizada = (overrides: Partial<typeof nota> = {}) => {
        return {
            ...nota,
            titulo: overrides.titulo ?? tituloNota,
            conteudo: overrides.conteudo ?? textoNota,
            cor_id: overrides.cor_id ?? corId ?? nota.cor_id,
            favorito: overrides.favorito ?? favorite,
            ...overrides
        }
    }

    const fetchUpdateCor = async (novaCor: any) => {
        const notaAtualizada = criarNotaAtualizada({cor_id: novaCor.id});
        setCorId(novaCor.id);
        setBackground(novaCor.cor);
        await fetchAtualiza(notaAtualizada);
    };

    const fetchAtualiza = async (notaAtualizada: any) => {
        try {
            await updateNota(notaAtualizada);
            onUpdate(notaAtualizada);
            
        } catch (error) {
            console.error('Erro ao atualizar a nota:', error);
        }
    };

    const handleFavorito = () =>{
        const novoFavorito = !favorite;
        setFavorite(novoFavorito);
        const notaAtualizada = criarNotaAtualizada({ favorito: novoFavorito });
        fetchAtualiza(notaAtualizada);
    }

    const onChangeTituloNota = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTituloNota(e.target.value);
    }

    const onChangeTextoNota = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextoNota(e.target.value);
    }

    const onAtualizaConteuto = () => {

        const notaAtualizada = criarNotaAtualizada();
        fetchAtualiza(notaAtualizada);
        setEdit(false);
    }

    React.useEffect(() => {
        const cor = cores.find((c: any) => c.id === nota.cor_id)?.cor;
        if (cor) setBackground(cor);
    }, [nota.cor_id, cores]);

    return (
        <BlocoNota sx={{backgroundColor:background}}>
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
                    {nota.favorito ? <StarIcon sx={{color:'#FFA000'}}  fontSize="small"/> : <StarBorderIcon/>}
                </IconButton>

            </Box>
            {background != null ? <Line sx={{backgroundColor:'#FFFFFF'}} /> : <Line/> }
            <Box sx={{height:'100%', display: 'flex', flexDirection: 'column'}}>
                {edit &&
                    <>
                        <TextConteudo value={textoNota} onChange={onChangeTextoNota}></TextConteudo>
                        <IconButton onClick={onAtualizaConteuto} sx={{width: '100%'}}>
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