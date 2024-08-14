import React, { useState } from "react";
import { favorite } from "../../services/noteService";
import { Icon, IconStar } from "./styles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FavoriteNoteProps {
    data: { id: string, isFavorite: boolean };
}

const FavoriteNote: React.FC<FavoriteNoteProps> = ({ data }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(data.isFavorite);

    const handleFavorite = () => {
        favorite(data.id, !isFavorite)
            .then(() => {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? 'Nota removida dos favoritos com sucesso!' : 'Nota adicionada aos favoritos com sucesso!');
            })
            .catch((error: Error) => {
                toast.error(`Erro ao ${isFavorite ? 'remover' : 'adicionar'} nota aos favoritos.`);
                console.error(error);
            });
    }

    return (
        <Icon onClick={handleFavorite}>
            <IconStar color={isFavorite ? 'orange' : ''} />
        </Icon>
    )
}

export default FavoriteNote;
