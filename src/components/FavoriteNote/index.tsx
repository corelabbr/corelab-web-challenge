import React, { useState } from "react";
import { favorite } from "../../services/noteService";
import { Icon, IconStar } from "./styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FavoriteNoteProps {
    data: { id: string; isFavorite: boolean };
    onToggleFavorite: (id: string) => void;
}

const FavoriteNote: React.FC<FavoriteNoteProps> = ({ data, onToggleFavorite }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(data.isFavorite);

    const handleFavorite = async () => {
        try {
            await favorite(data.id, !isFavorite);
            setIsFavorite(!isFavorite);
            onToggleFavorite(data.id);

            toast.success(
                !isFavorite
                    ? "Nota adicionada aos favoritos com sucesso!"
                    : "Nota removida dos favoritos com sucesso!"
            );
        } catch (error) {
            toast.error(`Erro ao ${isFavorite ? "remover" : "adicionar"} nota aos favoritos.`);
            console.error(error);
        }
    };

    return (
        <Icon onClick={handleFavorite}>
            <IconStar color={isFavorite ? "orange" : ""} />
        </Icon>
    );
};

export default FavoriteNote;
